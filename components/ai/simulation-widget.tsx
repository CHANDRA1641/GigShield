"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Cloud,
  User,
  Shield,
  CheckCircle2,
  Banknote,
  Play,
  RotateCcw,
  CloudRain,
  Thermometer,
  Sun
} from "lucide-react"
import { cn } from "@/lib/utils"

const weatherScenarios = [
  { id: "rain", icon: CloudRain, color: "bg-blue-500/20", iconColor: "text-blue-400" },
  { id: "heat", icon: Thermometer, color: "bg-orange-500/20", iconColor: "text-orange-400" },
  { id: "clear", icon: Sun, color: "bg-amber-500/20", iconColor: "text-amber-400" }
]

const steps = [
  { id: 1, icon: Cloud, color: "from-blue-500 to-blue-400" },
  { id: 2, icon: User, color: "from-emerald-500 to-emerald-400" },
  { id: 3, icon: Shield, color: "from-amber-500 to-amber-400" },
  { id: 4, icon: Banknote, color: "from-primary to-primary/80" }
]

export function SimulationWidget() {
  const [selectedScenario, setSelectedScenario] = useState(weatherScenarios[0])
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const runSimulation = async () => {
    setIsRunning(true)
    setIsComplete(false)
    setCurrentStep(0)

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i + 1)
      await new Promise(resolve => setTimeout(resolve, 1200))
    }

    setIsComplete(true)
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setIsComplete(false)
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Weather Selection - Big Tap Targets */}
        <div className="grid grid-cols-3 gap-3">
          {weatherScenarios.map((scenario) => {
            const Icon = scenario.icon
            const isSelected = selectedScenario.id === scenario.id
            return (
              <button
                key={scenario.id}
                onClick={() => !isRunning && setSelectedScenario(scenario)}
                disabled={isRunning}
                className={cn(
                  "aspect-square rounded-2xl flex items-center justify-center transition-all border-2",
                  isSelected
                    ? cn(scenario.color, "border-primary scale-105")
                    : "bg-secondary/50 border-border/50",
                  isRunning && "opacity-50"
                )}
              >
                <Icon className={cn("w-10 h-10", isSelected ? scenario.iconColor : "text-muted-foreground")} />
              </button>
            )
          })}
        </div>

        {/* Visual Flow - Large Animated Steps */}
        <div className="py-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id || isComplete

              return (
                <div key={step.id} className="flex items-center">
                  <div className="relative">
                    {/* Step Circle */}
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                        isCompleted && "bg-emerald-500/20 border-emerald-500",
                        isActive && "bg-primary/20 border-primary scale-125 shadow-lg shadow-primary/30",
                        !isActive && !isCompleted && "bg-secondary/50 border-border/50"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      ) : (
                        <Icon
                          className={cn(
                            "w-8 h-8 transition-all",
                            isActive ? "text-primary animate-pulse" : "text-muted-foreground"
                          )}
                        />
                      )}
                    </div>
                    
                    {/* Pulse Effect */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
                    )}
                  </div>

                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="w-6 h-1 mx-1">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          isCompleted ? "bg-emerald-500" : "bg-border"
                        )}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Result - Big Visual Feedback */}
        {isComplete && (
          <div className="text-center py-6 animate-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-4 animate-bounce">
              <Banknote className="w-12 h-12 text-emerald-400" />
            </div>
            <p className="text-4xl font-bold text-emerald-400">₹500</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-lg">5 sec</span>
            </div>
          </div>
        )}

        {/* Action Button - Large Tap Target */}
        <div className="flex gap-3">
          <Button
            onClick={runSimulation}
            disabled={isRunning}
            size="lg"
            className="flex-1 h-16 text-lg rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isRunning ? (
              <div className="w-8 h-8 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={resetSimulation}
            disabled={isRunning}
            size="lg"
            className="h-16 w-16 rounded-2xl"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
