import { createFileRoute } from "@tanstack/react-router";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import MassiveFeatureGrid from "@/components/sections/MassiveFeatureGrid";
import InteractiveSolutions from "@/components/sections/InteractiveSolutions";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export const Route = createFileRoute("/index/new")({
  head: () => ({
    meta: [
      { title: "Lumen â€” The AI Campaign Agent for Modern Marketing Teams" },
      {
        name: "description",
        content:
          "Lumen turns a single prompt into beautifully crafted, omnichannel marketing campaigns â€” orchestrated across email, WhatsApp, Instagram, SMS, LinkedIn and more.",
      },
      { property: "og:title", content: "Lumen â€” The AI Campaign Agent" },
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
        <MassiveFeatureGrid />
        <InteractiveSolutions />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
