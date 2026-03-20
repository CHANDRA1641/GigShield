"use client"

import { Settings, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Admin Dashboard</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{currentDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2 border-border">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <Button variant="outline" size="sm" className="gap-2 border-border">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
