/*
  # Storage and Proofs Setup
  
  1. Storage
    - Creates proofs storage bucket
    - Sets up storage policies
  
  2. Proofs Table
    - Creates proofs table if not exists
    - Adds RLS policies
    - Creates indexes
*/

-- Create storage bucket for proofs
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('proofs', 'proofs', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Create proofs table
CREATE TABLE IF NOT EXISTS proofs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id text NOT NULL,
  user_id text NOT NULL,
  description text NOT NULL,
  file_urls text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  
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

-- Create storage policy for uploads
CREATE POLICY "Authenticated users can upload proofs"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'proofs');

-- Create storage policy for viewing proofs
CREATE POLICY "Anyone can view proofs"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'proofs');

-- Index for faster queries
CREATE INDEX IF NOT EXISTS proofs_user_id_idx ON proofs(user_id);
CREATE INDEX IF NOT EXISTS proofs_contest_id_idx ON proofs(contest_id);