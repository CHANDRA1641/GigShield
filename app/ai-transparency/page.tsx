"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FraudDetectionFlow } from "@/components/ai/fraud-detection-flow"
import { DataSignalsPanel } from "@/components/ai/data-signals-panel"
import { SimulationWidget } from "@/components/ai/simulation-widget"
import { LanguageProvider } from "@/lib/language-context"
import { Shield, CheckCircle2, Clock, Zap, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AITransparencyPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Visual Hero - Icons Only */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/20 mb-6">
                  <Shield className="w-14 h-14 text-primary" />
                </div>
              </div>

              {/* Visual Promise Icons */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2" />
                  <span className="text-2xl font-bold text-foreground">100%</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-2xl bg-primary/10 border-2 border-primary/30">
                  <Zap className="w-10 h-10 text-primary mb-2" />
                  <span className="text-2xl font-bold text-foreground">5 sec</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30">
                  <Heart className="w-10 h-10 text-amber-400 mb-2" />
                  <span className="text-2xl font-bold text-foreground">0</span>
                </div>
              </div>
            </div>
          </section>

          {/* AI Flow - Visual Animation */}
          <section className="py-6 container mx-auto px-4 max-w-2xl">
            <FraudDetectionFlow />
          </section>

          {/* Data Signals - Icon Grid */}
          <section className="py-6 container mx-auto px-4 max-w-lg">
            <DataSignalsPanel />
          </section>

          {/* Interactive Demo */}
          <section className="py-6 container mx-auto px-4 max-w-lg">
            <SimulationWidget />
          </section>

          {/* Bottom CTA - Large Touch Target */}
          <section className="py-12 container mx-auto px-4 max-w-lg">
            <a
              href="/onboarding"
              className="block p-6 rounded-3xl bg-primary text-center"
            >
              <div className="flex items-center justify-center gap-4">
                <Shield className="w-10 h-10 text-primary-foreground" />
                <div>
                  <span className="text-3xl font-bold text-primary-foreground">₹99</span>
                  <span className="text-lg text-primary-foreground/80">/mo</span>
                </div>
              </div>
            </a>
          </section>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
