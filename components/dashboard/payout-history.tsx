"use client"

import { CloudRain, Thermometer, Wifi, Check, Clock, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const payouts = [
  {
    id: 1,
    type: "rain",
    event: "Heavy Rain",
    amount: 500,
    date: "Mar 15, 2026",
    time: "2:34 PM",
    status: "completed",
    duration: "4 hours",
  },
  {
    id: 2,
    type: "heat",
    event: "Heat Wave",
    amount: 750,
    date: "Mar 12, 2026",
    time: "1:15 PM",
    status: "completed",
    duration: "6 hours",
  },
  {
    id: 3,
    type: "rain",
    event: "Heavy Rain",
    amount: 450,
    date: "Mar 8, 2026",
    time: "5:22 PM",
    status: "completed",
    duration: "3 hours",
  },
  {
    id: 4,
    type: "outage",
    event: "Platform Outage",
    amount: 800,
    date: "Mar 3, 2026",
    time: "11:45 AM",
    status: "completed",
    duration: "5 hours",
  },
]

const typeConfig = {
  rain: { icon: CloudRain, color: "text-blue-400 bg-blue-500/10" },
  heat: { icon: Thermometer, color: "text-orange-400 bg-orange-500/10" },
  outage: { icon: Wifi, color: "text-red-400 bg-red-500/10" },
}

export function PayoutHistory() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>Payout History</span>
          <button className="text-sm font-normal text-primary hover:underline flex items-center gap-1">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Event</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">Duration</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => {
                const config = typeConfig[payout.type as keyof typeof typeConfig]
                const Icon = config.icon
                return (
                  <tr key={payout.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{payout.event}</div>
                          <div className="text-xs text-muted-foreground">{payout.time}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-sm text-muted-foreground">{payout.date}</td>
                    <td className="py-4 px-2 text-sm text-muted-foreground hidden sm:table-cell">{payout.duration}</td>
                    <td className="py-4 px-2 text-right">
                      <span className="font-semibold text-primary">+₹{payout.amount}</span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Check className="w-3 h-3" />
                        Paid
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
