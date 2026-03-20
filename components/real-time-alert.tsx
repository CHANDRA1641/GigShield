"use client"

import { useState, useEffect } from "react"
import { CloudRain, Thermometer, Wifi, X, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RealTimeAlertProps {
  type: "rain" | "heat" | "outage"
  zone: string
  onDismiss?: () => void
  autoHide?: boolean
  autoHideDelay?: number
}

const alertConfig = {
  rain: {
    icon: CloudRain,
    title: "Heavy Rain Detected",
    bgGradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
  },
  heat: {
    icon: Thermometer,
    title: "Heat Wave Alert",
    bgGradient: "from-orange-500/20 via-orange-600/10 to-transparent",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/20",
  },
  outage: {
    icon: Wifi,
    title: "Platform Outage Detected",
    bgGradient: "from-red-500/20 via-red-600/10 to-transparent",
    borderColor: "border-red-500/30",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/20",
  },
}

export function RealTimeAlert({
  type,
  zone,
  onDismiss,
  autoHide = false,
  autoHideDelay = 10000,
}: RealTimeAlertProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(true)

  const config = alertConfig[type]
  const Icon = config.icon

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, autoHideDelay)
      return () => clearTimeout(timer)
    }
  }, [autoHide, autoHideDelay])

  const handleDismiss = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      onDismiss?.()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[420px] z-50 transition-all duration-300 ${
        isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border ${config.borderColor} bg-gradient-to-r ${config.bgGradient} bg-card p-4 shadow-2xl`}
      >
        {/* Animated pulse effect */}
        <div className="absolute inset-0 animate-pulse-slow">
          <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} opacity-50`} />
        </div>

        <div className="relative flex items-start gap-4">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-7 h-7 ${config.iconColor} animate-bounce`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{config.title}</h3>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Covered
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {type === "rain" && `Heavy rainfall detected in ${zone} — you are covered!`}
              {type === "heat" && `Extreme heat conditions in ${zone} — you are covered!`}
              {type === "outage" && `Platform service disruption detected — you are covered!`}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Processing automatic payout...
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-background/50 rounded-lg transition-colors shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        {autoHide && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20">
            <div
              className="h-full bg-primary transition-all ease-linear"
              style={{
                animation: `shrink ${autoHideDelay}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}

// Demo component to showcase all alert types
export function RealTimeAlertDemo() {
  const [activeAlert, setActiveAlert] = useState<"rain" | "heat" | "outage" | null>("rain")

  return (
    <div className="p-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeAlert === "rain" ? "default" : "outline"}
          onClick={() => setActiveAlert("rain")}
          size="sm"
        >
          <CloudRain className="w-4 h-4 mr-2" />
          Rain Alert
        </Button>
        <Button
          variant={activeAlert === "heat" ? "default" : "outline"}
          onClick={() => setActiveAlert("heat")}
          size="sm"
        >
          <Thermometer className="w-4 h-4 mr-2" />
          Heat Alert
        </Button>
        <Button
          variant={activeAlert === "outage" ? "default" : "outline"}
          onClick={() => setActiveAlert("outage")}
          size="sm"
        >
          <Wifi className="w-4 h-4 mr-2" />
          Outage Alert
        </Button>
      </div>

      {activeAlert && (
        <RealTimeAlert
          type={activeAlert}
          zone="Koramangala, Bangalore"
          onDismiss={() => setActiveAlert(null)}
        />
      )}
    </div>
  )
}
