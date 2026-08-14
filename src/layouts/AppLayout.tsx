import { useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { 
  BrainCircuit, LayoutDashboard, Code, BookOpen, 
  FileText, Briefcase, LogOut, Menu, X, User as UserIcon 
} from "lucide-react"

export default function AppLayout() {
  const { profile, signOut } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const studentNavItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { name: "Skills", path: "/student/skills", icon: BrainCircuit },
    { name: "Roadmap", path: "/student/roadmap", icon: BookOpen },
    { name: "Projects", path: "/student/projects", icon: Code },
    { name: "CV Builder", path: "/student/cv", icon: FileText },
    { name: "Internships", path: "/student/internships", icon: Briefcase },
  ]

  const recruiterNavItems = [
    { name: "Command Center", path: "/recruiter/dashboard", icon: LayoutDashboard },
    { name: "Talent Search", path: "/recruiter/talent", icon: UserIcon },
    { name: "Job Postings", path: "/recruiter/jobs", icon: Briefcase },
    { name: "Settings", path: "/recruiter/settings", icon: BrainCircuit },
  ]

  const navItems = profile?.role === 'recruiter' ? recruiterNavItems : studentNavItems

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-muted/20 flex font-sans">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-primary">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-primary" />
            </div>
            SkillBridge AI
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm ${
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
               {profile?.avatar_url ? (
                 <img src={profile.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
               ) : (
                 <UserIcon className="w-5 h-5 text-primary" />
               )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{profile?.full_name || 'Student User'}</p>
              <p className="text-xs text-muted-foreground truncate">{profile?.role || 'Student'}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive mt-2" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Top Header (Mobile & Desktop) */}
        <header className="h-16 bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-4 sticky top-0 z-40">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 font-bold tracking-tight text-primary">
              <BrainCircuit className="w-5 h-5" /> SkillBridge
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 justify-end items-center gap-4">
             {/* Add global search or notifications here if needed in the future */}
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative w-4/5 max-w-sm bg-background h-full shadow-2xl flex flex-col border-r">
              <div className="h-16 flex items-center justify-between px-6 border-b">
                <span className="font-bold text-lg text-primary flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5" /> SkillBridge
                </span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                        isActive(item.path) 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={signOut}>
                  <LogOut className="w-5 h-5 mr-3" /> Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  )
}
