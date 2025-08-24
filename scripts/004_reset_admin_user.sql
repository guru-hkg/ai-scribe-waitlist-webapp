-- Reset admin user with correct password hash
-- This will delete the existing admin user and create a fresh one

-- Delete existing admin user
DELETE FROM admin_users WHERE email = 'krish@hikigai.ai';

-- Insert fresh admin user with properly generated hash
-- Password: HikigaiAdmin2024!
INSERT INTO admin_users (id, email, password_hash, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'krish@hikigai.ai',
  '$2a$12$UoNyJsDuVKmskWG1y9LGS.1C7EPRMVqKmWS/WBq5iZnmmbwSZavCO',
  true,
  now(),
  now()
);

-- Verify the user was created
SELECT id, email, is_active, created_at FROM admin_users WHERE email = 'krish@hikigai.ai';
