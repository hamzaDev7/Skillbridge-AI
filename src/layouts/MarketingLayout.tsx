import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { BrainCircuit } from "lucide-react"

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="border-b sticky top-0 bg-background/70 backdrop-blur-xl z-50 transition-all duration-300">
        <div className="container max-w-6xl flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-1.5 rounded-lg">
               <BrainCircuit className="w-5 h-5 text-primary" />
            </div>
            SkillBridge AI
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex gap-3">
            <Button variant="ghost" className="font-semibold" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="font-semibold shadow-md rounded-full px-5 hover:-translate-y-0.5 transition-transform" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="border-t py-16 bg-muted/20">
        <div className="container max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          <div className="col-span-2">
             <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <div className="bg-primary p-1.5 rounded-lg">
                  <BrainCircuit className="w-5 h-5 text-primary-foreground" />
                </div>
                SkillBridge AI
             </div>
             <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
               Empowering the next generation of tech talent with AI-driven career roadmaps. Stop guessing, start building.
             </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="container max-w-6xl mt-12 pt-8 border-t text-center text-sm text-muted-foreground px-4">
          © {new Date().getFullYear()} SkillBridge AI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
