"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

const data = [
  { name: "Food Delivery", value: 45, users: 23553, color: "#E23744" },
  { name: "E-Commerce", value: 35, users: 18319, color: "#2874F0" },
  { name: "Quick Commerce", value: 20, users: 10468, color: "#8B5CF6" },
]

export function SegmentDistribution() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Segment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0.01 260)",
                  border: "1px solid oklch(0.25 0.02 260)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0 0)",
                }}
                formatter={(value: number, name: string) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-3 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                <span className="text-xs text-muted-foreground">{item.users.toLocaleString("en-IN")} users</span>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="text-sm font-medium text-foreground mb-1">Insight</div>
            <p className="text-xs text-muted-foreground">
              Food delivery segment shows highest claim frequency during monsoon season.
              Consider adjusting premiums for weather-prone zones.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
