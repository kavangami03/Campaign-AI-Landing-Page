
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

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Starter",
      description: "For solo founders and early-stage startups.",
      monthlyPrice: 49,
      annualPrice: 39,
      features: ["1 Workspace", "3 Campaign Generations/mo", "Standard Templates", "Email Support"],
      highlighted: false,
      buttonText: "Start Free Trial",
    },
    {
      name: "Growth",
      description: "For scaling teams and marketing agencies.",
      monthlyPrice: 149,
      annualPrice: 119,
      features: [
        "Unlimited Workspaces",
        "Unlimited Campaigns",
        "Custom Brand AI Model",
        "Cross-Channel Publishing",
        "A/B Testing Engine",
        "Priority 24/7 Support",
      ],
      highlighted: true,
      buttonText: "Get Started Now",
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs.",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      features: [
        "Custom SLA",
        "Dedicated Success Manager",
        "On-Premise Deployment",
        "Advanced Analytics & RBAC",
        "White-labeling",
      ],
      highlighted: false,
      buttonText: "Contact Sales",
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-[#09090B] py-20 md:py-28 md:px-6 relative z-20 border-t border-white/5 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute top-1/4 -left-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl">
            <motion.div
              animate={{ x: ["-150%", "150%", "-150%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
            />
            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
              PRICING
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8">
            Scale your revenue, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400">
              not your overhead.
            </span>
          </h2>

          {/* Toggle */}
          <div className="flex items-center bg-[#121217] p-2 rounded-full border border-white/10 relative shadow-xl mt-4">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${!isAnnual ? "text-white" : "text-neutral-400 hover:text-white"}`}
            >
              {!isAnnual && (
                <motion.div
                  layoutId="pricing-toggle"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 z-10 flex items-center gap-2 ${isAnnual ? "text-white" : "text-neutral-400 hover:text-white"}`}
            >
              {isAnnual && (
                <motion.div
                  layoutId="pricing-toggle"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              Annually
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
                                                                      className={`relative rounded-3xl p-8 md:p-10 flex flex-col group ${tier.highlighted ? "bg-[#0f0f13] border-none shadow-[0_0_50px_rgba(168,85,247,0.15)] transform lg:-translate-y-4 z-10" : "bg-[#09090b] border border-white/10 hover:bg-[#0f0f13] transition-colors duration-300 z-0"}`}
            >
              {tier.highlighted && (
                <>
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-primary via-blue-500/50 to-orange-500/50 opacity-50 z-0" />
                  <div className="absolute inset-0 rounded-3xl bg-[#0f0f13] z-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full z-20 shadow-lg">
                    Most Popular
                  </div>
                </>
              )}

              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-neutral-400 text-sm mb-6 min-h-[40px]">{tier.description}</p>

                <div className="mb-8 flex items-end gap-2">
                  <span className="text-5xl font-display font-bold text-white tracking-tight">
                    {typeof tier.monthlyPrice === "number"
                      ? `$${isAnnual ? tier.annualPrice : tier.monthlyPrice}`
                      : tier.monthlyPrice}
                  </span>
                  {typeof tier.monthlyPrice === "number" && (
                    <span className="text-neutral-500 mb-2">/ month</span>
                  )}
                </div>

                <div className="space-y-4 mb-10">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-1 bg-primary/20 p-1 rounded-full">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-neutral-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                {tier.highlighted ? (
                  <button className="w-full relative group/btn cursor-pointer">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur opacity-60 group-hover/btn:opacity-100 transition duration-500" />
                    <div className="relative w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-700 ease-out overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                      <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
                      <span className="relative z-10 drop-shadow-md tracking-wide">
                        {tier.buttonText}
                      </span>
                    </div>
                  </button>
                ) : (
                  <button className="w-full relative group/btn overflow-hidden rounded-full p-[1px] cursor-pointer">
                    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full flex items-center justify-center gap-2 rounded-full bg-[#121217] px-8 py-4 text-sm font-bold text-white transition-all group-hover/btn:bg-[#1a1a24] overflow-hidden border border-white/10 group-hover/btn:border-transparent">
                      <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
                      <span className="relative z-10 tracking-wide text-neutral-300 group-hover/btn:text-white transition-colors">
                        {tier.buttonText}
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Pricing;
