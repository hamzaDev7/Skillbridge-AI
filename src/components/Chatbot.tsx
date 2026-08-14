import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleGenAI } from "@google/genai"

// Initialize Gemini Client
// We will instruct the user to put VITE_GEMINI_API_KEY in their .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null

type Message = {
  id: string
  role: "user" | "model"
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content: "Hi there! I'm your SkillBridge AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [interactionId, setInteractionId] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !ai) return

    const userText = input.trim()
    setInput("")

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: userText,
        previous_interaction_id: interactionId,
        system_instruction:
            "You are a helpful, professional, and friendly AI assistant for SkillBridge AI, a platform that connects students and recruiters. Help users navigate the site, understand features (like the AI Project Generator, Skill Analyzer, and Portfolios), and answer their questions concisely.",
      })
      
      setInteractionId(response.id)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: response.output_text || "I'm not sure how to respond to that.",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chatbot error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="icon"
              className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/25 transition-all duration-300"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] bg-background/80 backdrop-blur-xl border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">SkillBridge Assistant</h3>
                  <p className="text-xs text-blue-100 opacity-80">Powered by Gemini AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
              <div className="flex flex-col gap-4">
                {!apiKey && (
                  <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-md border border-destructive/20 text-center">
                    Missing VITE_GEMINI_API_KEY in .env file. Chat will not work.
                  </div>
                )}
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted border rounded-tl-sm leading-relaxed"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-muted border rounded-tl-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-background border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-full border-muted-foreground/20 focus-visible:ring-blue-500"
                  disabled={isLoading || !apiKey}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading || !apiKey}
                  className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
