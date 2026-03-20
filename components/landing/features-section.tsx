"use client"

import { Brain, Zap, Languages, CloudRain, Thermometer, Wifi } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const features = [
  {
    icon: Brain,
    titleKey: "features.ai.title",
    descKey: "features.ai.desc",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Zap,
    titleKey: "features.instant.title",
    descKey: "features.instant.desc",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Languages,
    titleKey: "features.multilingual.title",
    descKey: "features.multilingual.desc",
    gradient: "from-chart-3/20 to-chart-3/5",
  },
]

const coverageTypes = [
  { icon: CloudRain, label: "Heavy Rain", color: "text-blue-400" },
  { icon: Thermometer, label: "Extreme Heat", color: "text-orange-400" },
  { icon: Wifi, label: "Platform Outage", color: "text-red-400" },
]

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("features.title")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Main features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-border hover:border-primary/30 transition-all duration-300 group`}
            >
              <div className="w-14 h-14 rounded-xl bg-background/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Coverage types */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            What We Cover
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {coverageTypes.map((coverage, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${coverage.color}`}>
                  <coverage.icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-foreground">{coverage.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
