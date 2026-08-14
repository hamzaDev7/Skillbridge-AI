import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Building, Filter, Star, Eye, Zap, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_CANDIDATES = [
  { id: 1, name: "Jane Doe", role: "Full-Stack Developer", match: 95, location: "New York, NY", skills: ["React", "Node.js", "PostgreSQL"], status: "New" },
  { id: 2, name: "John Smith", role: "Frontend Developer", match: 88, location: "Remote", skills: ["Vue", "TypeScript", "Tailwind CSS"], status: "Reviewed" },
  { id: 3, name: "Alice Johnson", role: "Data Scientist", match: 92, location: "San Francisco, CA", skills: ["Python", "PyTorch", "SQL"], status: "Interviewing" },
]

export default function RecruiterDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-indigo-900 to-indigo-950 p-8 rounded-3xl border border-indigo-500/20 relative overflow-hidden text-indigo-50 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none -rotate-12">
           <Zap className="w-48 h-48 text-indigo-300" />
        </div>
        <div className="relative z-10">
          <Badge className="bg-indigo-500/30 text-indigo-200 hover:bg-indigo-500/40 border-none mb-3 backdrop-blur-md">SkillBridge Recruiter Network</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">Talent Pipeline</h1>
          <p className="text-indigo-200/80 mt-2 text-lg max-w-2xl leading-relaxed">Source, filter, and hire top-tier developers with verified skills and AI-audited portfolios.</p>
        </div>
        <div className="flex gap-3 relative z-10">
          <Button variant="outline" className="rounded-full px-6 bg-indigo-950/50 border-indigo-500/30 text-indigo-100 hover:bg-indigo-800"><Building className="w-4 h-4 mr-2" /> Company Profile</Button>
          <Button className="rounded-full px-6 shadow-xl shadow-indigo-500/20 bg-indigo-500 hover:bg-indigo-400 text-white transition-all">Post Opportunity</Button>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Active Postings", value: "4", icon: <Building className="h-5 w-5 text-indigo-500" />, bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
          { title: "Total Applicants", value: "128", icon: <Users className="h-5 w-5 text-blue-500" />, bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { title: "Shortlisted", value: "24", icon: <Star className="h-5 w-5 text-amber-500" />, bg: "bg-amber-500/10", border: "border-amber-500/20" },
          { title: "Profile Views", value: "892", icon: <Eye className="h-5 w-5 text-emerald-500" />, bg: "bg-emerald-500/10", border: "border-emerald-500/20" }
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className={`bg-gradient-to-b from-background to-muted/10 border ${metric.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}>
               <div className={`absolute -right-4 -top-4 w-24 h-24 ${metric.bg} rounded-full blur-2xl opacity-50`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{metric.title}</CardTitle>
                <div className={`p-2 rounded-full ${metric.bg}`}>{metric.icon}</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-black text-foreground">{metric.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <Card className="border-muted shadow-lg bg-gradient-to-b from-background to-muted/5">
          <CardHeader className="border-b bg-muted/20 pb-6">
            <CardTitle className="text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" /> AI Candidate Matching
            </CardTitle>
            <CardDescription className="text-base">Candidates scored based on their verified skills, GitHub commits, and projects.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search candidates by skill, role, or location..." className="pl-12 h-12 rounded-full bg-muted/30 border-muted shadow-inner text-base" />
              </div>
              <Button variant="outline" className="h-12 rounded-full px-8 shadow-sm"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {MOCK_CANDIDATES.map((candidate, idx) => (
                  <motion.div 
                    key={candidate.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-muted rounded-2xl gap-6 bg-background hover:bg-muted/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex gap-5 items-center">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center font-black text-indigo-600 text-2xl group-hover:scale-105 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xl group-hover:text-indigo-600 transition-colors">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground font-medium mt-1">{candidate.role} • {candidate.location}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {candidate.skills.map(s => <Badge key={s} variant="secondary" className="bg-background border-muted text-xs font-semibold px-3 py-1 rounded-full">{s}</Badge>)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-muted">
                      <div className="text-right flex flex-col items-end">
                        <Badge className={`${candidate.match >= 90 ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'} border-none px-3 py-1 mb-1 text-sm font-bold`}>
                          {candidate.match}% Match
                        </Badge>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{candidate.status}</span>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full shadow-sm hover:bg-muted font-bold">View CV</Button>
                        <Button className="rounded-full shadow-md hover:shadow-lg font-bold bg-foreground text-background hover:bg-foreground/90">Message</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
