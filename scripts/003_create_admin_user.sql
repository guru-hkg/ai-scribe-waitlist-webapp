-- Create admin user with proper bcrypt hash
-- Password: HikigaiAdmin2024!

INSERT INTO admin_users (id, email, password_hash, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'krish@hikigai.ai',
  '$2a$12$UoNyJsDuVKmskWG1y9LGS.1C7EPRMVqKmWS/WBq5iZnmmbwSZavCO',
  true,
  now(),
  now()
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  is_active = EXCLUDED.is_active,
  updated_at = now();
