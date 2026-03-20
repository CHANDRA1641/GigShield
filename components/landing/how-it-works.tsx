"use client"

import { Smartphone, Radar, Banknote, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const steps = [
  {
    icon: Smartphone,
    titleKey: "howItWorks.step1.title",
    descKey: "howItWorks.step1.desc",
  },
  {
    icon: Radar,
    titleKey: "howItWorks.step2.title",
    descKey: "howItWorks.step2.desc",
  },
  {
    icon: Banknote,
    titleKey: "howItWorks.step3.title",
    descKey: "howItWorks.step3.desc",
  },
]

export function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("howItWorks.title")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-primary to-primary opacity-30" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>

              {/* Arrow (mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-4 md:hidden">
                  <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
