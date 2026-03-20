"use client"

import { Shield, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CoverageCardProps {
  title: string
  value: string
  subtitle: string
  status: "active" | "inactive" | "info"
}

export function CoverageCard({ title, value, subtitle, status }: CoverageCardProps) {
  const statusStyles = {
    active: {
      badge: "bg-primary/10 text-primary",
      icon: "text-primary",
      ring: "ring-primary/20",
    },
    inactive: {
      badge: "bg-destructive/10 text-destructive",
      icon: "text-destructive",
      ring: "ring-destructive/20",
    },
    info: {
      badge: "bg-accent/10 text-accent",
      icon: "text-accent",
      ring: "ring-accent/20",
    },
  }

  const styles = statusStyles[status]

  return (
    <Card className={`border-border bg-card hover:ring-2 ${styles.ring} transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-lg ${styles.badge} flex items-center justify-center`}>
            {status === "info" ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <Shield className="w-5 h-5" />
            )}
          </div>
          {status === "active" && (
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Active
            </span>
          )}
        </div>
        <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
