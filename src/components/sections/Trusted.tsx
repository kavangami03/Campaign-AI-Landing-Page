
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

function Trusted() {
  const logos = [
    "Northwave",
    "Atrium",
    "LumiÃ¨re",
    "Halcyon",
    "Field & Co.",
    "Stellar",
    "Marigold",
    "Verdant",
  ];
  return (
    <section className="mx-auto max-w-[1920px] border-y border-border/60 bg-ivory/40 py-10">
      <div className="container-editorial">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-ink-soft">
          Trusted by marketing teams at category-defining brands
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="font-display text-2xl text-ink-soft/70">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Trusted;
