"use client"
import CallToAction from "./Calltoaction.jsx"
import ClientBenefits from "./ClientBenefits.jsx"
import ExplorePros from "./Explore.jsx"
import GetInsights from "./Getinsights.jsx"
import HeroSection from "./Hero.jsx"
import HowItWorks from "./Howitworks.jsx"
import RealResults from "./Realresult.jsx"
export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen"> 
      <HeroSection />
      <HowItWorks />
      <ExplorePros />
      <GetInsights />
      <ClientBenefits />
      <RealResults />
      <CallToAction />
    </div>
  )
}
