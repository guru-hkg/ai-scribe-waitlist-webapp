-- Insert default admin user (krish@hikigai.ai)
-- Password: HikigaiAdmin2024! (strong password as requested)
INSERT INTO admin_users (email, password_hash) 
VALUES (
    'krish@hikigai.ai',
    '$2a$12$UoNyJsDuVKmskWG1y9LGS.1C7EPRMVqKmWS/WBq5iZnmmbwSZavCO'
) ON CONFLICT (email) DO NOTHING;

-- Note: The password hash above corresponds to 'HikigaiAdmin2024!'
-- This should be changed through the admin settings after first login
