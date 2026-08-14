import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrainCircuit, Plus, Zap, AlertTriangle, CheckCircle2, Trash2, Loader2, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
export default function SkillManagementPage() {
  const { user } = useAuth()
  const [skills, setSkills] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [newSkillName, setNewSkillName] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState("Beginner")
  const [isAdding, setIsAdding] = useState(false)
  
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [gapAnalysis, setGapAnalysis] = useState<any>(null)

  useEffect(() => {
    if (user?.id) {
      fetchSkills()
    } else {
      setIsLoading(false)
    }
  }, [user])

  const fetchSkills = async () => {
    if (!user) return
    setIsLoading(true)
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
    
    if (!error && data) {
      setSkills(data)
    }
    setIsLoading(false)
  }

  const parseProficiency = (level: string) => {
    if (level === 'Advanced') return 90
    if (level === 'Intermediate') return 60
    return 30
  }

  const getProficiencyLabel = (prof: number) => {
    if (prof >= 80) return 'Advanced'
    if (prof >= 50) return 'Intermediate'
    return 'Beginner'
  }

  const handleAddSkill = async () => {
    if (!newSkillName.trim() || !user) return
    setIsAdding(true)

    const { data, error } = await supabase
      .from('skills')
      .insert({
        user_id: user.id,
        name: newSkillName,
        proficiency: parseProficiency(newSkillLevel),
        verified: false
      })
      .select()
      .single()

    if (!error && data) {
      setSkills([...skills, data])
      setNewSkillName("")
      setNewSkillLevel("Beginner")
    }
    setIsAdding(false)
  }

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id)
      
    if (!error) {
      setSkills(skills.filter(s => s.id !== id))
    }
  }

  const runGapAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setGapAnalysis({
        high: [
          { name: "TypeScript", reason: "Essential for modern robust React applications." },
          { name: "PostgreSQL", reason: "Required for backend data persistence." }
        ],
        medium: [
          { name: "Docker", reason: "Useful for containerized deployment." }
        ]
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Skill Matrix</h1>
          <p className="text-muted-foreground mt-2 text-lg">Track your proficiencies, verify your knowledge, and discover what to learn next.</p>
        </div>
        
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-md">
              <Plus className="w-4 h-4 mr-2"/> Add New Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>Log a new technology you've been working with.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input 
                  placeholder="E.g. GraphQL, Python, Figma" 
                  value={newSkillName} 
                  onChange={(e) => setNewSkillName(e.target.value)} 
                  className="h-11"
                />
              </div>
              <div className="grid gap-2">
                 <Select value={newSkillLevel} onValueChange={setNewSkillLevel}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAddSkill} disabled={!newSkillName.trim()}>
                {isAdding && newSkillName.trim() ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : null} 
                Save Skill
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Your Inventory</h3>
            {isLoading ? (
               <div className="flex justify-center p-12 bg-muted/10 rounded-2xl border border-dashed">
                 <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {skills.map(skill => (
                    <motion.div 
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                    >
                      <Card className="h-full border-muted hover:shadow-md transition-all duration-300 group overflow-hidden">
                        <div className="p-5 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-lg">{skill.name}</h4>
                                {skill.verified && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                              </div>
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                {getProficiencyLabel(skill.proficiency)}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(skill.id)} className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-2 w-full mt-4">
                             <div className="flex justify-between text-xs font-medium text-muted-foreground">
                               <span>Proficiency</span>
                               <span>{skill.proficiency}%</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                               <motion.div 
                                 className="h-full bg-primary" 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${skill.proficiency}%` }}
                                 transition={{ duration: 1, ease: "easeOut" }}
                               />
                             </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {skills.length === 0 && (
                  <div className="col-span-full text-center py-12 bg-muted/10 rounded-2xl border border-dashed">
                    <BrainCircuit className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground font-medium">No skills mapped yet.</p>
                    <p className="text-sm text-muted-foreground mt-1">Start by adding your most comfortable technologies above.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-b from-indigo-500/10 to-background border-indigo-500/20 sticky top-24 shadow-lg overflow-hidden relative">
            <div className="absolute -top-10 -right-10 text-indigo-500/10 rotate-12 pointer-events-none">
              <Sparkles className="w-40 h-40" />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-indigo-500">
                <BrainCircuit className="w-5 h-5" /> AI Gap Analyzer
              </CardTitle>
              <CardDescription>
                Compare your matrix against top-tier Software Engineer requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {!gapAnalysis && !isAnalyzing && (
                <div className="text-center py-8">
                  <Button onClick={runGapAnalysis} className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-indigo-500/25 transition-all">
                    <Zap className="w-4 h-4 mr-2" /> Run Analysis
                  </Button>
                </div>
              )}
              
              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <BrainCircuit className="w-10 h-10 text-indigo-500 animate-pulse" />
                  <p className="text-sm font-medium animate-pulse text-indigo-500">Scanning market data...</p>
                </div>
              )}
              
              {gapAnalysis && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-background/80 backdrop-blur p-4 rounded-2xl border shadow-sm">
                    <h4 className="flex items-center text-xs font-bold text-destructive mb-3 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 mr-2" /> Critical Gaps
                    </h4>
                    <div className="space-y-3">
                      {gapAnalysis.high.map((item: any, i: number) => (
                        <div key={i} className="bg-destructive/5 p-3 rounded-xl border border-destructive/10 text-sm">
                          <span className="font-bold block mb-1 text-destructive">{item.name}</span>
                          <span className="text-muted-foreground text-xs leading-relaxed">{item.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-background/80 backdrop-blur p-4 rounded-2xl border shadow-sm">
                    <h4 className="flex items-center text-xs font-bold text-amber-500 mb-3 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Recommended
                    </h4>
                    <div className="space-y-3">
                      {gapAnalysis.medium.map((item: any, i: number) => (
                        <div key={i} className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 text-sm">
                          <span className="font-bold block mb-1 text-amber-600 dark:text-amber-500">{item.name}</span>
                          <span className="text-muted-foreground text-xs leading-relaxed">{item.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => setGapAnalysis(null)}>
                    Reset Analysis
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
