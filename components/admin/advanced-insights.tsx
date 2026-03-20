"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from "recharts"
import { Map, TrendingUp, AlertTriangle, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

// Fraud score distribution data
const fraudScoreDistribution = [
  { range: "0-10", count: 4500, color: "#22c55e" },
  { range: "11-20", count: 3200, color: "#22c55e" },
  { range: "21-30", count: 2100, color: "#22c55e" },
  { range: "31-40", count: 1500, color: "#22c55e" },
  { range: "41-50", count: 800, color: "#22c55e" },
  { range: "51-60", count: 400, color: "#22c55e" },
  { range: "61-70", count: 200, color: "#22c55e" },
  { range: "71-80", count: 85, color: "#f59e0b" },
  { range: "81-90", count: 35, color: "#ef4444" },
  { range: "91-100", count: 12, color: "#ef4444" }
]

// Spike detection data
const spikeData = [
  { time: "00:00", claims: 45, baseline: 50 },
  { time: "04:00", claims: 30, baseline: 35 },
  { time: "08:00", claims: 120, baseline: 100 },
  { time: "12:00", claims: 180, baseline: 150 },
  { time: "14:00", claims: 450, baseline: 160, spike: true },
  { time: "16:00", claims: 200, baseline: 180 },
  { time: "18:00", claims: 280, baseline: 200 },
  { time: "20:00", claims: 150, baseline: 120 },
  { time: "22:00", claims: 80, baseline: 70 }
]

// Zone heatmap data
const zoneData = [
  { zone: "Andheri West", risk: 85, claims: 234, flagged: 12 },
  { zone: "Bandra", risk: 45, claims: 189, flagged: 3 },
  { zone: "Powai", risk: 62, claims: 156, flagged: 7 },
  { zone: "Dadar", risk: 38, claims: 201, flagged: 2 },
  { zone: "Kurla", risk: 72, claims: 178, flagged: 9 },
  { zone: "Thane", risk: 28, claims: 145, flagged: 1 },
  { zone: "Navi Mumbai", risk: 52, claims: 167, flagged: 5 },
  { zone: "Borivali", risk: 41, claims: 134, flagged: 4 }
]

const flaggedClusters = [
  {
    id: 1,
    zone: "Andheri West",
    workers: 4,
    similarity: 94,
    claims: 24,
    status: "investigating"
  },
  {
    id: 2,
    zone: "Kurla",
    workers: 3,
    similarity: 87,
    claims: 15,
    status: "resolved"
  }
]

export function AdvancedInsights() {
  const [activeTab, setActiveTab] = useState("heatmap")

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-foreground">Advanced Fraud Analytics</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              AI-powered insights and anomaly detection
            </p>
          </div>
          <Badge variant="outline" className="text-primary border-primary/50">
            <Activity className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="heatmap" className="text-sm">
              <Map className="w-4 h-4 mr-2" />
              Zone Heatmap
            </TabsTrigger>
            <TabsTrigger value="spikes" className="text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Spike Detection
            </TabsTrigger>
            <TabsTrigger value="distribution" className="text-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Score Distribution
            </TabsTrigger>
          </TabsList>

          {/* Zone Heatmap Tab */}
          <TabsContent value="heatmap" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {zoneData.map((zone) => {
                const riskLevel = zone.risk > 70 ? "high" : zone.risk > 50 ? "medium" : "low"
                const colors = {
                  high: "bg-red-500/20 border-red-500/30 text-red-400",
                  medium: "bg-amber-500/20 border-amber-500/30 text-amber-400",
                  low: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                }
                
                return (
                  <div
                    key={zone.zone}
                    className={cn(
                      "p-4 rounded-xl border transition-all hover:scale-[1.02]",
                      colors[riskLevel]
                    )}
                  >
                    <p className="text-sm font-medium text-foreground mb-2">{zone.zone}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Risk Score</span>
                        <span className={colors[riskLevel].split(" ")[2]}>{zone.risk}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Claims</span>
                        <span className="text-foreground">{zone.claims}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Flagged</span>
                        <span className={colors[riskLevel].split(" ")[2]}>{zone.flagged}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Flagged Clusters */}
            <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Flagged Clusters
              </h4>
              <div className="space-y-2">
                {flaggedClusters.map((cluster) => (
                  <div
                    key={cluster.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        cluster.status === "investigating" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                      )} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{cluster.zone}</p>
                        <p className="text-xs text-muted-foreground">
                          {cluster.workers} workers | {cluster.similarity}% similarity
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        cluster.status === "investigating"
                          ? "text-amber-400 border-amber-400/50"
                          : "text-emerald-400 border-emerald-400/50"
                      )}
                    >
                      {cluster.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Spike Detection Tab */}
          <TabsContent value="spikes" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spikeData}>
                  <defs>
                    <linearGradient id="claimsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke="hsl(var(--muted-foreground))"
                    fill="url(#baselineGradient)"
                    strokeDasharray="5 5"
                  />
                  <Area
                    type="monotone"
                    dataKey="claims"
                    stroke="hsl(var(--primary))"
                    fill="url(#claimsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Spike Alert */}
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Spike Detected at 14:00</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Claims volume 181% above baseline. Correlated with heavy rainfall alert in Western suburbs.
                    AI confidence: 92% legitimate weather event.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Score Distribution Tab */}
          <TabsContent value="distribution" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fraudScoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {fraudScoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Distribution Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <p className="text-2xl font-bold text-emerald-400">94.8%</p>
                <p className="text-xs text-muted-foreground mt-1">Auto Approved (0-70)</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                <p className="text-2xl font-bold text-amber-400">4.8%</p>
                <p className="text-xs text-muted-foreground mt-1">Soft Review (71-85)</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center">
                <p className="text-2xl font-bold text-red-400">0.4%</p>
                <p className="text-xs text-muted-foreground mt-1">Manual Review (86-100)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
