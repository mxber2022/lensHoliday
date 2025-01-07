/*
  # Storage Setup for Proofs
  
  1. Storage
    - Creates proofs storage bucket
    - Sets up storage policies for uploads and viewing
*/

-- Create storage bucket for proofs
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('proofs', 'proofs', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Create storage policy for uploads
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can upload proofs'
  ) THEN
    CREATE POLICY "Authenticated users can upload proofs"
      ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'proofs');
  END IF;
END $$;

-- Create storage policy for viewing proofs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Anyone can view proofs'
  ) THEN
    CREATE POLICY "Anyone can view proofs"
      ON storage.objects
      FOR SELECT
      TO public
      USING (bucket_id = 'proofs');
  END IF;
END $$;