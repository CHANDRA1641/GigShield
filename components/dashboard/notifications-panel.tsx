"use client"

import { Bell, CloudRain, Shield, CreditCard, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const notifications = [
  {
    id: 1,
    type: "alert",
    icon: CloudRain,
    title: "Rain Alert",
    message: "Heavy rain expected in your zone in the next 2 hours",
    time: "5 mins ago",
    isNew: true,
  },
  {
    id: 2,
    type: "payout",
    icon: CreditCard,
    title: "Payout Received",
    message: "₹500 credited to your UPI account",
    time: "2 hours ago",
    isNew: true,
  },
  {
    id: 3,
    type: "coverage",
    icon: Shield,
    title: "Coverage Renewed",
    message: "Your weekly coverage has been renewed automatically",
    time: "1 day ago",
    isNew: false,
  },
  {
    id: 4,
    type: "warning",
    icon: AlertTriangle,
    title: "Heat Advisory",
    message: "Temperature expected to exceed 40°C tomorrow",
    time: "2 days ago",
    isNew: false,
  },
]

const typeColors = {
  alert: "text-blue-400 bg-blue-500/10",
  payout: "text-primary bg-primary/10",
  coverage: "text-primary bg-primary/10",
  warning: "text-orange-400 bg-orange-500/10",
}

export function NotificationsPanel() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground text-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Notifications
          </div>
          <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            2 new
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon
            const colors = typeColors[notification.type as keyof typeof typeColors]
            return (
              <div
                key={notification.id}
                className={`relative p-3 rounded-lg transition-colors cursor-pointer ${
                  notification.isNew ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-secondary/50"
                }`}
              >
                {notification.isNew && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />
                )}
                <div className="flex gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colors}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-foreground text-sm">{notification.title}</div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground mt-1 block">{notification.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button className="w-full mt-4 py-2 text-sm text-primary hover:underline">
          View All Notifications
        </button>
      </CardContent>
    </Card>
  )
}
