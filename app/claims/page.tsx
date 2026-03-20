"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ClaimStatus } from "@/components/claims/claim-status"
import { LanguageProvider } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { 
  History, 
  CheckCircle2,
  CloudRain,
  Thermometer,
  Zap,
  TrendingUp,
  Award
} from "lucide-react"
import { cn } from "@/lib/utils"

const claimHistory = [
  { id: 1, icon: CloudRain, amount: 500, color: "bg-blue-500/20", iconColor: "text-blue-400" },
  { id: 2, icon: Zap, amount: 350, color: "bg-amber-500/20", iconColor: "text-amber-400" },
  { id: 3, icon: Thermometer, amount: 450, color: "bg-orange-500/20", iconColor: "text-orange-400" }
]

export default function ClaimsPage() {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current")

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4 py-8 max-w-lg">
            {/* Tab Selector - Large Touch Targets */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setActiveTab("current")}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                  activeTab === "current"
                    ? "bg-primary/20 border-primary"
                    : "bg-secondary/50 border-border/50"
                )}
              >
                <TrendingUp className={cn(
                  "w-8 h-8",
                  activeTab === "current" ? "text-primary" : "text-muted-foreground"
                )} />
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                  activeTab === "history"
                    ? "bg-primary/20 border-primary"
                    : "bg-secondary/50 border-border/50"
                )}
              >
                <History className={cn(
                  "w-8 h-8",
                  activeTab === "history" ? "text-primary" : "text-muted-foreground"
                )} />
              </button>
            </div>

            {/* Current Claim Tab */}
            {activeTab === "current" && (
              <div className="space-y-6">
                <ClaimStatus
                  status="reviewing"
                  amount={500}
                  networkIssue={false}
                />

                {/* Trust Score - Visual Only */}
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-secondary"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${92 * 2.2} 220`}
                            strokeLinecap="round"
                            className="text-primary"
                          />
                        </svg>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-foreground">
                          92
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-6 h-6 text-amber-400" />
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-amber-400" />
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full w-[92%] rounded-full bg-primary" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Claim History Tab - Visual Cards */}
            {activeTab === "history" && (
              <div className="space-y-4">
                {/* Total Display */}
                <Card className="border-border/50 bg-primary/10">
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold text-foreground">₹5,850</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-lg text-emerald-400">12</span>
                    </div>
                  </CardContent>
                </Card>

                {/* History Items - Icon Only */}
                <div className="space-y-3">
                  {claimHistory.map((claim) => {
                    const Icon = claim.icon
                    return (
                      <div
                        key={claim.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/50"
                      >
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center",
                          claim.color
                        )}>
                          <Icon className={cn("w-8 h-8", claim.iconColor)} />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-foreground">₹{claim.amount}</span>
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
