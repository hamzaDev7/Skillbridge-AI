const fs = require('fs');
const path = require('path');
const r = (p) => path.join(__dirname, p);

// 2. SignupPage
let signup = fs.readFileSync(r('src/pages/auth/SignupPage.tsx'), 'utf-8');
signup = signup.replace(/const { data, error } = await supabase\.auth\.signUp/g, 'const { error } = await supabase.auth.signUp');
fs.writeFileSync(r('src/pages/auth/SignupPage.tsx'), signup);

// 3. CVPage
let cv = fs.readFileSync(r('src/pages/student/CVPage.tsx'), 'utf-8');
cv = cv.replace(/FileText, /g, '');
cv = cv.replace(/CheckCircle2, /g, '');
cv = cv.replace(/, FileText/g, '');
cv = cv.replace(/, CheckCircle2/g, '');
fs.writeFileSync(r('src/pages/student/CVPage.tsx'), cv);

// 6. ProjectsPage
let proj = fs.readFileSync(r('src/pages/student/ProjectsPage.tsx'), 'utf-8');
proj = proj.replace(/Github,/g, '');
proj = proj.replace(/, Github/g, '');
if (!proj.includes('Code,')) {
    proj = proj.replace(/import {/, 'import { Code,');
}
fs.writeFileSync(r('src/pages/student/ProjectsPage.tsx'), proj);

// 8. SkillManagementPage
let skill = fs.readFileSync(r('src/pages/student/SkillManagementPage.tsx'), 'utf-8');
skill = skill.replace(/newSkill\.trim/g, 'newSkillName.trim');
skill = skill.replace(/name: newSkill/g, 'name: newSkillName');
skill = skill.replace(/setNewSkill\(/g, 'setNewSkillName(');
skill = skill.replace(/setNewSkill\(/g, 'setNewSkillName(');
fs.writeFileSync(r('src/pages/student/SkillManagementPage.tsx'), skill);

// 9. StudentDashboard
let dash = fs.readFileSync(r('src/pages/student/StudentDashboard.tsx'), 'utf-8');
dash = dash.replace(/const { user } = useAuth\(\)/g, '');
dash = dash.replace(/const \[user, setUser\] = useState<any>\(null\)/g, ''); // if any
fs.writeFileSync(r('src/pages/student/StudentDashboard.tsx'), dash);

console.log('Fixed TypeScript issues.');
