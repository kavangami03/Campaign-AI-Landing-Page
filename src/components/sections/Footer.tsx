
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

function Footer() {
  const cols = [
    { t: "Product", l: ["Campaigns", "Automation", "Analytics", "Integrations", "Pricing"] },
    { t: "Solutions", l: ["E-commerce", "Travel", "Finance", "Media", "Enterprise"] },
    { t: "Resources", l: ["Blog", "Customer stories", "Templates", "Changelog", "Help center"] },
    { t: "Company", l: ["About", "Careers", "Press", "Security", "Contact"] },
  ];
  return (
    <footer className="bg-[#09090b] border-t border-white/5 pt-20 overflow-hidden relative z-20">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-primary/20 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        {/* Top Section */}
        <div className="grid gap-16 lg:grid-cols-[1.5fr_2.5fr]">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-display text-3xl font-bold text-white tracking-tight">
                Lumen
              </span>
            </div>
            <p className="max-w-xs text-base text-neutral-400 leading-relaxed mb-8">
              The AI campaign agent for marketing teams who care about craft, clarity and results.
            </p>

            {/* Newsletter Input */}
            <div className="relative max-w-sm group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur opacity-30 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative flex items-center bg-[#121217] rounded-full p-1 border border-white/10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none outline-none text-white px-4 w-full text-sm placeholder:text-neutral-500"
                />
                <button className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.t}>
                <div className="text-xs font-bold uppercase tracking-widest text-white mb-6">
                  {c.t}
                </div>
                <ul className="space-y-4">
                  {c.l.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="group inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors relative pb-1"
                      >
                        <span>{l}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Typography */}
        <div className="w-full flex justify-center pt-10 pb-4 select-none pointer-events-none relative">
          <h2 className="text-[12vw] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent">
            L U M E N
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 border-t border-white/5 text-sm text-neutral-500 relative z-10">
          <p>© {new Date().getFullYear()} Lumen Labs, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-white transition-colors">
              DPA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
