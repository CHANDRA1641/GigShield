"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const data = [
  { zone: "Mumbai", claims: 2450, amount: 856000 },
  { zone: "Delhi", claims: 2120, amount: 742000 },
  { zone: "Bangalore", claims: 1890, amount: 661500 },
  { zone: "Hyderabad", claims: 1560, amount: 546000 },
  { zone: "Chennai", claims: 1340, amount: 469000 },
  { zone: "Kolkata", claims: 980, amount: 343000 },
  { zone: "Pune", claims: 870, amount: 304500 },
]

const COLORS = [
  "oklch(0.75 0.18 165)",
  "oklch(0.70 0.16 165)",
  "oklch(0.65 0.14 165)",
  "oklch(0.60 0.12 165)",
  "oklch(0.55 0.10 165)",
  "oklch(0.50 0.08 165)",
  "oklch(0.45 0.06 165)",
]

export function ClaimsByZoneChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Claims by Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" horizontal={false} />
              <XAxis
                type="number"
                stroke="oklch(0.65 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="zone"
                type="category"
                stroke="oklch(0.65 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0.01 260)",
                  border: "1px solid oklch(0.25 0.02 260)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0 0)",
                }}
                formatter={(value: number, name: string) => [
                  name === "claims" ? `${value.toLocaleString("en-IN")} claims` : `₹${value.toLocaleString("en-IN")}`,
                  name === "claims" ? "Total Claims" : "Payout Amount",
                ]}
              />
              <Bar dataKey="claims" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 3 Summary */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          {data.slice(0, 3).map((item, index) => (
            <div key={item.zone} className="text-center">
              <div className="text-sm text-muted-foreground mb-1">#{index + 1} {item.zone}</div>
              <div className="font-semibold text-foreground">{item.claims.toLocaleString("en-IN")}</div>
              <div className="text-xs text-muted-foreground">₹{(item.amount / 100000).toFixed(1)}L paid</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
