
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

function FinalCTA() {
  return (
    <section className="relative w-full z-20 overflow-hidden bg-[#09090b] border-t border-white/5 py-20 md:py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/20 via-blue-500/10 to-orange-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 flex flex-col items-center max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10">
          <motion.div
            animate={{ x: ["-150%", "150%", "-150%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
          />
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
            START FREE • NO CREDIT CARD
          </span>
        </div>

        <h2 className="mx-auto max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl font-bold tracking-tight mb-8">
          Your next campaign is{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400">
            one prompt away
          </span>
          .
        </h2>

        <p className="mx-auto max-w-xl text-lg text-neutral-400 mb-12">
          Join 12,000+ marketing teams making their best work with Lumen.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button className="relative group/btn cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur opacity-60 group-hover/btn:opacity-100 transition duration-500" />
            <div className="relative w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-700 ease-out overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10 drop-shadow-md tracking-wide">Start generating</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </div>
          </button>

          <button className="relative group/btn overflow-hidden rounded-full p-[1px] cursor-pointer">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(168,85,247,0.5)_50%,transparent_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            <div className="relative w-full flex items-center justify-center gap-2 rounded-full bg-[#121217] px-8 py-4 text-base font-bold text-white transition-all group-hover/btn:bg-[#1a1a24] overflow-hidden border border-white/10 group-hover/btn:border-transparent">
              <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10 tracking-wide text-neutral-300 group-hover/btn:text-white transition-colors">
                Book a demo
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
export default FinalCTA;
