"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Smartphone, 
  MapPin, 
  Activity, 
  Brain, 
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    icon: Smartphone,
    color: "from-blue-500 to-blue-400",
    bgColor: "bg-blue-500/20"
  },
  {
    id: 2,
    icon: MapPin,
    color: "from-emerald-500 to-emerald-400",
    bgColor: "bg-emerald-500/20"
  },
  {
    id: 3,
    icon: Activity,
    color: "from-amber-500 to-amber-400",
    bgColor: "bg-amber-500/20"
  },
  {
    id: 4,
    icon: Brain,
    color: "from-primary to-primary/80",
    bgColor: "bg-primary/20"
  }
]

export function FraudDetectionFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (!isAnimating) return
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length) {
          setShowResult(true)
          setTimeout(() => {
            setShowResult(false)
            return 0
          }, 2000)
          return 0
        }
        setShowResult(false)
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6">
        {/* Visual Pipeline - Large Icons Only */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index + 1
            const isPast = activeStep > index + 1 || showResult
            
            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div className="relative">
                  <div
                    className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                      isPast && "bg-emerald-500/20 border-emerald-500",
                      isActive && cn("scale-110 shadow-xl", step.bgColor, "border-transparent"),
                      !isActive && !isPast && "bg-secondary/50 border-border/50"
                    )}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
                    ) : (
                      <Icon
                        className={cn(
                          "w-8 h-8 md:w-10 md:h-10 transition-all",
                          isActive ? "text-foreground animate-pulse" : "text-muted-foreground"
                        )}
                      />
                    )}
                  </div>
                  
                  {/* Pulse Ring */}
                  {isActive && (
                    <div className={cn(
                      "absolute inset-0 rounded-2xl animate-ping opacity-30",
                      step.bgColor
                    )} />
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="w-4 md:w-8 h-1 mx-1">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isPast ? "bg-emerald-500" : "bg-border"
                      )}
                    />
                  </div>
                )}
              </div>
            )
          })}

          {/* Result Icon */}
          <div className="flex items-center ml-2 md:ml-4">
            <div className="w-4 md:w-8 h-1 mx-1">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  showResult ? "bg-emerald-500" : "bg-border"
                )}
              />
            </div>
            <div
              className={cn(
                "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                showResult
                  ? "bg-emerald-500/20 border-emerald-500 scale-110"
                  : "bg-secondary/50 border-border/50"
              )}
            >
              <Zap
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 transition-all",
                  showResult ? "text-emerald-400" : "text-muted-foreground"
                )}
              />
            </div>
          </div>
        </div>

        {/* Simple Visual Score Bar */}
        <div className="mt-8 space-y-4">
          {/* Animated Score Bar */}
          <div className="relative h-6 rounded-full bg-secondary overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-1000"
              style={{ width: showResult ? "25%" : `${(activeStep / steps.length) * 70}%` }}
            />
            {/* Score Indicator */}
            {showResult && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full shadow-lg transition-all duration-500 animate-bounce"
                style={{ left: "23%" }}
              />
            )}
          </div>

          {/* Visual Legend with Icons Only */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="mt-6 w-full py-3 rounded-xl bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2"
        >
          <div className={cn(
            "w-3 h-3 rounded-full",
            isAnimating ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
          )} />
          {isAnimating ? "Demo Running" : "Start Demo"}
        </button>
      </CardContent>
    </Card>
  )
}
