"use client"

import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8">
            <Shield className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Start Protecting Your Income Today
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 50,000+ gig workers who trust GigShield for instant income protection. 
            Setup takes just 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group">
              <Link href="/onboarding">
                {t("hero.cta.getStarted")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border hover:bg-secondary px-8 py-6 text-lg">
              <Link href="/plans">
                {t("hero.cta.viewPlans")}
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Plans starting at just ₹49/week. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
