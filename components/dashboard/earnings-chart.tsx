"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { week: "Week 1", earnings: 6200, protected: 5000, payout: 0 },
  { week: "Week 2", earnings: 5800, protected: 5000, payout: 800 },
  { week: "Week 3", earnings: 7100, protected: 5000, payout: 0 },
  { week: "Week 4", earnings: 4200, protected: 5000, payout: 1200 },
  { week: "Week 5", earnings: 6500, protected: 5000, payout: 0 },
  { week: "Week 6", earnings: 5900, protected: 5000, payout: 500 },
]

export function EarningsChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>Earnings vs Protected Income</span>
          <div className="flex items-center gap-4 text-sm font-normal">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Earnings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Payouts</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.75 0.18 165)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.75 0.18 165)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.70 0.20 35)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.70 0.20 35)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
              <XAxis
                dataKey="week"
                stroke="oklch(0.65 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.65 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0.01 260)",
                  border: "1px solid oklch(0.25 0.02 260)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0 0)",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="oklch(0.75 0.18 165)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEarnings)"
                name="Actual Earnings"
              />
              <Area
                type="monotone"
                dataKey="payout"
                stroke="oklch(0.70 0.20 35)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPayout)"
                name="Payouts Received"
              />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">₹35,700</div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">₹30,000</div>
            <div className="text-sm text-muted-foreground">Protected Amount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">₹2,500</div>
            <div className="text-sm text-muted-foreground">Total Payouts</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
