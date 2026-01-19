-- =============================================
-- wirkaufendeinebaumaschinen.de - Database Schema
-- =============================================

-- Enum for machine categories
CREATE TYPE public.machine_category AS ENUM ('bagger', 'arbeitsbuehne');

-- Enum for machine condition
CREATE TYPE public.machine_condition AS ENUM ('sehr_gut', 'gut', 'ok', 'reparaturbeduerftig');

-- Enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Enum for lead status
CREATE TYPE public.lead_status AS ENUM ('neu', 'in_bearbeitung', 'angebot_erstellt', 'abgeschlossen', 'abgelehnt');

-- =============================================
-- Profiles table for user data
-- =============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- =============================================
-- User roles table
-- =============================================
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Manufacturers table
-- =============================================
CREATE TABLE public.manufacturers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category machine_category NOT NULL,
    logo_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (name, category)
);

ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active manufacturers"
ON public.manufacturers FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage manufacturers"
ON public.manufacturers FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Models table
-- =============================================
CREATE TABLE public.models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manufacturer_id UUID REFERENCES public.manufacturers(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    subcategory TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (manufacturer_id, name)
);

ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active models"
ON public.models FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage models"
ON public.models FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Pricing factors table
-- =============================================
CREATE TABLE public.pricing_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category machine_category NOT NULL,
    factor_type TEXT NOT NULL, -- 'base_value', 'age', 'hours', 'condition', 'equipment', 'documentation'
    factor_key TEXT NOT NULL,
    factor_value DECIMAL(10, 4) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (category, factor_type, factor_key)
);

ALTER TABLE public.pricing_factors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pricing factors"
ON public.pricing_factors FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage pricing factors"
ON public.pricing_factors FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Leads table (purchase inquiries)
-- =============================================
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Contact info
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_company TEXT,
    -- Machine info
    category machine_category NOT NULL,
    subcategory TEXT,
    manufacturer_name TEXT NOT NULL,
    model_name TEXT NOT NULL,
    is_custom_model BOOLEAN DEFAULT false,
    -- Technical data
    year_built INTEGER NOT NULL,
    operating_hours INTEGER,
    weight_class TEXT,
    working_height TEXT,
    drive_type TEXT,
    serial_number TEXT,
    location_zip TEXT NOT NULL,
    -- Condition
    condition machine_condition NOT NULL,
    has_service_book BOOLEAN DEFAULT false,
    has_uvv BOOLEAN DEFAULT false,
    has_ce BOOLEAN DEFAULT false,
    has_manual BOOLEAN DEFAULT false,
    equipment JSONB DEFAULT '[]'::jsonb,
    has_damage BOOLEAN DEFAULT false,
    damage_description TEXT,
    -- Files
    images JSONB DEFAULT '[]'::jsonb,
    documents JSONB DEFAULT '[]'::jsonb,
    -- Pricing
    calculated_price_low DECIMAL(12, 2),
    calculated_price_high DECIMAL(12, 2),
    final_offer DECIMAL(12, 2),
    -- Status
    status lead_status NOT NULL DEFAULT 'neu',
    notes TEXT,
    assigned_to UUID REFERENCES auth.users(id),
    -- Consent
    gdpr_consent BOOLEAN NOT NULL DEFAULT false,
    wants_pickup BOOLEAN DEFAULT false,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public can insert leads (no auth required for form submission)
CREATE POLICY "Anyone can create leads"
ON public.leads FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.leads FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Used machines for sale
-- =============================================
CREATE TABLE public.machines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Basic info
    title TEXT NOT NULL,
    category machine_category NOT NULL,
    subcategory TEXT,
    manufacturer_name TEXT NOT NULL,
    model_name TEXT,
    -- Technical data
    year_built INTEGER NOT NULL,
    operating_hours INTEGER,
    weight_kg INTEGER,
    working_height_m DECIMAL(5, 2),
    drive_type TEXT,
    serial_number TEXT,
    -- Condition & features
    condition machine_condition NOT NULL DEFAULT 'gut',
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    -- Pricing
    price DECIMAL(12, 2) NOT NULL,
    financing_available BOOLEAN DEFAULT true,
    -- Location
    location_name TEXT DEFAULT 'Krefeld',
    -- Media
    images JSONB DEFAULT '[]'::jsonb,
    documents JSONB DEFAULT '[]'::jsonb,
    -- Status
    is_sold BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published machines"
ON public.machines FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage machines"
ON public.machines FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- App settings (for configurable values)
-- =============================================
CREATE TABLE public.app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view settings"
ON public.app_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage settings"
ON public.app_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Trigger for updated_at
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_manufacturers_updated_at
    BEFORE UPDATE ON public.manufacturers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_models_updated_at
    BEFORE UPDATE ON public.models
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_factors_updated_at
    BEFORE UPDATE ON public.pricing_factors
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_machines_updated_at
    BEFORE UPDATE ON public.machines
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_app_settings_updated_at
    BEFORE UPDATE ON public.app_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- Storage bucket for uploads
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('machine-uploads', 'machine-uploads', true);

-- Storage policies
CREATE POLICY "Anyone can upload machine images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'machine-uploads');

CREATE POLICY "Anyone can view machine images"
ON storage.objects FOR SELECT
USING (bucket_id = 'machine-uploads');

CREATE POLICY "Admins can delete machine images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'machine-uploads' AND public.has_role(auth.uid(), 'admin'));