"use client"

import Link from "next/link"
import { Check, Shield, Zap, Crown, ArrowRight } from "lucide-react"
import { LanguageProvider } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const plans = [
  {
    id: "basic",
    name: "Basic Shield",
    description: "Essential coverage for occasional disruptions",
    price: 49,
    coverage: 2000,
    icon: Shield,
    popular: false,
    features: [
      "Heavy rain coverage",
      "2 payouts per month",
      "Same-day payment",
      "Basic zone monitoring",
      "Email support",
    ],
    notIncluded: [
      "Heat wave coverage",
      "Platform outage coverage",
      "Priority support",
    ],
  },
  {
    id: "standard",
    name: "Standard Shield",
    description: "Comprehensive protection for active workers",
    price: 99,
    coverage: 5000,
    icon: Zap,
    popular: true,
    features: [
      "Rain + heat wave coverage",
      "4 payouts per month",
      "Instant payment (< 5 mins)",
      "Real-time zone alerts",
      "Priority support",
      "Multilingual assistance",
    ],
    notIncluded: [
      "Family coverage",
      "Unlimited payouts",
    ],
  },
  {
    id: "premium",
    name: "Premium Shield",
    description: "Maximum protection for power earners",
    price: 199,
    coverage: 10000,
    icon: Crown,
    popular: false,
    features: [
      "All weather events covered",
      "Platform outage coverage",
      "Unlimited payouts",
      "Instant payment (< 2 mins)",
      "24/7 priority support",
      "Family coverage (2 members)",
      "Dedicated account manager",
      "Custom coverage options",
    ],
    notIncluded: [],
  },
]

const faqs = [
  {
    question: "How does the automatic payout work?",
    answer: "Our AI monitors weather conditions, platform status, and other parameters in real-time. When a covered event is detected in your zone, we automatically validate and process the payout to your registered UPI ID within minutes.",
  },
  {
    question: "What counts as a covered event?",
    answer: "Covered events include heavy rainfall (above threshold), extreme heat (above 42°C), platform outages, and government-imposed restrictions. The specific events covered depend on your plan.",
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect from your next billing cycle.",
  },
  {
    question: "Is there a waiting period?",
    answer: "No waiting period! Your coverage begins immediately after successful payment.",
  },
]

export default function PlansPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Choose Your Protection Level
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Flexible plans designed for gig workers. No hidden fees, cancel anytime.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {plans.map((plan) => {
                const Icon = plan.icon
                return (
                  <Card
                    key={plan.id}
                    className={`relative border-border bg-card transition-all duration-300 hover:border-primary/50 ${
                      plan.popular ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                        plan.popular ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Price */}
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-foreground">₹{plan.price}</span>
                          <span className="text-muted-foreground">/week</span>
                        </div>
                        <div className="text-sm text-primary mt-1">
                          Up to ₹{plan.coverage.toLocaleString("en-IN")} coverage
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                        {plan.notIncluded.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 opacity-50">
                            <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center">
                              <div className="w-1.5 h-0.5 bg-muted-foreground rounded-full" />
                            </div>
                            <span className="text-sm text-muted-foreground line-through">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button
                        asChild
                        className={`w-full ${
                          plan.popular
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                        }`}
                      >
                        <Link href="/onboarding">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* FAQs */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
