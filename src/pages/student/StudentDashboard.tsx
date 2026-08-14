import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { BrainCircuit, BookOpen, CheckCircle, Code, Target, ArrowRight, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

export default function StudentDashboard() {
  const { profile, user } = useAuth()
  const [stats, setStats] = useState({
    skillScore: 0,
    gapPercentage: 100,
    projects: 0,
    applications: 0
  })
  const [skillsData, setSkillsData] = useState<any[]>([])

  useEffect(() => {
    if (user?.id) {
      fetchDashboardStats()
    }
  }, [user])

  const fetchDashboardStats = async () => {
    if (!user) return

    try {
      const [projectsRes, skillsRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('skills').select('*').eq('user_id', user.id)
      ])

      const projectCount = projectsRes.count || 0
      
      let skillScore = 0
      let gapPercentage = 100
      let chartData: any[] = []
      
      if (skillsRes.data && skillsRes.data.length > 0) {
        const totalProficiency = skillsRes.data.reduce((sum, skill) => sum + (skill.proficiency || 0), 0)
        skillScore = Math.min(100, Math.round((totalProficiency / 1000) * 100))
        gapPercentage = 100 - skillScore

        // Map data for Radar Chart
        chartData = skillsRes.data.map((s) => ({
          subject: s.name,
          A: s.proficiency,
          fullMark: 100,
        })).slice(0, 6) // Max 6 vertices for radar readability
      }

      setStats({
        skillScore,
        gapPercentage,
        projects: projectCount,
        applications: 0
      })
      setSkillsData(chartData)
    } catch (err) {
      console.error(err)
    }
  }

  const nextActions = [
    { title: "Complete System Design Module", type: "learning", icon: <BookOpen className="w-5 h-5" /> },
    { title: "Upload your latest E-Commerce build", type: "portfolio", icon: <Code className="w-5 h-5" /> },
    { title: "Take React Advanced Assessment", type: "assessment", icon: <BrainCircuit className="w-5 h-5" /> }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-primary/10 via-background to-background p-8 rounded-3xl border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <BrainCircuit className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Builder'}!
          </h1>
          <p className="text-muted-foreground text-lg">You are on track for a <span className="text-foreground font-semibold">Full Stack Developer</span> role.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <Button variant="outline" className="rounded-xl px-6 h-12" asChild>
            <Link to="/student/skills">Update Skills</Link>
          </Button>
          <Button className="rounded-xl px-6 h-12 shadow-lg hover:shadow-primary/25 transition-all" asChild>
            <Link to="/student/roadmap">Resume Roadmap <ArrowRight className="ml-2 w-4 h-4"/></Link>
          </Button>
        </div>
      </motion.div>

      {/* Top Metrics */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-muted">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Market Readiness</CardTitle>
              <div className="p-2 bg-primary/10 rounded-xl"><Target className="h-5 w-5 text-primary" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black">{stats.skillScore}%</div>
              <div className="flex items-center text-xs text-emerald-500 font-semibold mt-1">
                <TrendingUp className="w-3 h-3 mr-1"/> +5% this month
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-muted">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Skill Gap</CardTitle>
              <div className="p-2 bg-indigo-500/10 rounded-xl"><BrainCircuit className="h-5 w-5 text-indigo-500" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black">{stats.gapPercentage}%</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">To reach Senior level</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-muted">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Projects Built</CardTitle>
              <div className="p-2 bg-amber-500/10 rounded-xl"><Code className="h-5 w-5 text-amber-500" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black">{stats.projects}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">In your portfolio</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-muted">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Active Applications</CardTitle>
              <div className="p-2 bg-emerald-500/10 rounded-xl"><CheckCircle className="h-5 w-5 text-emerald-500" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black">{stats.applications}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Pending responses</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full border-muted shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Action Plan</CardTitle>
              <CardDescription>AI-recommended steps to close your skill gap.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextActions.map((action, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border bg-muted/30 hover:bg-muted hover:shadow-sm transition-all cursor-pointer group">
                  <div className="p-3 rounded-xl bg-background shadow-sm text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {action.icon}
                  </div>
                  <div className="flex-1 font-semibold text-sm">
                    {action.title}
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full border-muted shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Skill Mastery Matrix</CardTitle>
              <CardDescription>Visual breakdown of your core competencies.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[350px]">
              {skillsData.length > 2 ? (
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}/>
                      <Radar name="Proficiency" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center flex flex-col items-center bg-muted/20 p-12 rounded-3xl border border-dashed w-full">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <BrainCircuit className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Not enough data</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-6">Add at least 3 skills with their proficiency levels to visualize your mastery matrix.</p>
                  <Button className="rounded-full shadow-md" asChild>
                    <Link to="/student/skills">Add Skills Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
