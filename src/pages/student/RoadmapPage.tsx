import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, Target, Sparkles, Compass, MapPin, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"

const MOCK_ROADMAP = {
  title: "Full Stack Developer",
  description: "A tailored path to take you from your current skill level to a production-ready Full Stack Engineer, focusing on React and Node.js.",
  phases: [
    {
      id: "p1",
      title: "Frontend Fundamentals",
      items: [
        { id: "i1", title: "HTML & Modern CSS", status: "Completed", difficulty: "Beginner", time: "2 weeks" },
        { id: "i2", title: "Advanced JavaScript (ES6+)", status: "Completed", difficulty: "Beginner", time: "3 weeks" },
      ]
    },
    {
      id: "p2",
      title: "Frontend Frameworks",
      items: [
        { id: "i3", title: "React Architecture", status: "In Progress", difficulty: "Intermediate", time: "4 weeks" },
        { id: "i4", title: "Global State Management", status: "Available", difficulty: "Intermediate", time: "2 weeks" },
      ]
    },
    {
      id: "p3",
      title: "Backend Services",
      items: [
        { id: "i5", title: "Node.js & Express API", status: "Locked", difficulty: "Intermediate", time: "4 weeks" },
        { id: "i6", title: "PostgreSQL & Database Design", status: "Locked", difficulty: "Advanced", time: "3 weeks" },
      ]
    }
  ]
}

export default function RoadmapPage() {
  const { user } = useAuth()
  const [roadmap, setRoadmap] = useState(MOCK_ROADMAP)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    if (user) {
      // Simulate AI generation time
      await new Promise(r => setTimeout(r, 2000))
      
      const { data: rmData } = await supabase
        .from('roadmaps')
        .insert({ user_id: user.id, title: "AI Accelerated: Full Stack Engineer", status: 'Active' })
        .select()
        .single()
        
      if (rmData) {
        // Insert a dummy item to show sync
        await supabase.from('roadmap_items').insert({
          roadmap_id: rmData.id,
          title: "Frontend Architecture",
          difficulty: "Intermediate",
          estimated_time: "4 weeks",
          status: "In Progress"
        })
      }
    }

    setRoadmap({
      ...MOCK_ROADMAP,
      title: "AI Accelerated: Full Stack Engineer",
      description: "A freshly generated, highly optimized path based on your latest skill gap analysis."
    })
    setIsGenerating(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle2 className="w-6 h-6 text-emerald-500 bg-emerald-500/10 rounded-full" />
      case "In Progress": return <Clock className="w-6 h-6 text-amber-500 bg-amber-500/10 rounded-full animate-pulse" />
      case "Available": return <Circle className="w-6 h-6 text-primary bg-primary/10 rounded-full" />
      default: return <Target className="w-6 h-6 text-muted-foreground/50 bg-muted rounded-full" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-3xl border border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none -rotate-12">
           <Compass className="w-48 h-48 text-primary" />
        </div>
        <div className="relative z-10">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none mb-3">AI Generated Career Path</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{roadmap.title}</h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl leading-relaxed">{roadmap.description}</p>
        </div>
        <Button 
          variant="default" 
          className="shadow-lg shadow-primary/20 rounded-full px-6 whitespace-nowrap relative z-10"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          {isGenerating ? "Analyzing Profile..." : "Recalibrate with AI"}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto pl-4 md:pl-0">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-12">
          {roadmap.phases.map((phase, i) => (
            <motion.div key={phase.id} variants={itemVariants} className="relative">
              {/* Timeline line */}
              {i !== roadmap.phases.length - 1 && (
                <div className="absolute left-6 md:left-[2.25rem] top-[4.5rem] bottom-[-3rem] w-1 bg-gradient-to-b from-primary/30 to-muted z-0 rounded-full" />
              )}
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background flex items-center justify-center text-primary font-black text-xl md:text-2xl border-4 border-primary/20 shadow-lg shrink-0">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold">{phase.title}</h3>
                </div>

                <div className="ml-16 md:ml-24 space-y-4 pr-4">
                  <AnimatePresence>
                    {phase.items.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                      >
                        <Card className={`overflow-hidden transition-all duration-300 border-l-4 ${
                          item.status === 'Locked' ? 'opacity-60 bg-muted/30 border-l-muted-foreground/30' : 
                          item.status === 'Completed' ? 'border-l-emerald-500 hover:shadow-md' :
                          item.status === 'In Progress' ? 'border-l-amber-500 shadow-md scale-[1.01]' :
                          'border-l-primary hover:shadow-md hover:border-l-primary'
                        }`}>
                          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start sm:items-center gap-4">
                              <div className="mt-1 sm:mt-0 shrink-0">
                                {getStatusIcon(item.status)}
                              </div>
                              <div>
                                <h4 className={`font-bold text-lg ${item.status === 'Completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                  {item.title}
                                </h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge variant="secondary" className={`${
                                    item.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                                    item.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                                    'bg-purple-500/10 text-purple-700 dark:text-purple-400'
                                  }`}>
                                    {item.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className="text-muted-foreground font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.time}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-bold uppercase tracking-widest sm:text-right shrink-0">
                               <span className={`${
                                  item.status === 'Completed' ? 'text-emerald-500' :
                                  item.status === 'In Progress' ? 'text-amber-500' :
                                  item.status === 'Available' ? 'text-primary' :
                                  'text-muted-foreground'
                               }`}>
                                 {item.status}
                               </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="flex justify-center pt-8">
         <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold text-sm">Destination: Full Stack Engineer</span>
         </div>
      </div>
    </div>
  )
}
