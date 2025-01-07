/*
  # Create proofs table for challenge submissions

  1. New Tables
    - `proofs`
      - `id` (uuid, primary key)
      - `contest_id` (text, references contests)
      - `user_id` (uuid, references auth.users)
      - `description` (text)
      - `file_urls` (text array)
      - `created_at` (timestamp)
      - `status` (enum: pending, approved, rejected)

  2. Security
    - Enable RLS
    - Users can insert their own proofs
    - Users can only view their own proofs
    - Admin can view and update all proofs
*/

-- Create enum type for proof status
CREATE TYPE proof_status AS ENUM ('pending', 'approved', 'rejected');

-- Create proofs table
CREATE TABLE IF NOT EXISTS proofs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  description text NOT NULL,
  file_urls text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  status proof_status DEFAULT 'pending',
  
  CONSTRAINT valid_file_urls CHECK (array_length(file_urls, 1) > 0)
);

-- Enable RLS
ALTER TABLE proofs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own proofs"
  ON proofs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own proofs"
  ON proofs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX proofs_user_id_idx ON proofs(user_id);
CREATE INDEX proofs_contest_id_idx ON proofs(contest_id);