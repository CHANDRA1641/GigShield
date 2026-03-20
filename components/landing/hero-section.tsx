"use client"

import Link from "next/link"
import { ArrowRight, Shield, Zap, CloudRain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--border)_1px,_transparent_1px),linear-gradient(to_bottom,_var(--border)_1px,_transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Parametric Insurance</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance animate-fade-in-up">
            {t("hero.title")}
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty animate-fade-in-up delay-100">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-200">
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto animate-fade-in-up delay-300">
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Workers Protected</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">₹2Cr+</div>
              <div className="text-sm text-muted-foreground">Payouts Made</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold text-primary mb-1">
                <Zap className="w-6 h-6" />
                {"<"}5 min
              </div>
              <div className="text-sm text-muted-foreground">Avg. Payout Time</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold text-primary mb-1">
                <CloudRain className="w-6 h-6" />
                24/7
              </div>
              <div className="text-sm text-muted-foreground">AI Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  )
}
