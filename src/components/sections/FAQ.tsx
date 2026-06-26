
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

function FAQ() {
  const items = [
    {
      q: "What exactly does Lumen generate from a prompt?",
      a: "Lumen generates campaign strategy, copy, visuals, audience segments, channel-specific variants and a publishing schedule â€” all editable and on-brand.",
    },
    {
      q: "Which channels does Lumen support today?",
      a: "Email, WhatsApp, Instagram, Facebook, LinkedIn, YouTube, SMS, RCS and Voice â€” plus webhook integrations into your existing stack.",
    },
    {
      q: "How does Lumen learn our brand voice?",
      a: "Connect a website, upload brand guidelines, or paste past campaigns. Lumen builds a private brand model used in every generation.",
    },
    {
      q: "Is our data used to train shared models?",
      a: "Never. Your data stays in your workspace, encrypted in transit and at rest. Models trained on your content are isolated to your account.",
    },
    {
      q: "Can my team approve drafts before they go live?",
      a: "Yes â€” configurable approval flows, role-based access and a full audit trail for every send.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="resources"
      className="bg-[#09090B] py-20 md:py-28 relative z-20 border-t border-white/5 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute top-1/2 -right-[10%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <motion.div {...fadeUp} className="max-w-xl">
            <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10">
              <motion.div
                animate={{ x: ["-150%", "150%", "-150%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent skew-x-12"
              />
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-blue-400 drop-shadow-sm">
                FREQUENTLY ASKED
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
              Questions,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                answered.
              </span>
            </h2>
            <p className="mt-6 text-neutral-400 text-lg">
              Still wondering something specific? Our team is happy to walk your stack through a
              working session.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <motion.div key={it.q} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.04 }}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "bg-white/5 border-white/20 shadow-lg" : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10"}`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                    >
                      <span
                        className={`font-display text-lg md:text-xl font-medium transition-colors ${isOpen ? "text-white" : "text-neutral-300"}`}
                      >
                        {it.q}
                      </span>
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? "bg-blue-500/20 text-blue-400 rotate-180" : "bg-white/5 text-neutral-500"}`}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-neutral-400 leading-relaxed text-base">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export default FAQ;
