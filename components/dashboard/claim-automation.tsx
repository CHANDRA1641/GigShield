"use client"

import { Radar, CheckCircle, Shield, CreditCard, AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  { id: 1, label: "Trigger Detected", icon: Radar, status: "completed" },
  { id: 2, label: "Validation", icon: CheckCircle, status: "completed" },
  { id: 3, label: "Fraud Score", icon: Shield, status: "completed" },
  { id: 4, label: "Approval", icon: CheckCircle, status: "current" },
  { id: 5, label: "Payout", icon: CreditCard, status: "pending" },
]

const statusConfig = {
  completed: {
    bg: "bg-primary",
    text: "text-primary-foreground",
    line: "bg-primary",
  },
  current: {
    bg: "bg-primary animate-pulse",
    text: "text-primary-foreground",
    line: "bg-border",
  },
  pending: {
    bg: "bg-secondary",
    text: "text-muted-foreground",
    line: "bg-border",
  },
}

export function ClaimAutomation() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>Active Claim Processing</span>
          <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stepper */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
          <div className="absolute top-5 left-0 h-0.5 bg-primary" style={{ width: "60%" }} />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const config = statusConfig[step.status as keyof typeof statusConfig]
              const Icon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.text} transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-xs text-center text-muted-foreground max-w-[80px]">
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Current Status Card */}
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground">Auto-Approval in Progress</div>
              <div className="text-sm text-muted-foreground">
                Fraud score: <span className="text-primary font-medium">0.12</span> (Low risk)
              </div>
            </div>
          </div>
        </div>

        {/* Status Badges Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary font-medium">Auto-approved</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-400 font-medium">Under review</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-400 font-medium">Flagged</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
