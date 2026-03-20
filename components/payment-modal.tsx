"use client"

import { useState } from "react"
import { X, CreditCard, Smartphone, QrCode, Check, Shield, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  planName: string
  onSuccess?: () => void
}

export function PaymentModal({ isOpen, onClose, amount, planName, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi")
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      setTimeout(() => {
        onSuccess?.()
        onClose()
        setIsSuccess(false)
      }, 2000)
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Your {planName} coverage is now active.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Coverage Active</span>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Complete Payment</h3>
                <p className="text-sm text-muted-foreground">{planName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Amount */}
              <div className="p-4 rounded-xl bg-secondary text-center">
                <div className="text-sm text-muted-foreground mb-1">Amount to pay</div>
                <div className="text-3xl font-bold text-foreground">₹{amount}</div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Select payment method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "upi"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Smartphone className={`w-6 h-6 mb-2 ${paymentMethod === "upi" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="font-medium text-foreground text-sm">UPI</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CreditCard className={`w-6 h-6 mb-2 ${paymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="font-medium text-foreground text-sm">Card</div>
                  </button>
                </div>
              </div>

              {/* UPI Input */}
              {paymentMethod === "upi" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">UPI ID</label>
                    <Input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-3">Or scan QR code</p>
                    <div className="w-32 h-32 mx-auto rounded-xl bg-white p-2 flex items-center justify-center">
                      <QrCode className="w-full h-full text-background" />
                    </div>
                  </div>
                </div>
              )}

              {/* Card Input */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Card Number</label>
                    <Input type="text" placeholder="1234 5678 9012 3456" className="bg-input border-border" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Expiry</label>
                      <Input type="text" placeholder="MM/YY" className="bg-input border-border" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">CVV</label>
                      <Input type="text" placeholder="123" className="bg-input border-border" />
                    </div>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === "upi" && !upiId)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Pay ₹${amount}`
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Secure payment powered by Razorpay. Your data is encrypted.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
