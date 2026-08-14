import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, ShieldAlert } from "lucide-react"

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (authError) throw authError

      if (authData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single()

        if (profile?.role === 'admin') {
          navigate("/admin/dashboard")
        } else {
          // If they aren't admin, log them out and show error
          await supabase.auth.signOut()
          setError("Unauthorized access. Admin privileges required.")
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <Card className="w-full max-w-md shadow-2xl border-slate-800 bg-slate-900 text-slate-100">
        <CardHeader className="space-y-1 items-center text-center">
          <div className="bg-red-500/10 p-3 rounded-full mb-4 ring-1 ring-red-500/30">
            <ShieldAlert className="w-6 h-6 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription className="text-slate-400">
            Restricted access. Please log in with admin credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@skillbridge.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-slate-100 focus-visible:ring-red-500"
              />
            </div>
            {error && (
              <div className="text-sm text-red-400 font-medium p-3 bg-red-950/50 rounded-md border border-red-900/50">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full h-11 text-base font-semibold mt-4 bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Secure Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-800 p-4 mt-4 bg-slate-950/50 rounded-b-xl">
          <Link to="/" className="text-sm font-medium flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <BrainCircuit className="w-4 h-4" /> Return to Main Site
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
