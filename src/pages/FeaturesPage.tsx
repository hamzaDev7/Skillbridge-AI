import { Bot, LineChart, Code2, Sparkles, BrainCircuit, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Everything you need to <span className="text-primary">accelerate your career</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            SkillBridge AI provides a comprehensive suite of tools designed to analyze your skills, build your portfolio, and connect you with top recruiters.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="h-12 px-8 text-base">Get Started for Free</Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">See How It Works</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Details */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">AI Skill Analyzer</h2>
              <p className="text-lg text-muted-foreground">
                Our proprietary AI model evaluates your current skill set against millions of job descriptions to find gaps and opportunities.
              </p>
              <ul className="space-y-3">
                {['Real-time market data matching', 'Personalized learning paths', 'Automated resume parsing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border shadow-sm h-[400px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <LineChart className="w-32 h-32 text-primary/20" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-card rounded-2xl p-8 border shadow-sm h-[400px] flex items-center justify-center relative overflow-hidden group md:order-1 order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-32 h-32 text-primary/20" />
            </div>
            <div className="space-y-6 md:order-2 order-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Project Generator</h2>
              <p className="text-lg text-muted-foreground">
                Generate industry-standard project ideas tailored to your skill level. Complete these projects to prove your expertise to recruiters.
              </p>
              <ul className="space-y-3">
                {['Customized to your tech stack', 'Step-by-step guidance', 'Direct GitHub integration'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Smart Portfolio Builder</h2>
              <p className="text-lg text-muted-foreground">
                Automatically generate a beautiful, responsive portfolio website that showcases your skills, projects, and AI-verified proficiency.
              </p>
              <ul className="space-y-3">
                {['One-click deployment', 'SEO optimized', 'Custom domain support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border shadow-sm h-[400px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-full max-w-sm space-y-4">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-32 bg-muted rounded w-full mt-8" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Ready to upgrade your career?</h2>
        <Link to="/signup">
          <Button size="lg" className="h-12 px-8">Create Your Free Account</Button>
        </Link>
      </section>
    </div>
  )
}
