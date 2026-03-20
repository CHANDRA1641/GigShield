"use client"

import { ArrowLeft, ArrowRight, MapPin, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { OnboardingData } from "@/app/onboarding/page"

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

const zones: Record<string, string[]> = {
  Mumbai: ["Andheri", "Bandra", "Dadar", "Kurla", "Powai", "Thane", "Navi Mumbai"],
  Delhi: ["Connaught Place", "Saket", "Dwarka", "Rohini", "Lajpat Nagar", "Karol Bagh"],
  Bangalore: ["Koramangala", "Whitefield", "HSR Layout", "Indiranagar", "Electronic City"],
  Hyderabad: ["Banjara Hills", "Madhapur", "Gachibowli", "Secunderabad", "Kukatpally"],
  Chennai: ["T. Nagar", "Velachery", "Anna Nagar", "Adyar", "OMR"],
  Kolkata: ["Park Street", "Salt Lake", "New Town", "Howrah", "Jadavpur"],
  Pune: ["Koregaon Park", "Hinjewadi", "Kharadi", "Viman Nagar", "Hadapsar"],
  Ahmedabad: ["Navrangpura", "Satellite", "Prahlad Nagar", "SG Highway", "Bodakdev"],
  Jaipur: ["Vaishali Nagar", "Malviya Nagar", "C-Scheme", "Raja Park", "Mansarovar"],
  Lucknow: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Alambagh"],
}

interface WorkerDetailsProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function WorkerDetails({ data, updateData, onNext, onBack }: WorkerDetailsProps) {
  const availableZones = data.city ? zones[data.city] || [] : []

  const isValid = data.city && data.zone && data.weeklyEarnings > 0

  return (
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-foreground">Your Details</CardTitle>
        <CardDescription>
          Tell us about your delivery zone and earnings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* City */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            City
          </label>
          <Select
            value={data.city}
            onValueChange={(value) => {
              updateData({ city: value, zone: "" })
            }}
          >
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Zone */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Delivery Zone
          </label>
          <Select
            value={data.zone}
            onValueChange={(value) => updateData({ zone: value })}
            disabled={!data.city}
          >
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder={data.city ? "Select your zone" : "Select city first"} />
            </SelectTrigger>
            <SelectContent>
              {availableZones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Weekly Earnings */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Average Weekly Earnings
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
            <Input
              type="number"
              placeholder="Enter your average weekly earnings"
              value={data.weeklyEarnings || ""}
              onChange={(e) => updateData({ weeklyEarnings: Number(e.target.value) })}
              className="pl-8 bg-input border-border text-foreground"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            This helps us calculate the right coverage for you
          </p>
        </div>

        {/* Earnings indicator */}
        {data.weeklyEarnings > 0 && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Weekly coverage needed</span>
              <span className="text-lg font-semibold text-primary">
                ₹{Math.round(data.weeklyEarnings * 0.8).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              We recommend covering 80% of your average weekly earnings
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-border"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!isValid}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
