-- SEED DATA FOR DEMONSTRATION PURPOSES

-- Insert base skills
INSERT INTO public.skills (name, category) VALUES
('JavaScript', 'Frontend'),
('TypeScript', 'Frontend'),
('React', 'Frontend'),
('Next.js', 'Frontend'),
('Node.js', 'Backend'),
('Python', 'Backend'),
('PostgreSQL', 'Database'),
('MongoDB', 'Database'),
('Docker', 'DevOps'),
('AWS', 'Cloud'),
('Machine Learning', 'AI'),
('Figma', 'Design')
ON CONFLICT (name) DO NOTHING;
