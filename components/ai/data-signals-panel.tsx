"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Smartphone,
  Activity,
  Zap,
  Wifi,
  Cloud,
  MapPin,
  History,
  Shield,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const dataSignals = [
  { id: "device", icon: Smartphone, status: "ok" },
  { id: "activity", icon: Activity, status: "ok" },
  { id: "speed", icon: Zap, status: "ok" },
  { id: "network", icon: Wifi, status: "warning" },
  { id: "weather", icon: Cloud, status: "triggered" },
  { id: "zone", icon: MapPin, status: "ok" },
  { id: "history", icon: History, status: "ok" },
  { id: "behavior", icon: Shield, status: "ok" }
]

const statusStyles = {
  ok: { bg: "bg-emerald-500/20", border: "border-emerald-500/50", icon: "text-emerald-400" },
  warning: { bg: "bg-amber-500/20", border: "border-amber-500/50", icon: "text-amber-400" },
  triggered: { bg: "bg-primary/20", border: "border-primary/50", icon: "text-primary" }
}

export function DataSignalsPanel() {
  const [confidenceScore, setConfidenceScore] = useState(0)
  const [animatedSignals, setAnimatedSignals] = useState<string[]>([])

  useEffect(() => {
    // Animate confidence score
    const scoreInterval = setInterval(() => {
      setConfidenceScore(prev => {
        if (prev >= 94) return 94
        return prev + 2
      })
    }, 30)

    // Animate signals appearing
    dataSignals.forEach((signal, index) => {
      setTimeout(() => {
        setAnimatedSignals(prev => [...prev, signal.id])
      }, index * 150)
    })

    return () => clearInterval(scoreInterval)
  }, [])

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6">
        {/* Large Confidence Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            {/* Background Ring */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${confidenceScore * 3.52} 352`}
                strokeLinecap="round"
                className="text-primary transition-all duration-300"
              />
            </svg>
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{confidenceScore}</span>
              <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
            </div>
          </div>
        </div>

        {/* Visual Signal Grid - Icons Only */}
        <div className="grid grid-cols-4 gap-3">
          {dataSignals.map((signal) => {
            const Icon = signal.icon
            const styles = statusStyles[signal.status as keyof typeof statusStyles]
            const isAnimated = animatedSignals.includes(signal.id)
            
            return (
              <div
                key={signal.id}
                className={cn(
                  "aspect-square rounded-2xl flex items-center justify-center border-2 transition-all duration-500",
                  styles.bg,
                  styles.border,
                  isAnimated ? "scale-100 opacity-100" : "scale-75 opacity-0"
                )}
              >
                <div className="relative">
                  <Icon className={cn("w-8 h-8", styles.icon)} />
                  {/* Status Dot */}
                  <div
                    className={cn(
                      "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-card",
                      signal.status === "ok" && "bg-emerald-500",
                      signal.status === "warning" && "bg-amber-500",
                      signal.status === "triggered" && "bg-primary"
                    )}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Simple Visual Bars */}
        <div className="mt-6 space-y-3">
          {[
            { value: 98, color: "bg-emerald-500" },
            { value: 95, color: "bg-emerald-500" },
            { value: 92, color: "bg-primary" },
            { value: 96, color: "bg-emerald-500" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-1000", item.color)}
                  style={{ width: `${animatedSignals.length > 0 ? item.value : 0}%` }}
                />
              </div>
              <span className="text-sm font-bold text-foreground w-10">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
