/*
  # Create Tenants and Leads Tables

  1. New Tables
    - `tenants`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - Tenant identifier
      - `name` (text) - Tenant display name
      - `settings` (jsonb) - Additional tenant configuration
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `leads`
      - `id` (uuid, primary key)
      - `tenant_id` (uuid, foreign key to tenants)
      - `name` (text, required) - Lead name
      - `email` (text, optional) - Lead email
      - `phone` (text, optional) - Lead phone
      - `intent` (text) - Lead intent/purpose
      - `source` (text) - Lead source (website, referral, etc)
      - `utm` (jsonb) - UTM tracking parameters
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated admin access
    - Public insert policy for leads (for API endpoint)

  3. Indexes
    - Index on tenant slug for fast lookups
    - Index on tenant_id in leads for filtering
    - Index on created_at for time-based queries
*/

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  intent text DEFAULT 'lead',
  source text DEFAULT 'website',
  utm jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_leads_tenant_id ON leads(tenant_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email) WHERE email IS NOT NULL;

-- Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Tenants policies (admin only)
CREATE POLICY "Admins can view all tenants"
  ON tenants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert tenants"
  ON tenants FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update tenants"
  ON tenants FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Leads policies
CREATE POLICY "Admins can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert default tenant
INSERT INTO tenants (slug, name, settings)
VALUES ('flowgenixai', 'FlowGenix AI', '{"default": true}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_tenants_updated_at ON tenants;
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
