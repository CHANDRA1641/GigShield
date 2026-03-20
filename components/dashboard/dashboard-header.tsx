"use client"

import { Shield, Calendar } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function DashboardHeader() {
  const { t } = useLanguage()
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t("dashboard.title")}</h1>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{currentDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Koramangala, Bangalore
        </div>
      </div>
    </div>
  )
}
