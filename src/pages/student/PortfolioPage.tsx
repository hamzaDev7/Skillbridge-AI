import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, ExternalLink, Mail, Globe, Briefcase, GraduationCap, Code } from "lucide-react"
import { motion } from "framer-motion"

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="space-y-8 pb-12 pt-4">
      <div className="flex justify-end mb-4">
        <Button onClick={handleShare} className="rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all">
          <Share2 className="w-4 h-4 mr-2" />
          {copied ? "Copied Link!" : "Share Public Portfolio"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden border-muted shadow-xl bg-gradient-to-b from-background to-muted/20 relative">
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 to-indigo-500/20" />
              <CardContent className="p-8 text-center space-y-6 relative z-10 pt-16">
                <div className="w-40 h-40 mx-auto bg-background rounded-full flex items-center justify-center text-5xl font-black text-foreground border-8 border-background shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white">
                    JD
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Jane Doe</h1>
                  <p className="text-primary font-bold mt-1 uppercase tracking-widest text-sm">Full-Stack Developer</p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button size="icon" variant="outline" className="rounded-full w-12 h-12 shadow-sm hover:bg-primary hover:text-white transition-all"><Code className="w-5 h-5" /></Button>
                  <Button size="icon" variant="outline" className="rounded-full w-12 h-12 shadow-sm hover:bg-blue-600 hover:text-white border-none bg-blue-500/10 text-blue-600 transition-all"><Globe className="w-5 h-5" /></Button>
                  <Button size="icon" variant="outline" className="rounded-full w-12 h-12 shadow-sm hover:bg-primary hover:text-white transition-all"><Mail className="w-5 h-5" /></Button>
                </div>
                <div className="pt-6 border-t border-muted space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Verified Tech Stack</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind', 'GraphQL'].map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-background border-muted shadow-sm px-3 py-1 font-semibold text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-8 space-y-10">
          <motion.section variants={item}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg"><Code className="w-6 h-6 text-primary" /></div>
              <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            </div>
            <Card className="bg-muted/10 border-none shadow-inner">
               <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    I am a passionate software engineering student specializing in building highly scalable, interactive web applications. 
                    Currently seeking a Summer 2026 internship to apply my knowledge of React, Node.js, and modern cloud architecture in a fast-paced environment.
                  </p>
               </CardContent>
            </Card>
          </motion.section>

          <motion.section variants={item}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/10 rounded-lg"><Briefcase className="w-6 h-6 text-amber-500" /></div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "SkillBridge AI", desc: "Intelligent career development platform mapping skills to job market realities.", tags: ["React", "Supabase", "Tailwind"], icon: "bg-blue-500" },
                { title: "E-Commerce REST API", desc: "High-performance, secure backend architecture for enterprise-scale online stores.", tags: ["Node.js", "Express", "Docker"], icon: "bg-emerald-500" }
              ].map((proj, i) => (
                <Card key={i} className="group overflow-hidden border-muted hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background to-muted/20">
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className={`w-8 h-1 rounded-full mb-4 ${proj.icon}`} />
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{proj.title}</CardTitle>
                        <CardDescription className="text-sm font-medium leading-relaxed h-10">{proj.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex gap-2 flex-wrap mb-6">
                      {proj.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-muted/50 border-none">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="w-full font-bold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                        <Code className="w-4 h-4 mr-2" /> Repository
                      </Button>
                      <Button size="icon" variant="outline" className="shrink-0"><ExternalLink className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
          
          <motion.section variants={item}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-purple-500/10 rounded-lg"><GraduationCap className="w-6 h-6 text-purple-500" /></div>
              <h2 className="text-3xl font-bold tracking-tight">Experience & Education</h2>
            </div>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                   <GraduationCap className="w-4 h-4" />
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 border-muted shadow-sm hover:shadow-md transition-all">
                  <h3 className="font-extrabold text-xl mb-1 text-foreground">B.S. Computer Science</h3>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                     <span>Stanford University</span>
                     <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                     <span>2021 - 2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Relevant Coursework: Data Structures, Algorithms, Web Development, Databases, Distributed Systems.</p>
                </Card>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                   <Code className="w-4 h-4" />
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 border-muted shadow-sm hover:shadow-md transition-all">
                  <h3 className="font-extrabold text-xl mb-1 text-foreground">Web Development Bootcamp</h3>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 mb-3">
                     <span>CodeCademy</span>
                     <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                     <span>Summer 2023</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Completed an intensive 12-week program focusing on the MERN stack, deploying 4 full-stack applications.</p>
                </Card>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
}
