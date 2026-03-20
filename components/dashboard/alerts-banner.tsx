"use client"

import { useState } from "react"
import { CloudRain, X, Shield, AlertTriangle } from "lucide-react"

export function AlertsBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [alertType] = useState<"rain" | "heat" | "outage">("rain")

  if (!isVisible) return null

  const alertConfig = {
    rain: {
      icon: CloudRain,
      title: "Heavy Rain Detected",
      message: "Heavy rainfall detected in your zone — you are covered! If conditions persist, automatic payout will be processed.",
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
      iconColor: "text-blue-400",
    },
    heat: {
      icon: AlertTriangle,
      title: "Heat Wave Alert",
      message: "Extreme heat conditions detected in your zone. Stay hydrated and take breaks. You are covered!",
      color: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
      iconColor: "text-orange-400",
    },
    outage: {
      icon: AlertTriangle,
      title: "Platform Outage Detected",
      message: "Service disruption detected on your delivery platform. Payout processing will begin automatically.",
      color: "from-red-500/20 to-red-600/10 border-red-500/30",
      iconColor: "text-red-400",
    },
  }

  const config = alertConfig[alertType]
  const Icon = config.icon

  return (
    <div className={`relative overflow-hidden rounded-xl border bg-gradient-to-r ${config.color} p-4 sm:p-6 animate-pulse-slow`}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="relative flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center shrink-0 ${config.iconColor}`}>
          <Icon className="w-6 h-6 animate-bounce" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{config.title}</h3>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Covered
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{config.message}</p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-background/50 rounded-lg transition-colors shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
