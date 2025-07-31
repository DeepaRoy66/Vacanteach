"use client";
import { useUserRedirect } from "../useUserRedirect";
import { useSession } from "next-auth/react";

import CallToAction from "./Calltoaction";
import ClientBenefits from "./ClientBenefits";
import ExplorePros from "./Explore";
import GetInsights from "./Getinsights";
import HeroSection from "./Hero";
import HowItWorks from "./Howitworks";
import RealResults from "./Realresult";

export default function LandingPage() {
  const { status } = useSession();
  useUserRedirect();

  if (status === "loading") {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <HeroSection />
      <HowItWorks />
      <GetInsights />
      <ExplorePros />
      <CallToAction />
      <ClientBenefits />
      <RealResults />
    </div>
  );
}
