-- Fix leads table RLS policy to explicitly allow anonymous inserts
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

CREATE POLICY "Anyone can create leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Make sure the storage bucket exists and has correct policies
INSERT INTO storage.buckets (id, name, public)
VALUES ('machine-uploads', 'machine-uploads', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies for machine uploads
DROP POLICY IF EXISTS "Public can upload machine images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view machine images" ON storage.objects;

CREATE POLICY "Public can upload machine images"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'machine-uploads');

CREATE POLICY "Public can view machine images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'machine-uploads');