"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Clock,
  Shield,
  RefreshCw,
  WifiOff,
  Camera,
  Heart,
  Banknote,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ClaimStatusProps {
  status: "checking" | "reviewing" | "approved" | "need_info"
  amount: number
  networkIssue?: boolean
}

const statusConfig = {
  checking: { step: 1, color: "text-blue-400", bg: "bg-blue-500/20" },
  reviewing: { step: 2, color: "text-amber-400", bg: "bg-amber-500/20" },
  approved: { step: 3, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  need_info: { step: 2, color: "text-amber-400", bg: "bg-amber-500/20" }
}

export function ClaimStatus({
  status,
  amount,
  networkIssue = false
}: ClaimStatusProps) {
  const [progress, setProgress] = useState(0)
  const config = statusConfig[status]

  useEffect(() => {
    const targetProgress = config.step === 1 ? 33 : config.step === 2 ? 66 : 100
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetProgress) return targetProgress
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [config.step])

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Large Amount Display */}
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-4">
            <Banknote className="w-12 h-12 text-primary" />
          </div>
          <p className="text-5xl font-bold text-foreground">₹{amount.toLocaleString()}</p>
        </div>

        {/* Visual Progress Steps */}
        <div className="relative">
          {/* Progress Bar */}
          <div className="h-2 rounded-full bg-secondary overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Icons */}
          <div className="flex justify-between">
            {[
              { icon: Shield, complete: config.step >= 1 },
              { icon: Clock, complete: config.step >= 2, active: config.step === 2 },
              { icon: CheckCircle2, complete: config.step >= 3 }
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                      step.complete
                        ? "bg-primary/20 border-primary"
                        : "bg-secondary/50 border-border/50",
                      step.active && "animate-pulse scale-110"
                    )}
                  >
                    {step.active ? (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : (
                      <Icon
                        className={cn(
                          "w-8 h-8",
                          step.complete ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Network Issue - Visual Only */}
        {networkIssue && (
          <div className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30">
            <WifiOff className="w-8 h-8 text-amber-400" />
            <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
          </div>
        )}

        {/* Friendly Message - Minimal Text */}
        {status === "reviewing" && (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 border-2 border-primary/30">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold text-foreground">2 hours</span>
              </div>
            </div>
          </div>
        )}

        {/* Need More Info - Visual Action */}
        {status === "need_info" && (
          <Button
            size="lg"
            className="w-full h-16 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl"
          >
            <Camera className="w-8 h-8 mr-3" />
            Add Photo
          </Button>
        )}

        {/* Approved State - Big Celebration */}
        {status === "approved" && (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-4 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-semibold">10 min</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
