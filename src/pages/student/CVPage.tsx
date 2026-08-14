import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BrainCircuit, Download, AlertTriangle, Loader2, Sparkles, FileText, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

export default function CVPage() {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<"builder" | "analyzer">("builder")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  
  const [projects, setProjects] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+1 234 567 890",
    location: "New York, NY",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    summary: "Highly motivated individual seeking opportunities to apply my skills and grow."
  })

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.full_name || "",
        email: profile.email || ""
      }))
      fetchData()
    }
  }, [profile])

  const fetchData = async () => {
    if (!profile?.id) return
    const [projRes, skillsRes] = await Promise.all([
      supabase.from('projects').select('*').eq('user_id', profile.id),
      supabase.from('skills').select('*').eq('user_id', profile.id)
    ])
    if (projRes.data) setProjects(projRes.data)
    if (skillsRes.data) setSkills(skillsRes.data)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setAnalysis({
        score: 72,
        breakdown: {
          structure: 80,
          skills: 60,
          projects: 85,
          experience: 70,
          clarity: 65,
          relevance: 75
        },
        suggestions: [
          "Add quantifiable metrics to your project descriptions to demonstrate impact.",
          "Ensure your primary technical skills are explicitly listed at the top.",
          "Consider condensing your summary to be more punchy and objective-focused."
        ]
      })
      setIsAnalyzing(false)
    }, 2500)
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">CV Architect</h1>
          <p className="text-muted-foreground mt-2 text-lg">Generate an ATS-optimized CV connected directly to your skills and portfolio.</p>
        </div>
        <Button variant="default" className="shadow-lg rounded-full px-6">
          <Download className="w-4 h-4 mr-2"/> Export PDF
        </Button>
      </div>

      <div className="flex gap-2 p-1 border rounded-full w-fit bg-muted/20 backdrop-blur-sm shadow-sm">
        <button 
          className={`flex items-center px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeTab === 'builder' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab("builder")}
        >
          <FileText className="w-4 h-4 mr-2" />
          CV Builder
        </button>
        <button 
          className={`flex items-center px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeTab === 'analyzer' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab("analyzer")}
        >
          <Sparkles className="w-4 h-4 mr-2 text-primary" />
          AI Analyzer
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "builder" && (
          <motion.div 
            key="builder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <Card className="border-muted shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-muted/30 border-b">
                  <CardTitle className="text-xl">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label className="text-muted-foreground font-semibold">Full Name</Label><Input className="bg-muted/10" value={formData.fullName} onChange={e => handleChange('fullName', e.target.value)} /></div>
                    <div className="space-y-2"><Label className="text-muted-foreground font-semibold">Email</Label><Input className="bg-muted/10" value={formData.email} onChange={e => handleChange('email', e.target.value)} /></div>
                    <div className="space-y-2"><Label className="text-muted-foreground font-semibold">Phone</Label><Input className="bg-muted/10" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
                    <div className="space-y-2"><Label className="text-muted-foreground font-semibold">Location</Label><Input className="bg-muted/10" value={formData.location} onChange={e => handleChange('location', e.target.value)} /></div>
                    <div className="space-y-2"><Label className="text-muted-foreground font-semibold">LinkedIn</Label><Input className="bg-muted/10" value={formData.linkedin} onChange={e => handleChange('linkedin', e.target.value)} /></div>
                    <div className="space-y-2"><Label className="text-muted-foreground font-semibold">GitHub</Label><Input className="bg-muted/10" value={formData.github} onChange={e => handleChange('github', e.target.value)} /></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-muted shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-muted/30 border-b">
                  <CardTitle className="text-xl">Professional Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <textarea 
                    className="w-full min-h-[120px] p-4 border rounded-xl bg-muted/10 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow leading-relaxed" 
                    value={formData.summary}
                    onChange={e => handleChange('summary', e.target.value)}
                  />
                </CardContent>
              </Card>
              
              <Button className="w-full h-12 text-base font-semibold shadow-xl shadow-primary/20 rounded-full">Save Changes</Button>
            </div>
            
            <div className="hidden xl:block relative h-[850px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-muted/20 rounded-3xl -rotate-1 border border-primary/10" />
              <div className="absolute inset-0 border border-muted shadow-2xl bg-muted/10 rounded-2xl p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-muted-foreground">Live Preview (A4)</h3>
                  <Badge variant="outline" className="bg-background">ATS Optimized</Badge>
                </div>
                
                {/* Minimal CV Preview */}
                <div className="bg-white p-10 shadow-sm h-full w-full text-black print:shadow-none overflow-y-auto rounded-xl">
                  <h1 className="text-4xl font-serif text-center mb-2 tracking-tight text-slate-900">{formData.fullName || "Your Name"}</h1>
                  <p className="text-sm text-center text-slate-500 mb-6 font-medium">{formData.email} • {formData.location} • {formData.github}</p>
                  
                  <h2 className="font-bold text-primary uppercase text-xs tracking-widest mb-3 border-b-2 border-primary/20 pb-1">Professional Summary</h2>
                  <p className="text-sm text-slate-700 mb-8 leading-relaxed">{formData.summary}</p>
                  
                  <h2 className="font-bold text-primary uppercase text-xs tracking-widest mb-3 border-b-2 border-primary/20 pb-1">Technical Skills</h2>
                  <div className="mb-8 text-sm text-slate-700">
                    {skills.length > 0 ? (
                      <p className="leading-relaxed"><span className="font-bold text-slate-900">Proficient:</span> {skills.map(s => s.name).join(', ')}</p>
                    ) : (
                      <p className="text-slate-400 italic">No skills added yet.</p>
                    )}
                  </div>

                  <h2 className="font-bold text-primary uppercase text-xs tracking-widest mb-3 border-b-2 border-primary/20 pb-1">Projects & Experience</h2>
                  <div className="mb-6 text-sm">
                    {projects.length > 0 ? projects.map(proj => (
                      <div key={proj.id} className="mb-5">
                        <div className="flex justify-between font-bold text-slate-900 text-base mb-1">
                          <p>{proj.title}</p>
                          <span className="text-xs text-slate-500 font-normal">{proj.status}</span>
                        </div>
                        <p className="text-slate-700 mt-1 leading-relaxed">{proj.description}</p>
                        {proj.tech_stack && proj.tech_stack.length > 0 && (
                          <p className="text-xs text-slate-500 mt-2 font-medium">Tech: {proj.tech_stack.join(', ')}</p>
                        )}
                      </div>
                    )) : (
                      <p className="text-slate-400 italic">No projects added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "analyzer" && (
          <motion.div 
            key="analyzer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-8 pt-4"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background shadow-xl overflow-hidden relative">
              <div className="absolute -right-20 -top-20 opacity-10 rotate-12">
                <BrainCircuit className="w-64 h-64 text-primary" />
              </div>
              <CardHeader className="text-center relative z-10 py-10">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-3xl font-black">AI CV Auditor</CardTitle>
                <CardDescription className="text-lg max-w-lg mx-auto mt-2">
                  Stop getting filtered by Applicant Tracking Systems. Let our AI audit your CV structure, wording, and density.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-12 relative z-10">
                {!isAnalyzing && !analysis && (
                  <Button size="lg" onClick={handleAnalyze} className="font-bold shadow-xl shadow-primary/25 rounded-full px-8 h-14 text-lg hover:-translate-y-1 transition-all">
                    Run Full Audit
                  </Button>
                )}
                {isAnalyzing && (
                  <div className="flex flex-col items-center gap-6">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-sm font-bold tracking-widest uppercase text-primary animate-pulse">Running advanced heuristics...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {analysis && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card className="md:col-span-1 flex flex-col items-center justify-center p-8 text-center border-t-4 border-t-primary shadow-xl bg-gradient-to-b from-background to-muted/20">
                  <div className="w-40 h-40 rounded-full border-8 border-muted flex items-center justify-center mb-6 relative shadow-inner bg-background">
                     <div className="absolute inset-0 border-8 border-primary rounded-full border-t-transparent -rotate-45 shadow-[0_0_15px_rgba(var(--primary),0.3)]"></div>
                    <span className="text-6xl font-black text-foreground">{analysis.score}</span>
                  </div>
                  <h3 className="font-bold text-2xl mb-2">ATS Score</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">This score indicates your likelihood of passing automated enterprise resume filters.</p>
                </Card>

                <Card className="md:col-span-2 shadow-xl border-muted">
                  <CardHeader className="bg-muted/30 border-b pb-6">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Critical Action Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-3">
                      {analysis.suggestions.map((suggestion: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl border border-amber-500/20 text-amber-900 dark:text-amber-200 shadow-sm">
                          <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed font-semibold">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-background rounded-2xl border shadow-sm">
                      <h4 className="font-bold text-sm tracking-wider uppercase mb-6 text-muted-foreground">Detailed Breakdown</h4>
                      <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                        {[
                          { label: 'Structure & Layout', val: analysis.breakdown.structure },
                          { label: 'Keyword Density', val: analysis.breakdown.skills },
                          { label: 'Project Impact', val: analysis.breakdown.projects },
                          { label: 'Experience Depth', val: analysis.breakdown.experience },
                        ].map((metric, i) => (
                           <div key={i} className="space-y-2">
                             <div className="flex justify-between items-end">
                               <span className="text-sm font-semibold">{metric.label}</span>
                               <span className="text-xs font-bold text-primary">{metric.val}%</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                               <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${metric.val}%`}} />
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
