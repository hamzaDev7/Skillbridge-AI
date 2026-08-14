import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for students just getting started.",
      features: [
        { name: "Basic AI Skill Analysis", included: true },
        { name: "1 AI Project Generation per month", included: true },
        { name: "Standard Portfolio Template", included: true },
        { name: "Community Access", included: true },
        { name: "Direct Recruiter Messaging", included: false },
        { name: "Custom Domain for Portfolio", included: false },
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$15",
      period: "/month",
      description: "For serious job seekers looking to stand out.",
      features: [
        { name: "Advanced AI Skill Analysis & Trends", included: true },
        { name: "Unlimited AI Project Generations", included: true },
        { name: "Premium Portfolio Templates", included: true },
        { name: "Priority Community Access", included: true },
        { name: "Direct Recruiter Messaging", included: true },
        { name: "Custom Domain for Portfolio", included: true },
      ],
      cta: "Upgrade to Pro",
      popular: true
    }
  ]

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground">
            Start for free, upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative bg-card rounded-3xl p-8 border ${
                plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground h-12">{plan.description}</p>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {plan.price}
                  {plan.period && <span className="text-xl font-medium text-muted-foreground ml-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button 
                  className="w-full h-12 text-base" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Can I cancel my Pro subscription?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You will retain access to Pro features until the end of your current billing cycle.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Is it free for recruiters?</h3>
              <p className="text-muted-foreground">Recruiters have a separate pricing tier focused on candidate discovery and outreach. Contact our sales team for recruiter enterprise plans.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">What happens to my portfolio if I downgrade?</h3>
              <p className="text-muted-foreground">Your portfolio will remain active, but will revert to the standard template and standard domain name. Any premium customizations will be saved but hidden until you resubscribe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
