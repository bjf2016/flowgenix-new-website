/*
  # Create profiles table and update secrets structure

  1. New Tables
    - `profiles`
      - `user_id` (uuid, primary key, references auth.users)
      - `role` (text, default 'admin')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes to secrets table
    - Ensure proper structure with nullable user fields
    - Add function to auto-set user IDs only when null

  3. Security
    - Enable RLS on profiles table
    - Allow users to read their own profile
    - Update secrets policies to check admin role
    - Policies require authentication and admin role for mutations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'admin' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing secrets policies
DROP POLICY IF EXISTS "Authenticated users can view secrets" ON secrets;
DROP POLICY IF EXISTS "Authenticated users can insert secrets" ON secrets;
DROP POLICY IF EXISTS "Authenticated users can update secrets" ON secrets;
DROP POLICY IF EXISTS "Authenticated users can delete secrets" ON secrets;

-- New secrets policies with admin role check
CREATE POLICY "Authenticated users can list secret keys"
  ON secrets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert secrets"
  ON secrets FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update secrets"
  ON secrets FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete secrets"
  ON secrets FOR DELETE
  TO authenticated
  USING (is_admin());

-- Update trigger function to only set user IDs when null
CREATE OR REPLACE FUNCTION public.handle_secrets_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.created_by IS NULL THEN
      NEW.created_by = auth.uid();
    END IF;
    IF NEW.updated_by IS NULL THEN
      NEW.updated_by = auth.uid();
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.updated_by IS NULL THEN
      NEW.updated_by = auth.uid();
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS set_secrets_user_id ON secrets;
CREATE TRIGGER set_secrets_user_id
  BEFORE INSERT OR UPDATE ON secrets
  FOR EACH ROW
  EXECUTE FUNCTION handle_secrets_user_id();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role)
  VALUES (NEW.id, 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
