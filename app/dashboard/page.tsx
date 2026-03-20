"use client"

import { LanguageProvider } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CoverageCard } from "@/components/dashboard/coverage-card"
import { EarningsChart } from "@/components/dashboard/earnings-chart"
import { AlertsBanner } from "@/components/dashboard/alerts-banner"
import { PayoutHistory } from "@/components/dashboard/payout-history"
import { ZoneRiskMap } from "@/components/dashboard/zone-risk-map"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
import { ClaimAutomation } from "@/components/dashboard/claim-automation"

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <DashboardHeader />

            {/* Active Alert Banner */}
            <AlertsBanner />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Left Column - 2 cols on large screens */}
              <div className="lg:col-span-2 space-y-6">
                {/* Coverage Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CoverageCard
                    title="Coverage Status"
                    value="Active"
                    subtitle="Standard Shield Plan"
                    status="active"
                  />
                  <CoverageCard
                    title="Weekly Earnings Protected"
                    value="₹5,000"
                    subtitle="80% of your average earnings"
                    status="info"
                  />
                </div>

                {/* Earnings Chart */}
                <EarningsChart />

                {/* Claim Automation Flow */}
                <ClaimAutomation />

                {/* Payout History */}
                <PayoutHistory />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Zone Risk Map */}
                <ZoneRiskMap />

                {/* Notifications */}
                <NotificationsPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}
