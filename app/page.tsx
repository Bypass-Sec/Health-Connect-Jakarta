import { DonationWidget } from "@/components/donation-widget"
import { TransparencyCounter } from "@/components/transparency-counter"
import { FeatureCards } from "@/components/feature-cards"
import { HeroSection } from "@/components/hero-section"
import { ChatbotButton } from "@/components/chatbot-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <TransparencyCounter />
      <FeatureCards />
      <DonationWidget />
      <ChatbotButton />
    </div>
  )
}
