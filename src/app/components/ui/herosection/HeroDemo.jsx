import React from "react";
import ResponsiveHeroBanner from "./ResponsiveHeroBanner";

const HeroDemo = () => {
  return (
    <ResponsiveHeroBanner
      badgeLabel="New"
      badgeText="Powering the Future with Generative AI"
      title="QuantumSentinel"
      description="Used by next-generation cyber platforms, this system enables you to detect real-time security threats with adaptive intelligence powered by Generative AI."
      primaryButtonText="Get Started"
      secondaryButtonText="Know More"
      ctaButtonText="SignUp"
      partnersTitle="Together, We Go Further"
    />
  );
};

export default HeroDemo;
