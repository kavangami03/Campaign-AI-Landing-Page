
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import { InteractiveTooltip } from "@/components/ui/interactive-tooltip";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Phone,
  Send,
  Star,
  Shield,
  Zap,
  BarChart3,
  Workflow,
  Globe,
  Users,
  Calendar,
  ChevronDown,
  Wand2,
  Twitter,
  Twitch,
  Figma,
  Slack,
  Github,
  Dribbble,
} from "lucide-react";

import aiBrain from "@/assets/ai-brain.jpg";
import publishingWorkspace from "@/assets/publishing-workspace.jpg";
import analytics from "@/assets/analytics.jpg";

import { AppIcon } from "@/components/ui/app-icons";
import journeyBuilder from "@/assets/journey-builder.jpg";
import HeroCanvas from "@/components/hero-canvas";
import { MagneticButton, AnimatedCounter } from "@/components/hero-animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



/* ---------------------------------------------------------------- */
/*  Shared                                                          */
/* ---------------------------------------------------------------- */

import { SectionLabel, H2, fadeUp } from './Shared';

function Testimonials() {
  const row1 = [
    {
      q: "Lumen is the first marketing tool that feels like a thoughtful colleague rather than another dashboard.",
      n: "Maya Chen",
      r: "VP Marketing, Northwave",
    },
    {
      q: "We shipped a five-channel holiday campaign in an afternoon. The copy was on-brand on the first draft.",
      n: "Daniel Okafor",
      r: "Head of Growth, Atrium",
    },
    {
      q: "It quietly replaced four tools we were paying for — and the analytics are easier to read.",
      n: "Elena Ruiz",
      r: "CMO, Lumière",
    },
    {
      q: "The ROI we've seen in just two months is staggering. It's like having a full agency on retainer.",
      n: "Sarah Jenkins",
      r: "Founder, Bloom",
    },
  ];

  const row2 = [
    {
      q: "Our email open rates doubled. Lumen just knows exactly how to speak to our core demographic.",
      n: "Michael Chang",
      r: "Director of CRM, Vibe",
    },
    {
      q: "I was skeptical of AI marketing, but this changed everything. The personalization is unmatched.",
      n: "Jessica Albon",
      r: "Head of Digital, Zenith",
    },
    {
      q: "The sheer volume of high-quality assets we can produce now is unbelievable. A true game changer.",
      n: "David Thorne",
      r: "Creative Director, Nexus",
    },
    {
      q: "Customer acquisition cost dropped by 40% since we let Lumen handle the A/B testing variations.",
      n: "Amanda Clarke",
      r: "Growth Lead, FinTech Plus",
    },
  ];

  // We duplicate the arrays to create a seamless infinite loop
  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];

  return (
    <section
      id="customers"
      className="bg-[#09090B] py-20 md:py-28 relative z-20 overflow-hidden border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center mb-20">
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10">
          <motion.div
            animate={{ x: ["-150%", "150%", "-150%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
          />
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
            WALL OF LOVE
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
          Loved by teams who care about{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400">
            craft.
          </span>
        </h2>
      </div>

      <div
        className="relative flex flex-col gap-8 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Row 1: Scrolling Left */}
        <div className="flex w-max">
          <motion.div
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-4"
          >
            {duplicatedRow1.map((q, i) => (
              <div
                key={`${q.n}-${i}`}
                className="w-[380px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors duration-500"
              >
                <div className="absolute -top-10 -right-10 text-[150px] font-serif leading-none text-white/5 group-hover:text-primary/10 transition-colors duration-500">
                  "
                </div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-display text-lg leading-relaxed text-neutral-300 relative z-10 mb-8">
                  "{q.q}"
                </blockquote>
                <figcaption className="flex items-center gap-4 relative z-10 mt-auto">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary via-blue-500 to-orange-500 p-[2px]">
                    <div className="h-full w-full rounded-full bg-[#121217] flex items-center justify-center">
                      <span className="text-white font-bold text-base">{q.n.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{q.n}</div>
                    <div className="text-sm text-neutral-400">{q.r}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-max">
          <motion.div
            animate={{ x: ["-33.333333%", "0%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-4"
          >
            {duplicatedRow2.map((q, i) => (
              <div
                key={`${q.n}-${i}`}
                className="w-[380px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-500"
              >
                <div className="absolute -top-10 -right-10 text-[150px] font-serif leading-none text-white/5 group-hover:text-blue-500/10 transition-colors duration-500">
                  "
                </div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-display text-lg leading-relaxed text-neutral-300 relative z-10 mb-8">
                  "{q.q}"
                </blockquote>
                <figcaption className="flex items-center gap-4 relative z-10 mt-auto">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 p-[2px]">
                    <div className="h-full w-full rounded-full bg-[#121217] flex items-center justify-center">
                      <span className="text-white font-bold text-base">{q.n.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{q.n}</div>
                    <div className="text-sm text-neutral-400">{q.r}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
