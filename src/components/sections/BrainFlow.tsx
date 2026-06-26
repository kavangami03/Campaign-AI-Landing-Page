
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

function BrainFlow() {
  const channels = [
    { name: "Email", Icon: Mail, color: "#E0524F" },
    {
      name: "Instagram",
      Icon: Instagram,
      gradient: "linear-gradient(135deg,#feda77,#f58529,#dd2a7b)",
    },
    { name: "WhatsApp", Icon: MessageCircle, color: "#25D366" },
    { name: "Facebook", Icon: Facebook, color: "#1877F2" },
    { name: "LinkedIn", Icon: Linkedin, color: "#0A66C2" },
    { name: "YouTube", Icon: Youtube, color: "#FF0000" },
    { name: "SMS", Icon: Phone, color: "#3B82F6" },
    { name: "RCS", Icon: Send, color: "#8B5CF6" },
  ];

  return (
    <section className="mx-auto max-w-[1920px] relative overflow-hidden bg-gradient-to-b from-background via-cream/40 to-background py-20 md:py-28">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp} className="flex justify-center">
            <SectionLabel>The Lumen agent</SectionLabel>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <H2 className="mt-5">
              A single prompt becomes a <span className="italic text-primary">whole campaign</span>.
            </H2>
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mx-auto mt-5 max-w-xl text-lg text-ink-soft"
          >
            Lumen reasons across your brand, your audience and every channel â€” then drafts the
            copy, art-directs the creative and schedules the send.
          </motion.p>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Prompt */}
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="text-xs uppercase tracking-[0.16em] text-ink-soft">Your prompt</div>
            <p className="mt-3 font-display text-2xl leading-snug text-ink">
              â€œLaunch our autumn capsule. Editorial tone, warm visuals, drive try-on bookings
              across all our channels.â€
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> 1 prompt
            </div>
          </motion.div>

          {/* Brain */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative mx-auto h-80 w-80 md:h-96 md:w-96"
          >
            <img
              src={aiBrain}
              alt="Lumen AI agent reasoning across brand, audience and channels"
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute inset-0 h-full w-full animate-float-slow object-contain"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs text-ink-soft backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Lumen is reasoningâ€¦
              </div>
            </div>
          </motion.div>

          {/* Channels */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="text-xs uppercase tracking-[0.16em] text-ink-soft">
              Generated outputs
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {channels.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-ivory/50 px-3 py-2.5"
                >
                  <div
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-white"
                    style={c.gradient ? { background: c.gradient } : { background: c.color }}
                  >
                    <c.Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-ink">{c.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default BrainFlow;
