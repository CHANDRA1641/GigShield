"use client"

import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { OnboardingData } from "@/app/onboarding/page"

const platforms = [
  { id: "zomato", name: "Zomato", category: "Food Delivery", color: "#E23744" },
  { id: "swiggy", name: "Swiggy", category: "Food Delivery", color: "#FC8019" },
  { id: "amazon", name: "Amazon Flex", category: "E-Commerce", color: "#FF9900" },
  { id: "flipkart", name: "Flipkart", category: "E-Commerce", color: "#2874F0" },
  { id: "zepto", name: "Zepto", category: "Quick Commerce", color: "#8B5CF6" },
  { id: "blinkit", name: "Blinkit", category: "Quick Commerce", color: "#F8C931" },
]

interface PlatformSelectionProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function PlatformSelection({ data, updateData, onNext, onBack }: PlatformSelectionProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-foreground">Select Your Platform</CardTitle>
        <CardDescription>
          Choose the delivery platform you primarily work with
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {platforms.map((platform) => {
            const isSelected = data.platform === platform.id
            return (
              <button
                key={platform.id}
                onClick={() => updateData({ platform: platform.id })}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.name.charAt(0)}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground text-sm">
                      {platform.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {platform.category}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
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
            disabled={!data.platform}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
