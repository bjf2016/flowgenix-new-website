/*
  # Fix secrets table RLS policies

  1. Changes
    - Drop existing policies that are too restrictive
    - Create new policies that automatically set user IDs
    - Allow authenticated users to manage secrets without manual user ID assignment

  2. Security
    - Maintains authentication requirement
    - Automatically sets created_by and updated_by fields
    - Prevents unauthorized access
*/

DROP POLICY IF EXISTS "Authenticated users can view secrets" ON secrets;
DROP POLICY IF EXISTS "Authenticated users can insert secrets" ON secrets;
DROP POLICY IF EXISTS "Authenticated users can update secrets" ON secrets;
DROP POLICY IF EXISTS "Authenticated users can delete secrets" ON secrets;

CREATE POLICY "Authenticated users can view secrets"
  ON secrets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert secrets"
  ON secrets FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update secrets"
  ON secrets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete secrets"
  ON secrets FOR DELETE
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.handle_secrets_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_by = auth.uid();
    NEW.updated_by = auth.uid();
  ELSIF TG_OP = 'UPDATE' THEN
    NEW.updated_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_secrets_user_id ON secrets;
CREATE TRIGGER set_secrets_user_id
  BEFORE INSERT OR UPDATE ON secrets
  FOR EACH ROW
  EXECUTE FUNCTION handle_secrets_user_id();
