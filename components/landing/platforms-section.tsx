"use client"

import { useLanguage } from "@/lib/language-context"

const platforms = [
  { name: "Zomato", category: "Food Delivery", color: "#E23744" },
  { name: "Swiggy", category: "Food Delivery", color: "#FC8019" },
  { name: "Amazon", category: "E-Commerce", color: "#FF9900" },
  { name: "Flipkart", category: "E-Commerce", color: "#2874F0" },
  { name: "Zepto", category: "Quick Commerce", color: "#8B5CF6" },
  { name: "Blinkit", category: "Quick Commerce", color: "#F8C931" },
]

export function PlatformsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("platforms.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("platforms.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="group relative p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: platform.color }}
              />

              <div className="relative flex flex-col items-center text-center">
                {/* Logo placeholder with brand color */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 text-white font-bold text-xl"
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-foreground text-sm">
                  {platform.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {platform.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E23744]" />
            <span className="text-sm text-muted-foreground">Food Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2874F0]" />
            <span className="text-sm text-muted-foreground">E-Commerce</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
            <span className="text-sm text-muted-foreground">Quick Commerce</span>
          </div>
        </div>
      </div>
    </section>
  )
}
