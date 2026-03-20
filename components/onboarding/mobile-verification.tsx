"use client"

import { useState } from "react"
import { Smartphone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import type { OnboardingData } from "@/app/onboarding/page"

interface MobileVerificationProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
}

export function MobileVerification({ data, updateData, onNext }: MobileVerificationProps) {
  const { t } = useLanguage()
  const [showOtp, setShowOtp] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])

  const handleSendOtp = () => {
    if (data.mobile.length === 10) {
      setIsVerifying(true)
      // Simulate OTP send
      setTimeout(() => {
        setIsVerifying(false)
        setShowOtp(true)
      }, 1500)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpValues]
      newOtp[index] = value
      setOtpValues(newOtp)
      updateData({ otp: newOtp.join("") })

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerifyOtp = () => {
    if (otpValues.join("").length === 6) {
      setIsVerifying(true)
      // Simulate verification
      setTimeout(() => {
        setIsVerifying(false)
        onNext()
      }, 1500)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl text-foreground">Verify Your Mobile</CardTitle>
        <CardDescription>
          Enter your mobile number to receive an OTP
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showOtp ? (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Mobile Number</label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-secondary border border-border rounded-lg text-foreground">
                  +91
                </div>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={data.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                    updateData({ mobile: value })
                  }}
                  className="flex-1 bg-input border-border text-foreground"
                />
              </div>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={data.mobile.length !== 10 || isVerifying}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isVerifying ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending OTP...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send OTP
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Enter OTP sent to +91 {data.mobile}</label>
              <div className="flex justify-center gap-2">
                {otpValues.map((value, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl bg-input border-border text-foreground"
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={otpValues.join("").length !== 6 || isVerifying}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isVerifying ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Verify & Continue
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            <button
              onClick={() => {
                setShowOtp(false)
                setOtpValues(["", "", "", "", "", ""])
              }}
              className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Change mobile number
            </button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
