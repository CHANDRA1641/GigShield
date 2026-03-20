"use client"

import { CloudRain, Thermometer, Wifi, Check, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const claims = [
  {
    id: "CLM-7825",
    user: "Rajesh K.",
    type: "rain",
    amount: 500,
    zone: "Andheri, Mumbai",
    time: "2 mins ago",
    status: "auto-approved",
  },
  {
    id: "CLM-7824",
    user: "Priya S.",
    type: "heat",
    amount: 750,
    zone: "Koramangala, Bangalore",
    time: "15 mins ago",
    status: "auto-approved",
  },
  {
    id: "CLM-7823",
    user: "Amit K.",
    type: "rain",
    amount: 1500,
    zone: "Koramangala, Bangalore",
    time: "32 mins ago",
    status: "flagged",
  },
  {
    id: "CLM-7822",
    user: "Neha R.",
    type: "outage",
    amount: 800,
    zone: "Indiranagar, Bangalore",
    time: "1 hour ago",
    status: "under-review",
  },
  {
    id: "CLM-7821",
    user: "Suresh M.",
    type: "rain",
    amount: 450,
    zone: "Banjara Hills, Hyderabad",
    time: "2 hours ago",
    status: "auto-approved",
  },
]

const typeConfig = {
  rain: { icon: CloudRain, color: "text-blue-400 bg-blue-500/10" },
  heat: { icon: Thermometer, color: "text-orange-400 bg-orange-500/10" },
  outage: { icon: Wifi, color: "text-red-400 bg-red-500/10" },
}

const statusConfig = {
  "auto-approved": { icon: Check, color: "text-green-400 bg-green-500/10", label: "Auto-approved" },
  "under-review": { icon: Clock, color: "text-yellow-400 bg-yellow-500/10", label: "Under Review" },
  "flagged": { icon: AlertTriangle, color: "text-red-400 bg-red-500/10", label: "Flagged" },
}

export function RecentClaims() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>Recent Claims</span>
          <span className="text-xs font-normal text-muted-foreground">Last 24 hours</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {claims.map((claim) => {
            const typeConf = typeConfig[claim.type as keyof typeof typeConfig]
            const statusConf = statusConfig[claim.status as keyof typeof statusConfig]
            const TypeIcon = typeConf.icon
            const StatusIcon = statusConf.icon

            return (
              <div
                key={claim.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${typeConf.color}`}>
                    <TypeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm">{claim.id}</span>
                      <span className="text-xs text-muted-foreground">• {claim.user}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{claim.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">₹{claim.amount}</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${statusConf.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConf.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border text-center">
          <div>
            <div className="text-lg font-semibold text-green-400">156</div>
            <div className="text-xs text-muted-foreground">Auto-approved</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-yellow-400">12</div>
            <div className="text-xs text-muted-foreground">Under Review</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-red-400">3</div>
            <div className="text-xs text-muted-foreground">Flagged</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
