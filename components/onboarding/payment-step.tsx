"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Smartphone, Check, Shield, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { OnboardingData } from "@/app/onboarding/page"

const paymentMethods = [
  { id: "upi", name: "UPI", icon: Smartphone, description: "Pay using any UPI app" },
  { id: "card", name: "Card", icon: CreditCard, description: "Credit or Debit card" },
]

const planDetails: Record<string, { name: string; price: number }> = {
  basic: { name: "Basic Shield", price: 49 },
  standard: { name: "Standard Shield", price: 99 },
  premium: { name: "Premium Shield", price: 199 },
}

interface PaymentStepProps {
  data: OnboardingData
  onBack: () => void
}

export function PaymentStep({ data, onBack }: PaymentStepProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const plan = planDetails[data.selectedPlan] || { name: "Standard Shield", price: 99 }

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 2500)
  }

  if (isSuccess) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="py-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 animate-bounce">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </h3>
            <p className="text-muted-foreground mb-6">
              Welcome to GigShield! Your coverage is now active.
            </p>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 w-full max-w-xs">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">{plan.name} Activated</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Redirecting to your dashboard...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-foreground">Complete Payment</CardTitle>
        <CardDescription>
          Secure payment for your {plan.name} subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="p-4 rounded-xl bg-secondary border border-border">
          <h4 className="font-semibold text-foreground mb-3">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{plan.name} (Weekly)</span>
              <span className="text-foreground">₹{plan.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">GST (18%)</span>
              <span className="text-foreground">₹{Math.round(plan.price * 0.18)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary text-lg">₹{Math.round(plan.price * 1.18)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Payment Method</h4>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const isSelected = paymentMethod === method.id
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  <method.icon className={`w-6 h-6 mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="font-medium text-foreground text-sm">{method.name}</div>
                  <div className="text-xs text-muted-foreground">{method.description}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* UPI Input */}
        {paymentMethod === "upi" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Enter UPI ID</label>
              <Input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* QR Code placeholder */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Or scan QR code</p>
              <div className="w-40 h-40 mx-auto rounded-xl bg-white p-3 flex items-center justify-center">
                <QrCode className="w-full h-full text-background" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Scan with any UPI app
              </p>
            </div>
          </div>
        )}

        {/* Card Input */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Card Number</label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Expiry</label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">CVV</label>
                <Input
                  type="text"
                  placeholder="123"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-border"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing || (paymentMethod === "upi" && !upiId)}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span>Pay ₹{Math.round(plan.price * 1.18)}</span>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to our Terms of Service and Privacy Policy.
          Payments are processed securely.
        </p>
      </CardContent>
    </Card>
  )
}
