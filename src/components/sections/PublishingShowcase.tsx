
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

function PublishingShowcase() {
  return (
    <section className="mx-auto max-w-[1920px] py-20 md:py-28">
      <div className="container-editorial grid items-center gap-12 lg:grid-cols-2">
        <motion.div {...fadeUp} className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-luxe">
            <img
              src={publishingWorkspace}
              alt="Lumen campaign publishing workspace with calendar and scheduled posts"
              width={1280}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 max-w-lg lg:order-2"
        >
          <SectionLabel>Publishing workspace</SectionLabel>
          <H2 className="mt-5">
            One canvas to schedule <span className="italic">every</span> channel.
          </H2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Plan your week visually. Drag a campaign across email, WhatsApp, Instagram and SMS â€”
            Lumen handles the channel-specific formatting, timing and audience splits automatically.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Unified calendar across 14+ channels",
              "Approval flows that respect your brand",
              "Send-time optimization per audience",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-ink">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-peach">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            Tour the workspace{" "}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
export default PublishingShowcase;
