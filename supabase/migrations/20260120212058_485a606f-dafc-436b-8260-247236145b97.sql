-- Drop existing insert policy
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create new PERMISSIVE insert policy (default is PERMISSIVE, explicitly state it)
CREATE POLICY "Anyone can create leads"
ON public.leads
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);