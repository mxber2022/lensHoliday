/*
  # Update proofs table user_id type

  1. Changes
    - Modify user_id column from UUID to text type
    - Remove foreign key constraint to auth.users
    - Recreate indexes
*/

-- Drop existing policies that depend on user_id
DROP POLICY IF EXISTS "Users can insert their own proofs" ON proofs;
DROP POLICY IF EXISTS "Users can view their own proofs" ON proofs;

-- Drop existing indexes
DROP INDEX IF EXISTS proofs_user_id_idx;
DROP INDEX IF EXISTS proofs_contest_id_idx;

-- Modify user_id column
ALTER TABLE proofs 
  ALTER COLUMN user_id TYPE text;

-- Recreate policies
CREATE POLICY "Users can insert their own proofs"
  ON proofs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can view their own proofs"
  ON proofs
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'sub' = user_id);

-- Recreate indexes
CREATE INDEX proofs_user_id_idx ON proofs(user_id);
CREATE INDEX proofs_contest_id_idx ON proofs(contest_id);