"use client"

import { LanguageProvider } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { AdminHeader } from "@/components/admin/admin-header"
import { MetricsCards } from "@/components/admin/metrics-cards"
import { ClaimsByZoneChart } from "@/components/admin/claims-by-zone-chart"
import { SegmentDistribution } from "@/components/admin/segment-distribution"
import { FraudDetectionPanel } from "@/components/admin/fraud-detection-panel"
import { RecentClaims } from "@/components/admin/recent-claims"
import { AdvancedInsights } from "@/components/admin/advanced-insights"
import { FraudRingDetection } from "@/components/ai/fraud-ring-detection"

export default function AdminPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <AdminHeader />

            {/* Metrics Cards */}
            <MetricsCards />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ClaimsByZoneChart />
              <SegmentDistribution />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <FraudDetectionPanel />
              <RecentClaims />
            </div>

            {/* Advanced Insights */}
            <div className="mt-6">
              <AdvancedInsights />
            </div>

            {/* Fraud Ring Detection */}
            <div className="mt-6">
              <FraudRingDetection />
            </div>
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}
