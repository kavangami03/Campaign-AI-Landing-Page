
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

function MassiveFeatureGrid() {
  return (
    <section
      id="product"
      className="bg-[#09090B] py-20 md:py-28 px-4 md:px-6 relative z-20 border-t border-white/5 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute top-1/4 -left-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl">
            <motion.div
              animate={{ x: ["-150%", "150%", "-150%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
            />
            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
              EVERYTHING YOU NEED
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white max-w-3xl leading-[1.1] tracking-tight">
            An entire marketing team <br className="hidden md:block" />
            <span className="font-serif italic text-primary font-normal">
              working at the speed of thought.
            </span>
          </h2>
          <p className="mt-6 text-neutral-400 max-w-xl text-base md:text-lg">
            From zero to launch in seconds. Generate creatives, manage interactions, and track
            revenue automatically across every channel.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[auto]">
          {/* ROW 1 */}
          {/* Card 1: 2 Cols */}
          <motion.div
                                                className="lg:col-span-2 rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[350px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors"
          >
            <div className="absolute inset-0 z-0">
              <img loading="lazy" decoding="async" src={publishingWorkspace}
                alt="Workspace"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 mix-blend-lighten"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/80 to-transparent" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md mb-4 border border-white/10">
                <Workflow className="w-3.5 h-3.5 text-primary" />
                AI Campaign Engine
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">
                Full Campaign Generation
              </h3>
              <p className="text-neutral-400 text-sm md:text-base max-w-lg">
                Targeting, copy, and creatives generated instantly from a single prompt before the
                campaign goes live.
              </p>
            </div>
          </motion.div>

          {/* Card 2: 1 Col */}
          <motion.div
                                                transition={{ delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors"
          >
            {/* Mock UI */}
            <div className="w-full h-[160px] bg-white/5 rounded-2xl mb-8 border border-white/10 p-4 relative overflow-hidden flex flex-col gap-3 group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full" />
              <div className="h-4 w-1/2 bg-white/20 rounded-md mb-2" />
              <div className="h-8 w-full bg-white/10 rounded-md" />
              <div className="h-8 w-full bg-white/10 rounded-md" />
              <div className="h-10 w-full bg-primary/20 border border-primary/30 rounded-md mt-auto flex items-center justify-center text-primary text-xs font-bold">
                Submit Form
              </div>
            </div>
            <div className="mt-auto relative z-10">
              <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
                Lead Generation Funnels
              </h3>
              <p className="text-neutral-400 text-sm">
                Deploy high-converting landing pages and dynamic intake forms automatically.
              </p>
            </div>
          </motion.div>

          {/* ROW 2 */}
          {/* Card 3: 1 Col */}
          <motion.div
                                                className="rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
              Automated Outreach
            </h3>
            <p className="text-neutral-400 text-sm">
              Intelligent email sequences and follow-ups that guarantee incredible open rates.
            </p>
          </motion.div>

          {/* Card 4: 1 Col */}
          <motion.div
                                                transition={{ delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
              Cross-Channel Publishing
            </h3>
            <p className="text-neutral-400 text-sm">
              Push your creatives directly to Facebook, Instagram, LinkedIn, and more.
            </p>
          </motion.div>

          {/* Card 5: 1 Col */}
          <motion.div
                                                transition={{ delay: 0.2 }}
            className="rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center mb-6 border border-orange-500/30 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
              Dynamic A/B Testing
            </h3>
            <p className="text-neutral-400 text-sm">
              Automatically test hundreds of ad variations to find the perfect winning combination.
            </p>
          </motion.div>

          {/* ROW 3 */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 6 */}
            <motion.div
                                                        className="rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[300px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors"
            >
              <div className="absolute inset-0 z-0">
                <img loading="lazy" decoding="async" src={journeyBuilder}
                  alt="Journey Builder"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 mix-blend-lighten"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">
                  Visual Workflow Builder
                </h3>
                <p className="text-neutral-400 text-sm md:text-base max-w-sm">
                  Map out complex customer journeys and automated engagement loops with a
                  drag-and-drop canvas.
                </p>
              </div>
            </motion.div>

            {/* Card 7 */}
            <motion.div
                                                        transition={{ delay: 0.1 }}
              className="rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[300px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors"
            >
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img loading="lazy" decoding="async" src={aiBrain}
                  alt="AI Reporting"
                  className="w-[120%] h-[120%] object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f13] via-transparent to-[#0f0f13]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/60 to-transparent" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">
                  Deep AI Reasoning
                </h3>
                <p className="text-neutral-400 text-sm md:text-base max-w-sm">
                  Lumen analyzes your brand voice and past performance data to craft the perfect
                  editorial tone.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ROW 4 */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 8 */}
            <motion.div
                                                        className="rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl flex flex-col md:flex-row items-center p-8 gap-8 hover:border-white/20 transition-colors"
            >
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-white/10 h-48 relative">
                <img loading="lazy" decoding="async" src={analytics}
                  alt="Analytics"
                  className="w-full h-full object-cover mix-blend-lighten opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
                  Real-time Analytics
                </h3>
                <p className="text-neutral-400 text-sm">
                  Track conversions, click-through rates, and total revenue impact at a single
                  glance.
                </p>
              </div>
            </motion.div>

            {/* Card 9 */}
            <motion.div
                                                        transition={{ delay: 0.1 }}
              className="rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl flex flex-col md:flex-row-reverse items-center p-8 gap-8 hover:border-white/20 transition-colors"
            >
              <div className="w-full md:w-1/2 rounded-2xl border border-white/10 h-48 bg-white/[0.02] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <Globe className="w-16 h-16 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] group-hover:scale-110 transition-transform" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
                  Global Localization
                </h3>
                <p className="text-neutral-400 text-sm">
                  Automatically translate and adapt your campaigns for international audiences in
                  seconds.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ROW 5 */}
          {/* Card 10: 2 Cols */}
          <motion.div
                                                className="lg:col-span-2 rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 hover:border-white/20 transition-colors"
          >
            <div className="w-full md:w-1/2 z-10 relative">
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">
                Automated Reminders
              </h3>
              <p className="text-neutral-400 text-sm md:text-base">
                Ensure customers show up with perfectly timed, AI-personalized text and email
                reminders.
              </p>
            </div>
            {/* Mock Mobile UI */}
            <div className="w-full md:w-1/2 relative h-[250px] flex justify-center items-center">
              <div className="absolute w-[220px] h-[300px] rounded-3xl bg-[#111116] border-[6px] border-white/5 shadow-2xl flex flex-col p-4 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="w-12 h-1 bg-white/10 mx-auto rounded-full mb-4" />
                <div className="self-start bg-white/10 text-white text-[10px] px-3 py-2 rounded-2xl rounded-tl-sm mb-3">
                  Hi! Just a reminder about our event tomorrow at 2 PM.
                </div>
                <div className="self-end bg-primary text-white text-[10px] px-3 py-2 rounded-2xl rounded-tr-sm mb-3">
                  Thanks! Will be there.
                </div>
                <div className="self-start bg-white/10 text-white text-[10px] px-3 py-2 rounded-2xl rounded-tl-sm mb-3">
                  Perfect. See you soon.
                </div>
                <div className="mt-auto bg-green-500/20 text-green-400 text-xs text-center py-2 rounded-lg font-medium border border-green-500/20">
                  Confirmed ✓
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 11: 1 Col */}
          <motion.div
                                                transition={{ delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors"
          >
            <div className="flex -space-x-3 mb-8 mt-4 group-hover:scale-110 transition-transform origin-left">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-30">
                <img loading="lazy" decoding="async" src="/images/whatsapp.svg" alt="WA" className="w-full h-full object-contain" />
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-20">
                <img loading="lazy" decoding="async" src="/images/gmail.svg" alt="Gmail" className="w-full h-full object-contain" />
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-10">
                <img loading="lazy" decoding="async" src="/images/messages.svg"
                  alt="SMS"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2 mt-auto">
              Campaign Text & Emails
            </h3>
            <p className="text-neutral-400 text-sm">
              Engage your user base with high-converting, targeted marketing blasts and
              announcements.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default MassiveFeatureGrid;
