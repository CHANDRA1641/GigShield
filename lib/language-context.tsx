"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "hi" | "ta" | "bn" | "kn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.plans": "Plans",
    "nav.dashboard": "Dashboard",
    "nav.getStarted": "Get Started",
    // Hero
    "hero.title": "Zero-Touch Income Protection for Gig Workers",
    "hero.subtitle": "AI-powered parametric insurance that automatically detects disruptions and instantly pays you. No claims, no paperwork.",
    "hero.cta.getStarted": "Get Started",
    "hero.cta.viewPlans": "View Plans",
    // How it works
    "howItWorks.title": "How It Works",
    "howItWorks.step1.title": "Sign Up in 2 Minutes",
    "howItWorks.step1.desc": "Enter your mobile number, select your delivery platform, and choose a plan.",
    "howItWorks.step2.title": "AI Monitors Your Zone",
    "howItWorks.step2.desc": "Our AI tracks weather, outages, and disruptions in real-time across your delivery zone.",
    "howItWorks.step3.title": "Get Paid Instantly",
    "howItWorks.step3.desc": "When a covered event occurs, money is automatically sent to your UPI within minutes.",
    // Platforms
    "platforms.title": "Supported Platforms",
    "platforms.subtitle": "Protection for workers across all major delivery platforms",
    // Features
    "features.title": "Key Features",
    "features.ai.title": "AI Risk Model",
    "features.ai.desc": "Advanced machine learning predicts and detects disruptions before they impact your earnings.",
    "features.instant.title": "Instant Payouts",
    "features.instant.desc": "No claims process. Money hits your account within minutes of a covered event.",
    "features.multilingual.title": "Multilingual Support",
    "features.multilingual.desc": "Available in English, Hindi, Tamil, Bengali, and Kannada.",
    // Testimonials
    "testimonials.title": "What Workers Say",
    // Footer
    "footer.tagline": "Protecting gig workers, one delivery at a time.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.legal": "Legal",
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.coverage": "Coverage Status",
    "dashboard.earnings": "Weekly Earnings Protected",
    "dashboard.alerts": "Active Alerts",
    "dashboard.payoutHistory": "Payout History",
    "dashboard.riskMap": "Zone Risk Map",
    // Onboarding
    "onboarding.title": "Get Protected",
    "onboarding.step1": "Verify Mobile",
    "onboarding.step2": "Select Platform",
    "onboarding.step3": "Your Details",
    "onboarding.step4": "Your Plan",
    "onboarding.step5": "Payment",
    // Common
    "common.active": "Active",
    "common.inactive": "Inactive",
    "common.loading": "Loading...",
    "common.continue": "Continue",
    "common.back": "Back",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
  },
  hi: {
    "nav.home": "होम",
    "nav.plans": "प्लान",
    "nav.dashboard": "डैशबोर्ड",
    "nav.getStarted": "शुरू करें",
    "hero.title": "गिग वर्कर्स के लिए जीरो-टच इनकम प्रोटेक्शन",
    "hero.subtitle": "AI-संचालित पैरामेट्रिक बीमा जो स्वचालित रूप से व्यवधानों का पता लगाता है और तुरंत भुगतान करता है।",
    "hero.cta.getStarted": "शुरू करें",
    "hero.cta.viewPlans": "प्लान देखें",
    "howItWorks.title": "यह कैसे काम करता है",
    "howItWorks.step1.title": "2 मिनट में साइन अप करें",
    "howItWorks.step1.desc": "अपना मोबाइल नंबर दर्ज करें, डिलीवरी प्लेटफॉर्म चुनें और प्लान चुनें।",
    "howItWorks.step2.title": "AI आपके ज़ोन की निगरानी करता है",
    "howItWorks.step2.desc": "हमारा AI आपके डिलीवरी ज़ोन में मौसम और व्यवधानों को रीयल-टाइम में ट्रैक करता है।",
    "howItWorks.step3.title": "तुरंत भुगतान पाएं",
    "howItWorks.step3.desc": "जब कोई कवर्ड इवेंट होता है, पैसा मिनटों में आपके UPI में आ जाता है।",
    "platforms.title": "समर्थित प्लेटफॉर्म",
    "platforms.subtitle": "सभी प्रमुख डिलीवरी प्लेटफॉर्म पर वर्कर्स के लिए सुरक्षा",
    "features.title": "मुख्य विशेषताएं",
    "features.ai.title": "AI रिस्क मॉडल",
    "features.ai.desc": "उन्नत मशीन लर्निंग व्यवधानों का पता लगाती है।",
    "features.instant.title": "तुरंत भुगतान",
    "features.instant.desc": "कोई क्लेम प्रोसेस नहीं। पैसा मिनटों में आपके खाते में।",
    "features.multilingual.title": "बहुभाषी सपोर्ट",
    "features.multilingual.desc": "अंग्रेजी, हिंदी, तमिल, बंगाली और कन्नड़ में उपलब्ध।",
    "testimonials.title": "वर्कर्स क्या कहते हैं",
    "footer.tagline": "एक समय में एक डिलीवरी, गिग वर्कर्स की सुरक्षा।",
    "dashboard.title": "डैशबोर्ड",
    "dashboard.coverage": "कवरेज स्थिति",
    "dashboard.earnings": "साप्ताहिक कमाई सुरक्षित",
    "common.active": "सक्रिय",
    "common.inactive": "निष्क्रिय",
    "common.continue": "जारी रखें",
    "common.back": "वापस",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.plans": "திட்டங்கள்",
    "nav.dashboard": "டாஷ்போர்ட்",
    "nav.getStarted": "தொடங்குங்கள்",
    "hero.title": "கிக் தொழிலாளர்களுக்கான ஜீரோ-டச் வருமான பாதுகாப்பு",
    "hero.subtitle": "AI-இயக்கப்படும் பாரமெட்ரிக் காப்பீடு தானாகவே இடையூறுகளைக் கண்டறிந்து உடனடியாக பணம் செலுத்துகிறது।",
    "hero.cta.getStarted": "தொடங்குங்கள்",
    "hero.cta.viewPlans": "திட்டங்களைக் காண்க",
    "common.active": "செயலில்",
    "common.continue": "தொடரவும்",
  },
  bn: {
    "nav.home": "হোম",
    "nav.plans": "প্ল্যান",
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.getStarted": "শুরু করুন",
    "hero.title": "গিগ ওয়ার্কারদের জন্য জিরো-টাচ আয় সুরক্ষা",
    "hero.subtitle": "AI-চালিত প্যারামেট্রিক বীমা যা স্বয়ংক্রিয়ভাবে বাধা শনাক্ত করে এবং তাৎক্ষণিক অর্থ প্রদান করে।",
    "hero.cta.getStarted": "শুরু করুন",
    "hero.cta.viewPlans": "প্ল্যান দেখুন",
    "common.active": "সক্রিয়",
    "common.continue": "চালিয়ে যান",
  },
  kn: {
    "nav.home": "ಮುಖಪುಟ",
    "nav.plans": "ಯೋಜನೆಗಳು",
    "nav.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "nav.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
    "hero.title": "ಗಿಗ್ ಕಾರ್ಮಿಕರಿಗೆ ಝೀರೋ-ಟಚ್ ಆದಾಯ ರಕ್ಷಣೆ",
    "hero.subtitle": "AI-ಚಾಲಿತ ಪ್ಯಾರಾಮೆಟ್ರಿಕ್ ವಿಮೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅಡಚಣೆಗಳನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ತಕ್ಷಣವೇ ಪಾವತಿಸುತ್ತದೆ.",
    "hero.cta.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
    "hero.cta.viewPlans": "ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "common.active": "ಸಕ್ರಿಯ",
    "common.continue": "ಮುಂದುವರಿಸಿ",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  ta: "தமிழ்",
  bn: "বাংলা",
  kn: "ಕನ್ನಡ",
}
