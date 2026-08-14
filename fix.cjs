const fs = require('fs');
const path = require('path');
const r = (p) => path.join(__dirname, p);

// 1. AuthContext
let auth = fs.readFileSync(r('src/context/AuthContext.tsx'), 'utf-8');
auth = auth.replace('import { Session, User }', 'import type { Session, User }');
fs.writeFileSync(r('src/context/AuthContext.tsx'), auth);

// 2. SignupPage
let signup = fs.readFileSync(r('src/pages/auth/SignupPage.tsx'), 'utf-8');
signup = signup.replace('const { data, error } = await supabase.auth.signUp({', 'const { error } = await supabase.auth.signUp({');
fs.writeFileSync(r('src/pages/auth/SignupPage.tsx'), signup);

// 3. CVPage
let cv = fs.readFileSync(r('src/pages/student/CVPage.tsx'), 'utf-8');
cv = cv.replace('CardTitle, CardFooter }', 'CardTitle }');
cv = cv.replace('import { Upload, FileText, CheckCircle2, AlertTriangle, FileUp } from "lucide-react"', 'import { Upload, AlertTriangle, FileUp } from "lucide-react"');
fs.writeFileSync(r('src/pages/student/CVPage.tsx'), cv);

// 4. InternshipsPage
let intPage = fs.readFileSync(r('src/pages/student/InternshipsPage.tsx'), 'utf-8');
intPage = intPage.replace('CardContent, CardDescription, CardHeader, CardTitle, CardFooter', 'CardContent');
fs.writeFileSync(r('src/pages/student/InternshipsPage.tsx'), intPage);

// 5. PortfolioPage
let port = fs.readFileSync(r('src/pages/student/PortfolioPage.tsx'), 'utf-8');
port = port.replace('Github, Linkedin, ExternalLink', 'ExternalLink');
port = port.replace(/<Github [^>]*>/g, '<ExternalLink className="w-4 h-4" />');
port = port.replace(/<Linkedin [^>]*>/g, '<ExternalLink className="w-4 h-4" />');
fs.writeFileSync(r('src/pages/student/PortfolioPage.tsx'), port);

// 6. ProjectsPage
let proj = fs.readFileSync(r('src/pages/student/ProjectsPage.tsx'), 'utf-8');
proj = proj.replace('CardTitle, CardFooter', 'CardTitle');
proj = proj.replace('import { Plus, BrainCircuit, Github, ExternalLink, MessageSquare } from "lucide-react"', 'import { Plus, BrainCircuit, ExternalLink, MessageSquare, Code } from "lucide-react"');
proj = proj.replace(/<Github [^>]*>/g, '<Code className="w-4 h-4 mr-1" />');
fs.writeFileSync(r('src/pages/student/ProjectsPage.tsx'), proj);

// 7. RoadmapPage
let road = fs.readFileSync(r('src/pages/student/RoadmapPage.tsx'), 'utf-8');
road = road.replace('CardContent, CardDescription, CardHeader, CardTitle }', 'CardContent }');
road = road.replace('const [roadmap, setRoadmap] = useState', 'const [roadmap] = useState');
fs.writeFileSync(r('src/pages/student/RoadmapPage.tsx'), road);

// 8. SkillManagementPage
let skill = fs.readFileSync(r('src/pages/student/SkillManagementPage.tsx'), 'utf-8');
skill = skill.replace('const [newSkill, setNewSkill] = useState("")', 'const [newSkillName, setNewSkillName] = useState("");\n  const [newSkillLevel, setNewSkillLevel] = useState("")');
skill = skill.replace('const { profile } = useAuth()', 'const {} = useAuth()');
fs.writeFileSync(r('src/pages/student/SkillManagementPage.tsx'), skill);

// 9. StudentDashboard
let dash = fs.readFileSync(r('src/pages/student/StudentDashboard.tsx'), 'utf-8');
dash = dash.replace('import { useEffect, useState }', 'import { useState }');
dash = dash.replace('import { supabase } from "@/lib/supabase"\n', '');
dash = dash.replace('const { user } = useAuth()\n', '');
dash = dash.replace('const [stats, setStats] = useState', 'const [stats] = useState');
fs.writeFileSync(r('src/pages/student/StudentDashboard.tsx'), dash);

console.log('Fixed TypeScript issues.');
