import React, { Suspense } from 'react';
import { createFileRoute } from "@tanstack/react-router";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";

const MassiveFeatureGrid = React.lazy(() => import("@/components/sections/MassiveFeatureGrid"));
const InteractiveSolutions = React.lazy(() => import("@/components/sections/InteractiveSolutions"));
const Testimonials = React.lazy(() => import("@/components/sections/Testimonials"));
const Pricing = React.lazy(() => import("@/components/sections/Pricing"));
const FAQ = React.lazy(() => import("@/components/sections/FAQ"));
const FinalCTA = React.lazy(() => import("@/components/sections/FinalCTA"));
const Footer = React.lazy(() => import("@/components/sections/Footer"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen The AI Campaign Agent for Modern Marketing Teams" },
      {
        name: "description",
        content:
          "Lumen turns a single prompt into beautifully crafted, omnichannel marketing campaigns orchestrated across email, WhatsApp, Instagram, SMS, LinkedIn and more.",
      },
      { property: "og:title", content: "Lumen The AI Campaign Agent" },
      {
        property: "og:description",
        content:
          "Generate, personalize and publish entire marketing campaigns from a single prompt.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-[var(--text-primary)]">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-[50vh] flex items-center justify-center bg-[#09090B]"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div></div>}>
          <MassiveFeatureGrid />
          <InteractiveSolutions />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
