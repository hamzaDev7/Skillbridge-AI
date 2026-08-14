import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { UserPlus, Sparkles, FolderOpen, Briefcase, ChevronRight } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-primary" />,
      title: "1. Create Your Profile",
      description: "Sign up and tell us about your background, current skills, and career goals. Connect your GitHub and LinkedIn for automated parsing."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "2. Get Analyzed by AI",
      description: "Our AI evaluates your profile against current market demands, identifying your strengths and recommending the fastest path to your dream job."
    },
    {
      icon: <FolderOpen className="w-8 h-8 text-primary" />,
      title: "3. Build Projects & Portfolio",
      description: "Complete AI-generated projects tailored to your gaps. SkillBridge automatically updates your smart portfolio as you complete them."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "4. Get Hired",
      description: "Your verified profile and portfolio are surfaced to top recruiters on our platform who are looking for exactly your skill set."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">How SkillBridge Works</h1>
          <p className="text-xl text-muted-foreground">
            A simple, streamlined process from signup to job offer.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-start md:items-center relative">
              {/* Connector line for desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute left-[3.5rem] top-20 bottom-[-3rem] w-px bg-border" />
              )}
              
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-8 border-background z-10">
                {step.icon}
              </div>
              
              <div className="bg-card border rounded-2xl p-8 flex-1 shadow-sm">
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-primary/5 border rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Your dream job is waiting</h2>
          <Link to="/signup">
            <Button size="lg" className="h-12 px-8">
              Start Your Journey <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
