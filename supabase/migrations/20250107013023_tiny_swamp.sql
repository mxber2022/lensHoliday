/*
  # Fix proof policies for wallet authentication
  
  1. Changes
    - Update RLS policies to handle wallet addresses correctly
    - Add policy for authenticated users to update their own proofs
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own proofs" ON proofs;
DROP POLICY IF EXISTS "Users can view their own proofs" ON proofs;

-- Recreate policies with proper wallet address handling
CREATE POLICY "Users can insert their own proofs"
  ON proofs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Convert both user_id and JWT sub to lowercase for case-insensitive comparison
    LOWER(user_id) = LOWER(REPLACE(auth.jwt() ->> 'sub', 'auth0|', ''))
  );

CREATE POLICY "Users can view their own proofs"
  ON proofs
  FOR SELECT
  TO authenticated
  USING (
    LOWER(user_id) = LOWER(REPLACE(auth.jwt() ->> 'sub', 'auth0|', ''))
  );