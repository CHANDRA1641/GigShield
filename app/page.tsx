"use client"

import { LanguageProvider } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { PlatformsSection } from "@/components/landing/platforms-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TrustTransparency } from "@/components/landing/trust-transparency"
import { SimulationWidget } from "@/components/ai/simulation-widget"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorks />
          <PlatformsSection />
          <FeaturesSection />
          <TrustTransparency />
          <section className="py-12 container mx-auto px-4">
            <SimulationWidget />
          </section>
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
