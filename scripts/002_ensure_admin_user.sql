-- Create script to ensure admin user exists with proper password hash
-- First, delete any existing admin user to avoid conflicts
DELETE FROM admin_users WHERE email = 'krish@hikigai.ai';

-- Insert the admin user with bcrypt hash for password "HikigaiAdmin2024!"
-- Hash generated with bcrypt rounds=10: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO admin_users (
  id,
  email, 
  password_hash, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  gen_random_uuid(),
  'krish@hikigai.ai',
  '$2a$12$UoNyJsDuVKmskWG1y9LGS.1C7EPRMVqKmWS/WBq5iZnmmbwSZavCO',
  true,
  now(),
  now()
);
