"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, languageNames, type Language } from "@/lib/language-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GigShield</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/plans" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.plans")}
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.dashboard")}
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{languageNames[language]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(languageNames) as Language[]).map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={language === lang ? "bg-primary/10 text-primary" : ""}
                  >
                    {languageNames[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/onboarding">{t("nav.getStarted")}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/plans"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.plans")}
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.dashboard")}
            </Link>
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            
            {/* Mobile Language Switcher */}
            <div className="flex flex-wrap gap-2 py-2">
              {(Object.keys(languageNames) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    language === lang
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>

            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
              <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                {t("nav.getStarted")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
