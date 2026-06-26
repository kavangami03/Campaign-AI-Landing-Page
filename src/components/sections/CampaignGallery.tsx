import React from "react";
import DomeGallery from "@/components/ui/DomeGallery";
import { motion } from "motion/react";
import { SectionLabel } from "./Shared";

const CAMPAIGN_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop', // Digital marketing abstract
    alt: 'Social Media Campaign'
  },
  {
    src: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop', // Neon/tech aesthetic
    alt: 'Email Marketing Flow'
  },
  {
    src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', // Instagram/social
    alt: 'Visual Content Generation'
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop', // Data/analytics
    alt: 'Campaign Analytics Dashboard'
  },
  {
    src: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1000&auto=format&fit=crop', // Mobile app/chat
    alt: 'WhatsApp Automation'
  },
  {
    src: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1000&auto=format&fit=crop', // Creative desk
    alt: 'Brand Storytelling'
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', // Web/marketing
    alt: 'Conversion Optimization'
  }
];

export default function CampaignGallery() {
  return (
    <section className="relative w-full overflow-hidden bg-[#09090B] pt-32 pb-0 border-t border-white/5">
      {/* Background Gradient */}
      <div className="absolute top-1/2 -right-[10%] w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 z-10 relative mb-16 text-center flex flex-col items-center">
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl">
          <motion.div
            animate={{ x: ["-150%", "150%", "-150%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
          />
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
            AI-GENERATED ASSETS
          </span>
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-display mt-6"
        >
          Beautifully Crafted Campaigns
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-neutral-400 max-w-2xl mx-auto"
        >
          Explore a 3D gallery of stunning creatives generated completely on-the-fly. From hero images to social graphics, AI handles the design heavy-lifting.
        </motion.p>
      </div>

      <div className="relative w-full h-[600px] md:h-[800px] mt-12 bg-transparent overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <div className="absolute inset-0 z-10">
          <DomeGallery 
            images={CAMPAIGN_IMAGES}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            overlayBlurColor="#09090B"
          />
        </div>
      </div>
    </section>
  );
}
