"use client"

import { Check, Smartphone, Building2, MapPin, Shield, CreditCard } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const steps = [
  { icon: Smartphone, labelKey: "onboarding.step1" },
  { icon: Building2, labelKey: "onboarding.step2" },
  { icon: MapPin, labelKey: "onboarding.step3" },
  { icon: Shield, labelKey: "onboarding.step4" },
  { icon: CreditCard, labelKey: "onboarding.step5" },
]

interface OnboardingStepsProps {
  currentStep: number
}

export function OnboardingSteps({ currentStep }: OnboardingStepsProps) {
  const { t } = useLanguage()

  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
      
      {/* Progress bar fill */}
      <div
        className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`mt-2 text-xs text-center hidden sm:block ${
                  isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {t(step.labelKey)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
