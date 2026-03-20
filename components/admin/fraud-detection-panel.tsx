"use client"

import { Shield, AlertTriangle, Eye, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const flaggedClaims = [
  {
    id: "CLM-7823",
    user: "Amit K.",
    zone: "Koramangala",
    amount: 1500,
    fraudScore: 0.89,
    reason: "Multiple claims in short duration",
    status: "pending",
  },
  {
    id: "CLM-7819",
    user: "Ravi S.",
    zone: "HSR Layout",
    amount: 2000,
    fraudScore: 0.76,
    reason: "Location mismatch detected",
    status: "pending",
  },
  {
    id: "CLM-7815",
    user: "Priya M.",
    zone: "Whitefield",
    amount: 1200,
    fraudScore: 0.72,
    reason: "Unusual claim pattern",
    status: "reviewing",
  },
]

const getFraudScoreColor = (score: number) => {
  if (score >= 0.8) return "text-red-400 bg-red-500/10"
  if (score >= 0.6) return "text-orange-400 bg-orange-500/10"
  return "text-yellow-400 bg-yellow-500/10"
}

export function FraudDetectionPanel() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            Fraud Detection
          </div>
          <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
            {flaggedClaims.length} flagged
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-secondary/50 text-center">
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="text-xs text-muted-foreground">Total Flagged</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 text-center">
            <div className="text-2xl font-bold text-red-400">8</div>
            <div className="text-xs text-muted-foreground">Rejected</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 text-center">
            <div className="text-2xl font-bold text-green-400">12</div>
            <div className="text-xs text-muted-foreground">Cleared</div>
          </div>
        </div>

        {/* Flagged Claims List */}
        <div className="space-y-3">
          {flaggedClaims.map((claim) => {
            const scoreColor = getFraudScoreColor(claim.fraudScore)
            return (
              <div
                key={claim.id}
                className="p-4 rounded-xl bg-secondary/30 border border-border hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{claim.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${scoreColor}`}>
                        Risk: {(claim.fraudScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {claim.user} • {claim.zone} • ₹{claim.amount}
                    </div>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="text-xs text-muted-foreground">{claim.reason}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-8 gap-1 border-border">
                    <Eye className="w-3 h-3" />
                    Review
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8 gap-1 text-green-400 border-green-500/30 hover:bg-green-500/10">
                    <CheckCircle className="w-3 h-3" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8 gap-1 text-red-400 border-red-500/30 hover:bg-red-500/10">
                    <XCircle className="w-3 h-3" />
                    Reject
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <Button variant="outline" className="w-full mt-4 border-border">
          View All Flagged Claims
        </Button>
      </CardContent>
    </Card>
  )
}
