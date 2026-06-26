
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

function JourneyShowcase() {
  return (
    <section className="mx-auto max-w-[1920px] bg-cream/50 py-20 md:py-28">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp} className="flex justify-center">
            <SectionLabel>Customer journey builder</SectionLabel>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <H2 className="mt-5">
              Design the experience.{" "}
              <span className="italic text-ink-soft">Lumen runs the rest.</span>
            </H2>
          </motion.div>
        </div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-luxe"
        >
          <img
            src={journeyBuilder}
            alt="Customer journey builder mapping awareness through advocacy"
            width={1024}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
export default JourneyShowcase;
