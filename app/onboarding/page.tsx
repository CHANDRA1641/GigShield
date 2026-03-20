"use client"

import { useState } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { OnboardingSteps } from "@/components/onboarding/onboarding-steps"
import { MobileVerification } from "@/components/onboarding/mobile-verification"
import { PlatformSelection } from "@/components/onboarding/platform-selection"
import { WorkerDetails } from "@/components/onboarding/worker-details"
import { RiskAssessment } from "@/components/onboarding/risk-assessment"
import { PaymentStep } from "@/components/onboarding/payment-step"

export type OnboardingData = {
  mobile: string
  otp: string
  platform: string
  city: string
  zone: string
  weeklyEarnings: number
  riskTier: "low" | "medium" | "high"
  selectedPlan: string
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    mobile: "",
    otp: "",
    platform: "",
    city: "",
    zone: "",
    weeklyEarnings: 0,
    riskTier: "low",
    selectedPlan: "",
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Steps */}
            <OnboardingSteps currentStep={step} />

            {/* Step Content */}
            <div className="mt-8">
              {step === 1 && (
                <MobileVerification
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                />
              )}
              {step === 2 && (
                <PlatformSelection
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {step === 3 && (
                <WorkerDetails
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {step === 4 && (
                <RiskAssessment
                  data={data}
                  updateData={updateData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {step === 5 && (
                <PaymentStep
                  data={data}
                  onBack={prevStep}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}
