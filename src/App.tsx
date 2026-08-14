import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import MarketingLayout from "./layouts/MarketingLayout"
import AppLayout from "./layouts/AppLayout"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import AdminLoginPage from "./pages/auth/AdminLoginPage"
import FeaturesPage from "./pages/FeaturesPage"
import HowItWorksPage from "./pages/HowItWorksPage"
import PricingPage from "./pages/PricingPage"
import LegalPage from "./pages/LegalPage"
import OnboardingPage from "./pages/student/OnboardingPage"
import StudentDashboard from "./pages/student/StudentDashboard"
import SkillManagementPage from "./pages/student/SkillManagementPage"
import RoadmapPage from "./pages/student/RoadmapPage"
import ProjectsPage from "./pages/student/ProjectsPage"
import CVPage from "./pages/student/CVPage"
import InternshipsPage from "./pages/student/InternshipsPage"
import PortfolioPage from "./pages/student/PortfolioPage"
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import { Chatbot } from "./components/Chatbot"

// Protected Route Component to require login
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { session, profile, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;
  
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // If they are logged in but wrong role, send them to their own dashboard
    if (profile.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (profile.role === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Routes */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
          </Route>

          {/* App Routes (Requires Login) */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            
            {/* Student Routes */}
            <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/skills" element={<SkillManagementPage />} />
            <Route path="/student/roadmap" element={<RoadmapPage />} />
            <Route path="/student/projects" element={<ProjectsPage />} />
            <Route path="/student/cv" element={<CVPage />} />
            <Route path="/student/internships" element={<InternshipsPage />} />
            <Route path="/student/portfolio" element={<PortfolioPage />} />
            
            {/* Onboarding */}
            <Route path="/onboarding" element={<OnboardingPage />} />

            {/* Recruiter Routes */}
            <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterDashboard /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            
          </Route>
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
