/*
  # Fix RLS policies for wallet addresses
  
  1. Changes
    - Update RLS policies to handle wallet addresses correctly
    - Add policy for storage bucket access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own proofs" ON proofs;
DROP POLICY IF EXISTS "Users can view their own proofs" ON proofs;

-- Recreate policies with proper wallet address handling
CREATE POLICY "Users can insert their own proofs"
  ON proofs
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = LOWER(auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view their own proofs"
  ON proofs
  FOR SELECT
  TO authenticated
  USING (user_id = LOWER(auth.jwt() ->> 'sub'));

-- Update storage policies
CREATE POLICY "Authenticated users can upload proofs"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'proofs');

CREATE POLICY "Anyone can view proofs"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'proofs');