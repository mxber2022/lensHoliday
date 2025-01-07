/*
  # Fix RLS policies for proofs table
  
  1. Changes
    - Update RLS policies to use wallet address instead of JWT sub
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own proofs" ON proofs;
DROP POLICY IF EXISTS "Users can view their own proofs" ON proofs;

-- Recreate policies with wallet address check
CREATE POLICY "Users can insert their own proofs"
  ON proofs
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = current_user);

CREATE POLICY "Users can view their own proofs"
  ON proofs
  FOR SELECT
  TO authenticated
  USING (user_id = current_user);