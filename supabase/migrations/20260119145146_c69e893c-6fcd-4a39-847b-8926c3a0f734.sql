-- Create market data table for machine price references
CREATE TABLE public.market_price_data (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL, -- 'bagger' or 'arbeitsbuehne'
    segment TEXT NOT NULL, -- e.g. 'Kettenbagger', 'Scherenbuehne'
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    reference_year INTEGER NOT NULL,
    age_years INTEGER NOT NULL,
    hours_min INTEGER,
    hours_max INTEGER,
    price_min_eur INTEGER NOT NULL,
    price_max_eur INTEGER NOT NULL,
    price_mid_eur INTEGER NOT NULL,
    source_url TEXT,
    source_note TEXT,
    as_of_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.market_price_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access for price lookups
CREATE POLICY "Market data is publicly readable" 
ON public.market_price_data 
FOR SELECT 
TO public
USING (true);

-- Only admins can modify market data
CREATE POLICY "Admins can manage market data" 
ON public.market_price_data 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create index for efficient lookups
CREATE INDEX idx_market_price_manufacturer_model ON public.market_price_data(manufacturer, model);
CREATE INDEX idx_market_price_category_segment ON public.market_price_data(category, segment);

-- Add trigger for timestamp updates
CREATE TRIGGER update_market_price_data_updated_at
BEFORE UPDATE ON public.market_price_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();