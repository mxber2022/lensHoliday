/*
  # Update proof policies
  
  1. Changes
    - Update RLS policies for proofs table to handle wallet addresses
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