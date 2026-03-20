"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Users, MapPin, Clock, Eye, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface Node {
  id: string
  x: number
  y: number
  label: string
  type: "normal" | "suspicious" | "flagged"
  claims: number
}

interface Edge {
  from: string
  to: string
  suspicious: boolean
}

const generateNodes = (): Node[] => [
  { id: "1", x: 200, y: 100, label: "Worker A", type: "normal", claims: 2 },
  { id: "2", x: 350, y: 80, label: "Worker B", type: "suspicious", claims: 5 },
  { id: "3", x: 450, y: 150, label: "Worker C", type: "suspicious", claims: 6 },
  { id: "4", x: 380, y: 220, label: "Worker D", type: "flagged", claims: 8 },
  { id: "5", x: 280, y: 250, label: "Worker E", type: "suspicious", claims: 5 },
  { id: "6", x: 150, y: 200, label: "Worker F", type: "normal", claims: 1 },
  { id: "7", x: 500, y: 250, label: "Worker G", type: "normal", claims: 2 },
  { id: "8", x: 100, y: 300, label: "Worker H", type: "normal", claims: 1 },
]

const edges: Edge[] = [
  { from: "2", to: "3", suspicious: true },
  { from: "3", to: "4", suspicious: true },
  { from: "4", to: "5", suspicious: true },
  { from: "5", to: "2", suspicious: true },
  { from: "1", to: "2", suspicious: false },
  { from: "6", to: "5", suspicious: false },
  { from: "3", to: "7", suspicious: false },
  { from: "6", to: "8", suspicious: false },
]

const nodeColors = {
  normal: {
    fill: "fill-emerald-500",
    stroke: "stroke-emerald-400",
    bg: "bg-emerald-500"
  },
  suspicious: {
    fill: "fill-amber-500",
    stroke: "stroke-amber-400",
    bg: "bg-amber-500"
  },
  flagged: {
    fill: "fill-red-500",
    stroke: "stroke-red-400",
    bg: "bg-red-500"
  }
}

export function FraudRingDetection() {
  const [nodes] = useState<Node[]>(generateNodes)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [pulsePhase, setPulsePhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getNodeById = (id: string) => nodes.find((n) => n.id === id)

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Fraud Ring Detection
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Network analysis identifying coordinated anomalies
            </p>
          </div>
          <Badge variant="outline" className="text-amber-400 border-amber-400/50 bg-amber-500/10">
            <AlertTriangle className="w-3 h-3 mr-1" />
            1 Cluster Detected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Network Graph */}
        <div className="relative bg-secondary/30 rounded-xl border border-border/50 overflow-hidden">
          <svg viewBox="0 0 600 350" className="w-full h-[300px]">
            {/* Grid Background */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Suspicious Cluster Highlight */}
            <ellipse
              cx="365"
              cy="175"
              rx="120"
              ry="100"
              className="fill-amber-500/10 stroke-amber-500/30"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text x="365" y="310" textAnchor="middle" className="fill-amber-400 text-xs font-medium">
              Coordinated Anomaly Detected
            </text>

            {/* Edges */}
            {edges.map((edge, i) => {
              const fromNode = getNodeById(edge.from)
              const toNode = getNodeById(edge.to)
              if (!fromNode || !toNode) return null

              return (
                <line
                  key={i}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={cn(
                    "transition-all duration-300",
                    edge.suspicious ? "stroke-amber-500/60" : "stroke-muted-foreground/20"
                  )}
                  strokeWidth={edge.suspicious ? 2 : 1}
                  strokeDasharray={edge.suspicious ? "5,3" : undefined}
                />
              )
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const colors = nodeColors[node.type]
              const isHovered = hoveredNode === node.id
              const isPulsing = node.type === "flagged"

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse animation for flagged nodes */}
                  {isPulsing && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={20 + pulsePhase / 5}
                      className="fill-red-500/20"
                      style={{ opacity: 1 - pulsePhase / 100 }}
                    />
                  )}
                  
                  {/* Node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 18 : 15}
                    className={cn(colors.fill, colors.stroke, "transition-all duration-200")}
                    strokeWidth="2"
                  />
                  
                  {/* Node label */}
                  <text
                    x={node.x}
                    y={node.y + 30}
                    textAnchor="middle"
                    className="fill-foreground text-xs font-medium"
                  >
                    {node.label}
                  </text>
                  
                  {/* Claims count */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className="fill-background text-xs font-bold"
                  >
                    {node.claims}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredNode && (
            <div className="absolute top-4 right-4 p-3 rounded-lg bg-popover border border-border shadow-lg">
              {(() => {
                const node = getNodeById(hoveredNode)
                if (!node) return null
                return (
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{node.label}</p>
                    <p className="text-sm text-muted-foreground">Claims today: {node.claims}</p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        node.type === "flagged" && "text-red-400 border-red-400/50",
                        node.type === "suspicious" && "text-amber-400 border-amber-400/50",
                        node.type === "normal" && "text-emerald-400 border-emerald-400/50"
                      )}
                    >
                      {node.type === "flagged" ? "High Risk" : node.type === "suspicious" ? "Under Review" : "Verified"}
                    </Badge>
                  </div>
                )
              })()}
            </div>
          )}
        </div>

        {/* Cluster Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-foreground">Cluster Size</span>
            </div>
            <p className="text-2xl font-bold text-amber-400">4 Workers</p>
            <p className="text-xs text-muted-foreground mt-1">Interconnected claim patterns</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-foreground">Zone</span>
            </div>
            <p className="text-2xl font-bold text-amber-400">Andheri West</p>
            <p className="text-xs text-muted-foreground mt-1">Mumbai, Maharashtra</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-foreground">Time Window</span>
            </div>
            <p className="text-2xl font-bold text-amber-400">15 mins</p>
            <p className="text-xs text-muted-foreground mt-1">Claims within same period</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <Shield className="w-4 h-4 mr-2" />
            Investigate Cluster
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
