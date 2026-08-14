import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrainCircuit, Loader2 } from "lucide-react"

const steps = [
  "Personal Info",
  "Interests",
  "Current Skills",
  "Career Goal",
  "Experience",
  "Generate Roadmap"
]

export default function OnboardingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Form State
  const [university, setUniversity] = useState("")
  const [degree, setDegree] = useState("")
  const [gradYear, setGradYear] = useState("")
  const [location, setLocation] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [goal, setGoal] = useState("")
  const [experience, setExperience] = useState("")

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(c => c + 1)
    } else {
      finishOnboarding()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1)
    }
  }

  const finishOnboarding = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      // 1. Update Profile
      await supabase.from("profiles").update({
        university,
        degree,
        graduation_year: parseInt(gradYear),
        location,
        experience_level: experience
      }).eq("id", user.id)

      // 2. Save Career Goal
      if (goal) {
        await supabase.from("career_goals").insert({
          user_id: user.id,
          title: goal
        })
      }

      // 3. Generate Roadmap (Simulated AI)
      const { data: roadmapData, error: roadmapError } = await supabase.from("roadmaps").insert({
        user_id: user.id,
        title: `${goal} Master Plan`
      }).select().single()

      if (roadmapData && !roadmapError) {
        // Insert dummy items for now
        await supabase.from("roadmap_items").insert([
          { roadmap_id: roadmapData.id, title: "Learn Fundamentals", status: "Available" },
          { roadmap_id: roadmapData.id, title: "Build First Project", status: "Locked" }
        ])
      }

      navigate("/dashboard")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="w-full max-w-2xl mb-8 flex justify-between items-center px-2">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              i <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            <span className="text-xs hidden md:block text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{steps[currentStep]}</CardTitle>
          <CardDescription>Tell us about yourself to personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>University / Institution</Label>
                  <Input value={university} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUniversity(e.target.value)} placeholder="e.g. Stanford University" />
                </div>
                <div className="space-y-2">
                  <Label>Degree / Major</Label>
                  <Input value={degree} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDegree(e.target.value)} placeholder="e.g. Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Year</Label>
                  <Input type="number" value={gradYear} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGradYear(e.target.value)} placeholder="2025" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} placeholder="San Francisco, CA" />
                </div>
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Select areas you are interested in (comma separated for now).</p>
              <Input 
                placeholder="e.g. Artificial Intelligence, Web Development, Cloud"
                value={interests.join(", ")}
                onChange={e => setInterests(e.target.value.split(",").map(s => s.trim()))}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4 flex flex-col items-center justify-center h-[200px] text-center">
              <BrainCircuit className="w-12 h-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">We'll let you add specific skills with confidence levels from your dashboard once onboarding is complete.</p>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-4">
              <Label>What is your primary career goal?</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a career goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                  <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                  <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                  <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                  <SelectItem value="AI/ML Engineer">AI/ML Engineer</SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {currentStep === 4 && (
            <div className="space-y-4">
              <Label>What is your current experience level?</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner (Just starting out)</SelectItem>
                  <SelectItem value="Intermediate">Intermediate (Some projects/courses)</SelectItem>
                  <SelectItem value="Advanced">Advanced (Ready for junior/mid roles)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {currentStep === 5 && (
            <div className="space-y-4 flex flex-col items-center justify-center h-[250px] text-center">
              {isLoading ? (
                <>
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <h3 className="text-xl font-semibold">Generating your personalized roadmap...</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">SkillBridge AI is analyzing your profile to build the perfect path to becoming a {goal || 'professional'}.</p>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold">Ready to generate your roadmap!</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">Click finish to let our AI build your personalized career learning path.</p>
                </>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || isLoading}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isLoading}>
            {currentStep === steps.length - 1 ? (isLoading ? "Finishing..." : "Finish & Generate") : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
