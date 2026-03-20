"use client"

import { MapPin, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const zones = [
  { name: "Koramangala", risk: "high", alerts: 3 },
  { name: "HSR Layout", risk: "medium", alerts: 1 },
  { name: "Indiranagar", risk: "low", alerts: 0 },
  { name: "Whitefield", risk: "medium", alerts: 2 },
  { name: "Electronic City", risk: "high", alerts: 4 },
]

const riskColors = {
  low: { bg: "bg-green-500/20", text: "text-green-400", dot: "bg-green-400" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-400" },
  high: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-400" },
}

export function ZoneRiskMap() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Zone Risk Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Visual Map Representation */}
        <div className="relative mb-6 p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[...Array(9)].map((_, i) => {
              const risk = i % 3 === 0 ? "high" : i % 2 === 0 ? "medium" : "low"
              const colors = riskColors[risk]
              return (
                <div
                  key={i}
                  className={`h-12 rounded-lg ${colors.bg} flex items-center justify-center transition-all hover:scale-105 cursor-pointer`}
                >
                  {i === 4 && (
                    <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 text-primary" />
            <span>Your current zone</span>
          </div>
        </div>

        {/* Zone List */}
        <div className="space-y-3">
          {zones.map((zone) => {
            const colors = riskColors[zone.risk as keyof typeof riskColors]
            return (
              <div
                key={zone.name}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className="text-sm text-foreground">{zone.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {zone.alerts > 0 && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <AlertTriangle className="w-3 h-3" />
                      {zone.alerts}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                    {zone.risk}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
