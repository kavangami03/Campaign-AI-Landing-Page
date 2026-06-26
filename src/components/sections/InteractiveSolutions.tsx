
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

function InteractiveSolutions() {
  const [activeTab, setActiveTab] = useState(0);

  const solutions = [
    {
      id: "ecommerce",
      title: "For E-Commerce Brands",
      subtitle: "Drive conversions on autopilot.",
      description:
        "Let the agent analyze your catalog, write compelling ad copy, and automatically deploy A/B tests across Meta and Google to find your winning ROAS.",
      image: "/images/ecommerce-dashboard.png",
    },
    {
      id: "agencies",
      title: "For Marketing Agencies",
      subtitle: "Scale without scaling headcount.",
      description:
        "Manage dozens of clients from a single command center, with automated reporting and white-labeled campaign generation powered by AI.",
      image: "/images/agency-workspace.png",
    },
    {
      id: "creators",
      title: "For Content Creators",
      subtitle: "Turn your audience into a business.",
      description:
        "Automate your DMs, launch engaging newsletters, and push content across all your social channels simultaneously.",
      image: "/images/content_creators_dashboard.png",
    },
  ];

  return (
    <section
      id="solutions"
      className="bg-[#09090B] py-20 md:py-28 px-4 md:px-6 relative z-20 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute top-1/2 -right-[10%] w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl">
            <motion.div
              animate={{ x: ["-150%", "150%", "-150%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
            />
            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
              WHO IT'S FOR
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400">
              Growth.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
          {/* Left Side: Tabs */}
          <div className="flex flex-col gap-4 relative">
            {solutions.map((sol, idx) => (
              <button
                key={sol.id}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 relative border ${activeTab === idx ? "bg-[#121217] border-white/10" : "bg-transparent border-transparent hover:bg-white/5"}`}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="active-solution-indicator"
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-primary to-orange-500 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <h3
                  className={`font-display text-2xl font-bold mb-2 transition-colors duration-300 ${activeTab === idx ? "text-white" : "text-neutral-400"}`}
                >
                  {sol.title}
                </h3>
                <p
                  className={`text-sm transition-colors duration-300 ${activeTab === idx ? "text-neutral-300" : "text-neutral-500"}`}
                >
                  {sol.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Right Side: Massive Image Display */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0f0f13] aspect-[4/3] lg:aspect-auto lg:h-[600px] shadow-2xl flex flex-col group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent z-10" />
                  <img loading="lazy" decoding="async" src={solutions[activeTab].image}
                    alt={solutions[activeTab].title}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="relative z-20 p-8 md:p-12 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/90 to-transparent mt-auto border-t border-white/5">
                  <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl">
                    {solutions[activeTab].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
export default InteractiveSolutions;
