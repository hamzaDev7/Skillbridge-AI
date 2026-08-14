import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BrainCircuit, ExternalLink, Sparkles, Loader2, Plus, Code, Trash2, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
export default function ProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProject, setGeneratedProject] = useState<any>(null)
  const [focusArea, setFocusArea] = useState("")

  const [isAddingManual, setIsAddingManual] = useState(false)
  const [manualTitle, setManualTitle] = useState("")
  const [manualDescription, setManualDescription] = useState("")
  const [manualTech, setManualTech] = useState("")
  
  useEffect(() => {
    if (user?.id) {
      fetchProjects()
    } else {
      setIsLoading(false)
    }
  }, [user])

  const fetchProjects = async () => {
    if (!user) return
    setIsLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setProjects(data)
    }
    setIsLoading(false)
  }

  const handleGenerateIdea = () => {
    if (!focusArea) return
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedProject({
        title: `${focusArea} Showcase Application`,
        description: `A comprehensive application built to demonstrate your skills in ${focusArea}. Perfect for your portfolio.`,
        tech: ["React", focusArea, "Tailwind CSS"],
        difficulty: "Intermediate",
        features: [
          "User Authentication",
          `Core ${focusArea} integration`,
          "Responsive Design",
          "Deployment configuration"
        ]
      })
      setIsGenerating(false)
    }, 1500)
  }

  const handleAcceptProject = async () => {
    if (generatedProject && user) {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: generatedProject.title,
          description: generatedProject.description,
          tech_stack: generatedProject.tech,
          status: 'Planning'
        })
        .select()
        .single()
      
      if (!error && data) {
        setProjects([data, ...projects])
      }
      setGeneratedProject(null)
      setFocusArea("")
    }
  }

  const handleAddManualProject = async () => {
    if (!manualTitle || !user) return
    
    const techArray = manualTech.split(',').map(t => t.trim()).filter(Boolean)

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        title: manualTitle,
        description: manualDescription,
        tech_stack: techArray,
        status: 'In Progress'
      })
      .select()
      .single()
      
    if (!error && data) {
      setProjects([data, ...projects])
      setIsAddingManual(false)
      setManualTitle("")
      setManualDescription("")
      setManualTech("")
    }
  }

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      
    if (!error) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Project Portfolio</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your projects or let AI architect your next portfolio piece.</p>
        </div>
        
        <Dialog open={isAddingManual} onOpenChange={setIsAddingManual}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-md">
              <Plus className="w-4 h-4 mr-2"/> Add Custom Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log Custom Project</DialogTitle>
              <DialogDescription>
                Add a project you've already built or are currently building.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" value={manualTitle} onChange={e => setManualTitle(e.target.value)} placeholder="e.g. Next.js SaaS Boilerplate" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={manualDescription} onChange={e => setManualDescription(e.target.value)} placeholder="What does this project do?" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tech">Tech Stack (comma separated)</Label>
                <Input id="tech" value={manualTech} onChange={e => setManualTech(e.target.value)} placeholder="React, Node.js, PostgreSQL" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsAddingManual(false)}>Cancel</Button>
              <Button onClick={handleAddManualProject} disabled={!manualTitle}>Save Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold">Your Portfolio</h3>
          {isLoading ? (
             <div className="flex justify-center p-12 bg-muted/10 rounded-2xl border border-dashed">
               <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {projects.map(project => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                  >
                    <Card className="h-full flex flex-col border-muted hover:shadow-lg transition-all duration-300 group overflow-hidden bg-gradient-to-b from-background to-muted/20">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                          </div>
                          <Badge variant={project.status === 'Completed' ? 'default' : (project.status === 'Planning' ? 'outline' : 'secondary')} className="whitespace-nowrap">
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2 mt-2 h-10">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack?.map((t: string) => (
                            <Badge key={t} variant="secondary" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 transition-colors">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <div className="p-4 border-t bg-muted/10 flex items-center justify-between">
                        <div className="flex gap-3">
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" title="Repository">
                            <Code className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" title="Live Demo">
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)} className="w-8 h-8 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              {projects.length === 0 && (
                <div className="col-span-full text-center py-16 border rounded-2xl border-dashed bg-muted/10">
                  <div className="w-16 h-16 bg-background rounded-full shadow-sm flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-bold text-lg">No projects yet</h3>
                  <p className="text-muted-foreground mt-1 max-w-sm mx-auto">Generate an AI idea on the right, or add a custom project you're already building.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-amber-500/10 to-background border-amber-500/20 sticky top-24 shadow-lg overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 text-amber-500/10 -rotate-12 pointer-events-none">
              <Sparkles className="w-40 h-40" />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                <BrainCircuit className="w-5 h-5" /> AI Project Architect
              </CardTitle>
              <CardDescription>
                Stuck? Let AI design a portfolio-ready project architecture tailored to your skill gaps.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {!generatedProject && !isGenerating && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-amber-900 dark:text-amber-200">What do you want to practice?</Label>
                    <Input 
                      placeholder="e.g. WebSockets, Redis, Microservices" 
                      value={focusArea}
                      onChange={(e) => setFocusArea(e.target.value)}
                      className="border-amber-500/20 focus-visible:ring-amber-500"
                    />
                  </div>
                  <Button onClick={handleGenerateIdea} className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all" disabled={!focusArea}>
                    <Sparkles className="w-4 h-4 mr-2" /> Architect Idea
                  </Button>
                </div>
              )}
              
              {isGenerating && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                  <p className="text-sm font-bold text-amber-600 dark:text-amber-500 animate-pulse">Designing database schema...</p>
                </div>
              )}

              {generatedProject && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-5 bg-background/80 backdrop-blur border border-amber-500/20 rounded-2xl shadow-sm">
                    <h4 className="font-extrabold text-lg mb-2 text-foreground">{generatedProject.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{generatedProject.description}</p>
                    
                    <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {generatedProject.tech.map((t: string) => (
                        <Badge key={t} variant="secondary" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <h5 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Features</h5>
                    <ul className="space-y-2">
                      {generatedProject.features.map((f: string) => (
                        <li key={f} className="flex items-start text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAcceptProject} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">Accept Project</Button>
                    <Button variant="outline" onClick={() => setGeneratedProject(null)}>Discard</Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
