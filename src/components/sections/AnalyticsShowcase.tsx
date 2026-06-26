
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

function AnalyticsShowcase() {
  return (
    <section className="mx-auto max-w-[1920px] py-20 md:py-28">
      <div className="container-editorial grid items-center gap-12 lg:grid-cols-2">
        <motion.div {...fadeUp} className="max-w-lg">
          <SectionLabel>Performance analytics</SectionLabel>
          <H2 className="mt-5">
            Every send, learned from. <span className="italic">Every result, explained.</span>
          </H2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Beautiful, opinionated dashboards surface what's working â€” and Lumen writes the
            narrative so anyone on the team can act on it within minutes.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { Icon: BarChart3, label: "Multi-touch attribution" },
              { Icon: Zap, label: "Realtime cohort tracking" },
              { Icon: Calendar, label: "Send-time intelligence" },
              { Icon: Globe, label: "Geo & locale insights" },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cream">
                  <f.Icon className="h-4 w-4 text-ink" />
                </div>
                <p className="text-sm leading-snug text-ink">{f.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-luxe">
            <img
              src={analytics}
              alt="Lumen analytics dashboard with revenue, conversions and audience segmentation"
              width={1280}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default AnalyticsShowcase;
