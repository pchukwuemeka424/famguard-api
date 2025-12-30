-- Setup Delete Policy for Users Table
-- Run this script in your Supabase SQL Editor or via psql

-- Step 1: Enable Row Level Security (RLS) on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policy if it exists (optional, for re-running)
DROP POLICY IF EXISTS allow_delete_by_email ON users;

-- Step 3: Create delete policy that allows account deletion by email
-- This policy allows deletion of any user record (for account deletion functionality)
CREATE POLICY allow_delete_by_email ON users
    FOR DELETE
    USING (true);

-- Alternative: More restrictive policy (uncomment if you want users to only delete their own account)
-- This requires Supabase Auth to be set up
-- CREATE POLICY allow_delete_own_account ON users
--     FOR DELETE
--     USING (auth.uid()::text = id::text);

-- Verify the policy was created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users';

