"use client"

import { Wallet, CreditCard, TrendingDown, Users, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Premiums Collected",
    value: "₹24,56,000",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    color: "text-primary bg-primary/10",
  },
  {
    title: "Total Payouts",
    value: "₹8,34,500",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    color: "text-accent bg-accent/10",
  },
  {
    title: "Loss Ratio",
    value: "34%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingDown,
    color: "text-green-400 bg-green-500/10",
  },
  {
    title: "Active Users",
    value: "52,340",
    change: "+18.7%",
    trend: "up",
    icon: Users,
    color: "text-blue-400 bg-blue-500/10",
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index} className="border-border bg-card hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === "up" 
                    ? metric.title === "Loss Ratio" ? "text-red-400" : "text-green-400"
                    : metric.title === "Loss Ratio" ? "text-green-400" : "text-red-400"
                }`}>
                  {metric.trend === "up" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">{metric.title}</h3>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
