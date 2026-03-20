"use client"

import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Zomato Delivery Partner",
    city: "Mumbai",
    quote: "Last monsoon I would have lost ₹3,000 in a week due to heavy rains. GigShield paid me within 10 minutes of the rain alert. Life-changing!",
    rating: 5,
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    role: "Amazon Flex Driver",
    city: "Delhi",
    quote: "The automatic payouts are amazing. I don't have to fill any forms or wait for approvals. Money just appears in my UPI when there's a disruption.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Venkat Rao",
    role: "Swiggy Delivery Partner",
    city: "Hyderabad",
    quote: "I was skeptical at first, but when the heatwave hit and I got ₹500 credited automatically, I knew this was real. Now I recommend it to everyone.",
    rating: 5,
    avatar: "VR",
  },
]

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
