"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  FileX,
  Brain,
  CheckCircle2,
  Users,
  Zap,
  Lock,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

const trustPoints = [
  {
    icon: FileX,
    color: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/50"
  },
  {
    icon: Brain,
    color: "bg-blue-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/50"
  },
  {
    icon: Heart,
    color: "bg-primary/20",
    iconColor: "text-primary",
    borderColor: "border-primary/50"
  },
  {
    icon: Users,
    color: "bg-amber-500/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/50"
  }
]

const features = [
  { icon: Zap, color: "text-primary" },
  { icon: Lock, color: "text-emerald-400" },
  { icon: CheckCircle2, color: "text-amber-400" }
]

export function TrustTransparency() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-lg">
        {/* Visual Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 mb-4">
            <Shield className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Trust Icons Grid - Large Visual Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Card
                key={index}
                className={cn(
                  "border-2 overflow-hidden",
                  point.borderColor
                )}
              >
                <CardContent className={cn("p-6 flex items-center justify-center aspect-square", point.color)}>
                  <Icon className={cn("w-16 h-16", point.iconColor)} />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Icons Row */}
        <div className="flex justify-center gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center"
              >
                <Icon className={cn("w-7 h-7", feature.color)} />
              </div>
            )
          })}
        </div>

        {/* Trust Badge - Visual Only */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <span className="text-3xl font-bold text-foreground">50K+</span>
          </div>
        </div>
      </div>
    </section>
  )
}
