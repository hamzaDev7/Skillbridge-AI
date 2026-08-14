-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- PROFILES
-- ==========================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT CHECK (role IN ('student', 'recruiter', 'admin')) DEFAULT 'student',
    avatar_url TEXT,
    university TEXT,
    degree TEXT,
    graduation_year INTEGER,
    location TEXT,
    experience_level TEXT CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- SKILLS CATALOG
-- ==========================================
CREATE TABLE public.skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- USER SKILLS
-- ==========================================
CREATE TABLE public.user_skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
    level TEXT CHECK (level IN ('Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert')) NOT NULL,
    status TEXT CHECK (status IN ('learning', 'mastered', 'target')) DEFAULT 'learning',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, skill_id)
);

-- ==========================================
-- CAREER GOALS
-- ==========================================
CREATE TABLE public.career_goals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROADMAPS & ITEMS
-- ==========================================
CREATE TABLE public.roadmaps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('Active', 'Completed', 'Archived')) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.roadmap_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    roadmap_id UUID REFERENCES public.roadmaps(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    skill_id UUID REFERENCES public.skills(id) ON DELETE SET NULL,
    difficulty TEXT,
    estimated_time TEXT,
    status TEXT CHECK (status IN ('Locked', 'Available', 'In Progress', 'Completed')) DEFAULT 'Locked',
    completion_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- PROJECTS
-- ==========================================
CREATE TABLE public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    github_url TEXT,
    live_demo_url TEXT,
    difficulty TEXT,
    status TEXT CHECK (status IN ('Planning', 'In Progress', 'Completed')) DEFAULT 'Planning',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.project_skills (
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (project_id, skill_id)
);

-- ==========================================
-- RESUMES / CVs
-- ==========================================
CREATE TABLE public.resumes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    score INTEGER,
    analysis_json JSONB,
    content_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- INTERNSHIPS & APPLICATIONS
-- ==========================================
CREATE TABLE public.internships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    recruiter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    location TEXT,
    is_remote BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    requirements_json JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    internship_id UUID REFERENCES public.internships(id) ON DELETE CASCADE NOT NULL,
    status TEXT CHECK (status IN ('Saved', 'Applied', 'Interview', 'Accepted', 'Rejected')) DEFAULT 'Saved',
    applied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, internship_id)
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read public profiles and their own profile. Users can only update their own.
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Skills: Anyone can read skills. Only admins (handled via app logic/functions later) can insert/update.
CREATE POLICY "Skills are viewable by everyone" ON public.skills FOR SELECT USING (true);

-- User Skills: Users can CRUD their own skills.
CREATE POLICY "Users can manage their own skills" ON public.user_skills FOR ALL USING (auth.uid() = user_id);

-- Career Goals: Users can CRUD their own goals.
CREATE POLICY "Users can manage their own career goals" ON public.career_goals FOR ALL USING (auth.uid() = user_id);

-- Roadmaps: Users can CRUD their own roadmaps.
CREATE POLICY "Users can manage their own roadmaps" ON public.roadmaps FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own roadmap items" ON public.roadmap_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.roadmaps WHERE roadmaps.id = roadmap_items.roadmap_id AND roadmaps.user_id = auth.uid())
);

-- Projects: Users can CRUD their own projects.
CREATE POLICY "Users can manage their own projects" ON public.projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own project skills" ON public.project_skills FOR ALL USING (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_skills.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Public profiles expose public projects" ON public.projects FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = projects.user_id AND profiles.is_public = true)
);

-- Resumes: Users can CRUD their own resumes.
CREATE POLICY "Users can manage their own resumes" ON public.resumes FOR ALL USING (auth.uid() = user_id);

-- Internships: Anyone can view active internships. Recruiters can CRUD their own.
CREATE POLICY "Active internships are viewable by everyone" ON public.internships FOR SELECT USING (is_active = true);
CREATE POLICY "Recruiters can manage their own internships" ON public.internships FOR ALL USING (auth.uid() = recruiter_id);

-- Applications: Users can CRUD their own applications. Recruiters can view applications for their internships.
CREATE POLICY "Users can manage their own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Recruiters can view applications for their internships" ON public.applications FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.internships WHERE internships.id = applications.internship_id AND internships.recruiter_id = auth.uid())
);
CREATE POLICY "Recruiters can update application status" ON public.applications FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.internships WHERE internships.id = applications.internship_id AND internships.recruiter_id = auth.uid())
);

-- ==========================================
-- TRIGGERS & FUNCTIONS
-- ==========================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Auto-update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_resumes_modtime
BEFORE UPDATE ON public.resumes
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
