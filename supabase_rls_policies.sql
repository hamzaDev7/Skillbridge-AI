-- 1. Enable RLS on all tables (if not already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

DROP POLICY IF EXISTS "Users can view own skills" ON skills;
DROP POLICY IF EXISTS "Users can insert own skills" ON skills;
DROP POLICY IF EXISTS "Users can update own skills" ON skills;
DROP POLICY IF EXISTS "Users can delete own skills" ON skills;

DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON projects;
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON projects;

DROP POLICY IF EXISTS "Users can view own roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can insert own roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can update own roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can delete own roadmaps" ON roadmaps;

-- 3. Profiles Policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- 4. Skills Policies
CREATE POLICY "Users can view own skills" ON skills
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills" ON skills
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills" ON skills
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills" ON skills
    FOR DELETE USING (auth.uid() = user_id);

-- 5. Projects Policies
CREATE POLICY "Users can view own projects" ON projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- 6. Roadmaps Policies
CREATE POLICY "Users can view own roadmaps" ON roadmaps
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roadmaps" ON roadmaps
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roadmaps" ON roadmaps
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own roadmaps" ON roadmaps
    FOR DELETE USING (auth.uid() = user_id);

-- 7. Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  internship_id text NOT NULL,
  company text NOT NULL,
  title text NOT NULL,
  status text DEFAULT 'Applied',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own applications" ON applications;
DROP POLICY IF EXISTS "Users can insert own applications" ON applications;
DROP POLICY IF EXISTS "Users can update own applications" ON applications;
DROP POLICY IF EXISTS "Users can delete own applications" ON applications;

CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own applications" ON applications FOR DELETE USING (auth.uid() = user_id);
