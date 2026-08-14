import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, BookOpen, Building, Activity, Settings, AlertTriangle, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const chartData = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 3000 },
  { name: 'Mar', users: 5000 },
  { name: 'Apr', users: 8780 },
  { name: 'May', users: 9890 },
  { name: 'Jun', users: 12450 },
]

export default function AdminDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 relative overflow-hidden text-slate-100">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none -rotate-12">
           <ShieldCheck className="w-48 h-48 text-slate-100" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full bg-slate-700/50 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur-md mb-4 border border-slate-600/50">
            <Activity className="w-3 h-3 mr-2 text-emerald-400" /> Systems Nominal
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Platform Command Center</h1>
          <p className="text-slate-400 mt-2 text-lg max-w-2xl leading-relaxed">Global overview of SkillBridge AI infrastructure, user growth, and critical alerts.</p>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item}>
          <Card className="border-muted shadow-sm hover:shadow-md transition-all overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Users className="w-24 h-24" /></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Total Users</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black">12,450</div>
              <p className="text-sm font-medium text-emerald-500 mt-2 flex items-center">
                +12% <span className="text-muted-foreground ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-muted shadow-sm hover:shadow-md transition-all overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><BookOpen className="w-24 h-24" /></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Active Roadmaps</CardTitle>
              <BookOpen className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black">8,231</div>
              <p className="text-sm font-medium text-emerald-500 mt-2 flex items-center">
                +5% <span className="text-muted-foreground ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-muted shadow-sm hover:shadow-md transition-all overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Building className="w-24 h-24" /></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Partner Orgs</CardTitle>
              <Building className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black">142</div>
              <p className="text-sm font-medium text-emerald-500 mt-2 flex items-center">
                +3 <span className="text-muted-foreground ml-1">this week</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-muted shadow-sm hover:shadow-md transition-all overflow-hidden relative bg-emerald-500/5">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-emerald-500"><Activity className="w-24 h-24" /></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">System Health</CardTitle>
              <Activity className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">99.9%</div>
              <p className="text-sm font-medium text-emerald-600/80 dark:text-emerald-400/80 mt-2">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full border-muted shadow-sm">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-lg">Recent System Alerts</CardTitle>
              <CardDescription>Automated notifications from edge functions and database.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-200">High API Usage</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">AI Skill Analyzer edge function approaching rate limit. Consider scaling instances.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Settings className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-blue-900 dark:text-blue-200">Database Backup Complete</p>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Daily snapshot created successfully at 00:00 UTC and replicated to cold storage.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full border-muted shadow-sm">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-lg">User Growth Trend</CardTitle>
              <CardDescription>Monthly new user registrations across all roles.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
