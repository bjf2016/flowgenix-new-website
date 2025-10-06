/*
  # Create secrets management table

  1. New Tables
    - `secrets`
      - `id` (uuid, primary key) - Unique identifier for each secret
      - `key` (text, unique, not null) - Secret key name (e.g., 'CLAUDE_API_KEY')
      - `value` (text, not null) - Encrypted secret value
      - `description` (text) - Optional description of what the secret is for
      - `created_at` (timestamptz) - When the secret was created
      - `updated_at` (timestamptz) - When the secret was last updated
      - `created_by` (uuid) - User who created the secret
      - `updated_by` (uuid) - User who last updated the secret

  2. Security
    - Enable RLS on `secrets` table
    - Add policy for authenticated users to read secrets
    - Add policy for authenticated users to insert secrets
    - Add policy for authenticated users to update their own secrets
    - Add policy for authenticated users to delete their own secrets

  3. Important Notes
    - Only authenticated users can access secrets
    - Secrets should be encrypted before storing in the value field
    - This table provides a secure way to manage API keys and other sensitive data
*/

CREATE TABLE IF NOT EXISTS secrets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE secrets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view secrets"
  ON secrets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert secrets"
  ON secrets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update secrets"
  ON secrets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (auth.uid() = updated_by);

CREATE POLICY "Authenticated users can delete secrets"
  ON secrets FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_secrets_key ON secrets(key);
CREATE INDEX IF NOT EXISTS idx_secrets_created_by ON secrets(created_by);
