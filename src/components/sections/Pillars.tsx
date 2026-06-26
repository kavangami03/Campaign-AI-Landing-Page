
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

function Pillars() {
  const items = [
    {
      label: "Brand voice",
      Icon: Wand2,
      title: "Trained on your brand. Faithful to your taste.",
      copy: "Upload a guideline doc, a few past campaigns or a website URL â€” Lumen absorbs your tone, vocabulary and visual identity.",
      bg: "bg-peach/40",
    },
    {
      label: "Personalization",
      Icon: Users,
      title: "Crafted for every segment, automatically.",
      copy: "Lumen generates variants for each audience â€” from first-time visitors to high-LTV regulars â€” without the manual matrix.",
      bg: "bg-sky/50",
    },
    {
      label: "Automation",
      Icon: Workflow,
      title: "Always-on journeys that feel handwritten.",
      copy: "Welcome flows, win-back, abandoned cart, post-purchase â€” designed once, refined continuously by the agent.",
      bg: "bg-lavender/50",
    },
  ];
  return (
    <section className="mx-auto max-w-[1920px] bg-ivory/40 py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <motion.div {...fadeUp}>
            <SectionLabel>Built for marketers</SectionLabel>
            <H2 className="mt-5 max-w-2xl">Less tooling. More taste.</H2>
          </motion.div>
          <motion.a
            {...fadeUp}
            href="#"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            Explore the platform
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.article
              key={it.label}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${it.bg}`}>
                <div className="absolute inset-0 bg-grain opacity-60" />
                <div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-xl bg-card/80 backdrop-blur">
                  <it.Icon className="h-5 w-5 text-ink" />
                </div>
                <div className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.16em] text-ink-soft">
                  {it.label}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl leading-snug text-ink">{it.title}</h3>
                <p className="mt-3 text-ink-soft">{it.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Pillars;
