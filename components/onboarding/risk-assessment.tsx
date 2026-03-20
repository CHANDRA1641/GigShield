"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Shield, CloudRain, Thermometer, AlertTriangle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { OnboardingData } from "@/app/onboarding/page"

const plans = [
  {
    id: "basic",
    name: "Basic Shield",
    price: 49,
    coverage: 2000,
    features: ["Heavy rain coverage", "2 payouts/month", "Same-day payment"],
    recommended: false,
  },
  {
    id: "standard",
    name: "Standard Shield",
    price: 99,
    coverage: 5000,
    features: ["Rain + heat coverage", "4 payouts/month", "Instant payment", "Zone alerts"],
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium Shield",
    price: 199,
    coverage: 10000,
    features: ["All weather events", "Unlimited payouts", "Priority support", "Family coverage"],
    recommended: false,
  },
]

interface RiskAssessmentProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function RiskAssessment({ data, updateData, onNext, onBack }: RiskAssessmentProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analysisStep, setAnalysisStep] = useState(0)

  const analysisSteps = [
    "Analyzing zone weather patterns...",
    "Calculating historical disruption data...",
    "Assessing risk factors...",
    "Generating personalized recommendations...",
  ]

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisStep((prev) => {
          if (prev >= analysisSteps.length - 1) {
            setIsAnalyzing(false)
            // Set risk tier based on some logic
            const tier = data.weeklyEarnings > 8000 ? "high" : data.weeklyEarnings > 5000 ? "medium" : "low"
            updateData({ riskTier: tier })
            return prev
          }
          return prev + 1
        })
      }, 800)
      return () => clearInterval(interval)
    }
  }, [isAnalyzing, data.weeklyEarnings, updateData, analysisSteps.length])

  const riskColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  }

  const riskLabels = {
    low: "Low Risk Zone",
    medium: "Medium Risk Zone",
    high: "High Risk Zone",
  }

  if (isAnalyzing) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="py-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
              <Shield className="w-10 h-10 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              AI Risk Assessment
            </h3>
            <div className="space-y-3 w-full max-w-xs">
              {analysisSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                    index <= analysisStep ? "opacity-100" : "opacity-30"
                  }`}
                >
                  {index < analysisStep ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : index === analysisStep ? (
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
                  )}
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-foreground">Your Risk Assessment</CardTitle>
        <CardDescription>
          Based on your zone and earnings, here are your personalized plans
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Summary */}
        <div className="p-4 rounded-xl bg-secondary border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center ${riskColors[data.riskTier]}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-semibold ${riskColors[data.riskTier]}`}>
                  {riskLabels[data.riskTier]}
                </div>
                <div className="text-sm text-muted-foreground">
                  {data.zone}, {data.city}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span className="text-muted-foreground">12 rain days/month avg</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className="text-muted-foreground">8 heat alerts/month avg</span>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Recommended Plans</h4>
          <div className="grid gap-4">
            {plans.map((plan) => {
              const isSelected = data.selectedPlan === plan.id
              return (
                <button
                  key={plan.id}
                  onClick={() => updateData({ selectedPlan: plan.id })}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Recommended
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-foreground">{plan.name}</h5>
                      <div className="text-sm text-muted-foreground">
                        Up to ₹{plan.coverage.toLocaleString("en-IN")} coverage/week
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{plan.price}</div>
                      <div className="text-xs text-muted-foreground">/week</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-border"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!data.selectedPlan}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue to Payment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
