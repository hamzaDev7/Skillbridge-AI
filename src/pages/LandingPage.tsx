import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowRight, BrainCircuit, Target, Code, Briefcase, ChevronRight, CheckCircle2, Quote } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-60 -left-40 w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        
        <div className="container relative z-10 flex flex-col items-center text-center max-w-6xl px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            SkillBridge AI is now in Public Beta <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Stop guessing.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
              Start building your career.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            The intelligent career development platform for students and fresh graduates. Discover your skill gaps, generate personalized learning roadmaps, and land your dream job with AI-powered guidance.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all duration-300" asChild>
              <Link to="/login">Get Started Free <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full bg-background/50 backdrop-blur-sm hover:bg-accent transition-all duration-300" asChild>
              <Link to="/how-it-works">See How It Works</Link>
            </Button>
          </motion.div>

          {/* Hero Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-5xl mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="rounded-t-2xl border-x border-t border-muted/50 bg-card/40 backdrop-blur-md p-2 overflow-hidden shadow-2xl">
              <div className="rounded-t-xl bg-background border border-muted flex flex-col overflow-hidden">
                <div className="h-10 bg-muted/30 border-b flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-8 grid grid-cols-3 gap-6 opacity-80 pointer-events-none">
                   <div className="col-span-2 space-y-4">
                     <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse" />
                     <div className="h-32 w-full bg-muted/50 rounded-xl" />
                     <div className="h-32 w-full bg-muted/50 rounded-xl" />
                   </div>
                   <div className="col-span-1 space-y-4">
                     <div className="h-32 w-full bg-primary/10 rounded-xl" />
                     <div className="h-64 w-full bg-muted/30 rounded-xl" />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED BY / SOCIAL PROOF */}
      <section className="py-10 border-y border-muted/30 bg-muted/10">
        <div className="container text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by students from top universities</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Abstract Logos using SVG shapes */}
             <div className="flex items-center gap-2 font-black text-xl"><Target className="w-6 h-6"/> Stanford</div>
             <div className="flex items-center gap-2 font-black text-xl"><BrainCircuit className="w-6 h-6"/> MIT</div>
             <div className="flex items-center gap-2 font-black text-xl"><Code className="w-6 h-6"/> Berkeley</div>
             <div className="flex items-center gap-2 font-black text-xl"><Briefcase className="w-6 h-6"/> Harvard</div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 Steps) */}
      <section id="features" className="py-32 relative bg-background">
        <div className="container max-w-7xl px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Your Fast-Track to Tech</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We replace generic advice with a highly personalized, AI-driven career pipeline.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 -translate-y-1/2 z-0" />
            
            {[
              { num: "01", title: "Analyze Skills", desc: "Connect your GitHub or answer a few questions. Our AI builds a detailed map of your current technical abilities." },
              { num: "02", title: "Bridge the Gap", desc: "Get a personalized roadmap tailored to your target role, with highly specific project recommendations." },
              { num: "03", title: "Get Hired", desc: "Your verified portfolio automatically matches you with recruiters looking for your exact skill set." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center bg-background p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-black mb-6 shadow-xl shadow-primary/20">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURE DEEP DIVES (Zig-Zag) */}
      <section className="py-24 bg-muted/20 overflow-hidden">
        <div className="container max-w-6xl space-y-32">
          
          {/* Feature 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <motion.div variants={fadeUp} className="flex-1 space-y-6">
              <div className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
                <BrainCircuit className="w-4 h-4 mr-2" /> AI Gap Analyzer
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Know exactly what you're missing.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stop wondering if you're ready. Our AI scans millions of job postings to identify the exact technical and soft skills you lack for your target role.
              </p>
              <ul className="space-y-3 mt-6">
                {['Real-time industry skill mapping', 'Automated GitHub repository analysis', 'Interactive technical assessments'].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground"><CheckCircle2 className="w-5 h-5 mr-3 text-primary" /> {item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="flex-1 w-full">
              <div className="aspect-square md:aspect-video rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border flex items-center justify-center shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                {/* Mock UI */}
                <div className="w-3/4 h-3/4 bg-background/80 backdrop-blur-md rounded-xl border shadow-xl p-6 flex flex-col gap-4">
                  <div className="h-4 w-1/3 bg-muted rounded-full" />
                  <div className="flex-1 flex items-end gap-2">
                     <div className="w-full bg-blue-500/50 rounded-t-sm h-[80%]" />
                     <div className="w-full bg-primary rounded-t-sm h-[40%]" />
                     <div className="w-full bg-purple-500/50 rounded-t-sm h-[60%]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
            <motion.div variants={fadeUp} className="flex-1 space-y-6">
              <div className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-500">
                <Code className="w-4 h-4 mr-2" /> Project Mentor
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Build projects that actually get you hired.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Skip the generic "To-Do Apps". SkillBridge generates unique, complex project ideas perfectly scoped to your skill level, complete with database schemas and technical requirements.
              </p>
              <ul className="space-y-3 mt-6">
                {['Custom project generation based on skill gaps', 'Step-by-step architectural guidance', 'Automated portfolio integration'].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground"><CheckCircle2 className="w-5 h-5 mr-3 text-amber-500" /> {item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="flex-1 w-full">
              <div className="aspect-square md:aspect-video rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border flex items-center justify-center shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="w-3/4 h-3/4 bg-background/80 backdrop-blur-md rounded-xl border shadow-xl p-6 flex flex-col gap-4">
                  <div className="h-10 w-full bg-muted rounded-md" />
                  <div className="h-20 w-full bg-muted/50 rounded-md" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-amber-500/20 rounded-full" />
                    <div className="h-6 w-20 bg-amber-500/20 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-primary-foreground/10"
          >
            <div className="flex flex-col gap-3">
              <span className="text-4xl md:text-6xl font-black text-primary-foreground">12k+</span>
              <span className="text-primary-foreground/80 font-medium text-sm md:text-base uppercase tracking-wider">Skills Analyzed</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-4xl md:text-6xl font-black text-primary-foreground">8.2k</span>
              <span className="text-primary-foreground/80 font-medium text-sm md:text-base uppercase tracking-wider">Projects Built</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-4xl md:text-6xl font-black text-primary-foreground">4.5k</span>
              <span className="text-primary-foreground/80 font-medium text-sm md:text-base uppercase tracking-wider">Roadmaps Done</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-4xl md:text-6xl font-black text-primary-foreground">1.2k</span>
              <span className="text-primary-foreground/80 font-medium text-sm md:text-base uppercase tracking-wider">Jobs Tracked</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-32 bg-background">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Loved by early-career developers</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "David Chen", role: "Frontend Developer", quote: "SkillBridge completely changed how I approach learning. I stopped tutorial hell and built 3 projects that got me hired." },
              { name: "Sarah Jenkins", role: "Data Scientist", quote: "The AI gap analyzer pointed out that I was missing specific cloud skills. Two months later, I landed my first junior role." },
              { name: "Michael T.", role: "Software Engineer", quote: "Being able to verify my skills and have recruiters reach out to me directly has been incredible. Highly recommended." }
            ].map((t, i) => (
              <Card key={i} className="bg-muted/10 border-none shadow-none hover:bg-muted/30 transition-colors p-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">{t.name[0]}</div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section className="py-32 bg-muted/20">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground">Start building your career for free. Upgrade when you need more power.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <Card className="p-8 border-muted shadow-sm flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Student Basic</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Basic skill gap analysis', '1 AI project generation per month', 'Public portfolio page', 'Community support'].map(feature => (
                  <li key={feature} className="flex items-center"><CheckCircle2 className="w-5 h-5 text-primary mr-3"/>{feature}</li>
                ))}
              </ul>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </Card>

            {/* Pro Tier */}
            <Card className="p-8 border-primary shadow-xl shadow-primary/10 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-xl text-sm font-bold">MOST POPULAR</div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Career Pro</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black">$12</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Advanced AI skill analysis', 'Unlimited project generation', 'Priority recruiter matching', 'Automated CV Builder', 'Interview prep mockups'].map(feature => (
                  <li key={feature} className="flex items-center"><CheckCircle2 className="w-5 h-5 text-primary mr-3"/>{feature}</li>
                ))}
              </ul>
              <Button size="lg" className="w-full" asChild>
                <Link to="/signup">Upgrade to Pro</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
