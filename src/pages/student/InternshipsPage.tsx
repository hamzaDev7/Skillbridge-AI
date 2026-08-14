import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building, MapPin, Briefcase, Search, Filter, Sparkles, CheckCircle2, Bookmark } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_INTERNSHIPS = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "TechNova Solutions",
    location: "San Francisco, CA",
    remote: true,
    tags: ["React", "Node.js", "Summer 2026"],
    postedAt: "2 days ago",
    status: "Available",
    matchScore: 94
  },
  {
    id: "2",
    title: "Frontend Developer Intern",
    company: "Creative Web Agency",
    location: "New York, NY",
    remote: false,
    tags: ["UI/UX", "Tailwind CSS", "JavaScript"],
    postedAt: "1 week ago",
    status: "Applied",
    matchScore: 88
  },
  {
    id: "3",
    title: "AI/ML Research Intern",
    company: "DeepMind Analytics",
    location: "London, UK",
    remote: true,
    tags: ["Python", "PyTorch", "Data Science"],
    postedAt: "3 days ago",
    status: "Available",
    matchScore: 76
  },
  {
    id: "4",
    title: "Full Stack Engineering Intern",
    company: "Global Systems Inc",
    location: "Austin, TX",
    remote: true,
    tags: ["React", "PostgreSQL", "TypeScript"],
    postedAt: "Just now",
    status: "Available",
    matchScore: 98
  }
]

export default function InternshipsPage() {
  const [internships, setInternships] = useState(MOCK_INTERNSHIPS)
  const [search, setSearch] = useState("")
  const [applyingId, setApplyingId] = useState<string | null>(null)

  const handleApply = (id: string) => {
    setApplyingId(id)
    // Simulate API call
    setTimeout(() => {
      setInternships(prev => 
        prev.map(job => job.id === id ? { ...job, status: "Applied" } : job)
      )
      setApplyingId(null)
    }, 1000)
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-3xl border border-primary/10 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none -rotate-12">
           <Briefcase className="w-48 h-48 text-primary" />
        </div>
        <div className="relative z-10">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none mb-3">AI Matched Opportunities</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Talent Board</h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl leading-relaxed">Discover exclusive internships dynamically matched to your verified SkillBridge profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
           <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search roles..." 
              className="pl-10 h-12 bg-muted/20 border-muted rounded-xl shadow-sm"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          
          <Card className="border-muted shadow-sm">
             <CardHeader className="bg-muted/30 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                   <Filter className="w-4 h-4" /> Filters
                </CardTitle>
             </CardHeader>
             <CardContent className="p-5 space-y-6">
                <div className="space-y-3">
                   <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Match Score</h4>
                   <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-primary" defaultChecked /> &gt; 90% Match</label>
                      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-primary" defaultChecked /> &gt; 70% Match</label>
                      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-primary" /> All Opportunities</label>
                   </div>
                </div>
                
                <div className="space-y-3">
                   <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Work Style</h4>
                   <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-primary" defaultChecked /> Remote</label>
                      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-primary" /> Hybrid</label>
                      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="rounded text-primary" /> On-site</label>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence>
            {internships.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden border-muted hover:shadow-md hover:border-primary/30 transition-all duration-300 group bg-gradient-to-b from-background to-muted/10">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row justify-between gap-6 p-6">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                          {job.remote && <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-none font-semibold">Remote</Badge>}
                          {job.matchScore > 90 && (
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-none font-semibold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Top Match
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium">
                          <span className="flex items-center text-foreground"><Building className="w-4 h-4 mr-2 opacity-50"/> {job.company}</span>
                          <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 opacity-50"/> {job.location}</span>
                          <span className="flex items-center"><Briefcase className="w-4 h-4 mr-2 opacity-50"/> {job.postedAt}</span>
                        </div>
      
                        <div className="flex flex-wrap gap-2 pt-2">
                          {job.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-background">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 justify-center min-w-[160px] shrink-0 border-t sm:border-t-0 sm:border-l border-muted pt-4 sm:pt-0 sm:pl-6">
                        <div className="flex items-center justify-between sm:justify-center gap-2 text-sm font-bold">
                           <span className="text-muted-foreground">Match:</span>
                           <span className={`${job.matchScore >= 90 ? 'text-emerald-500' : 'text-amber-500'} flex items-center gap-1`}>
                              <CheckCircle2 className="w-4 h-4" /> {job.matchScore}%
                           </span>
                        </div>
                        {job.status === "Applied" ? (
                          <Button variant="secondary" disabled className="w-full font-bold bg-muted text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2"/> Applied</Button>
                        ) : (
                          <Button 
                            className="w-full font-bold shadow-md group-hover:shadow-lg transition-all"
                            onClick={() => handleApply(job.id)}
                            disabled={applyingId === job.id}
                          >
                            {applyingId === job.id ? <Sparkles className="w-4 h-4 mr-2 animate-pulse" /> : null}
                            {applyingId === job.id ? "Applying..." : "Apply Now"}
                          </Button>
                        )}
                        <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                           <Bookmark className="w-4 h-4 mr-2" /> Save
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
