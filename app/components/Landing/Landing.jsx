import CallToAction from "./Calltoaction";
import ClientBenefits from "./ClientBenefits";
import ExplorePros from "./Explore";
import GetInsights from "./Getinsights";
import HeroSection from "./Hero";
import HowItWorks from "./Howitworks";
import RealResults from "./Realresult";


export default function LandingPage() {
  return (
    <div className="bg-white">
      <HeroSection/>
      <HowItWorks/>
      <GetInsights/>
      <ExplorePros/>
      <CallToAction/>
      <ClientBenefits/>
      <RealResults/>
    
    </div>
  );
}