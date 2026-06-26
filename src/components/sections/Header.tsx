
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
  Menu,
  X,
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

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Product", href: "#product" },
    { label: "Solutions", href: "#solutions" },
    { label: "Customers", href: "#customers" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6 header-reveal">
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
            scrolled || mobileMenuOpen
              ? "border-white/10 bg-black/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
        <a href="#" className="flex items-center gap-2 pl-3 group">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-blue-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-transform duration-500 group-hover:rotate-180">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-xl tracking-tight text-white">Lumen</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative rounded-full px-4.5 py-1.5 text-sm text-neutral-300 transition-colors hover:text-white"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span className="relative z-10">{item.label}</span>
              {hoveredIdx === i && (
                <motion.span
                  layoutId="header-nav-pill"
                  className="absolute inset-0 z-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 320, damping: 25 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden rounded-full px-4 py-2 text-sm text-neutral-300 transition hover:text-white sm:inline-block md:hidden lg:inline-block"
          >
            Sign in
          </a>
          <MagneticButton
            href="#"
            strength={0.2}
            className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient-x px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border-none"
          >
            Start free
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 text-neutral-300 hover:text-white transition-colors ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-4 top-[88px] z-40 rounded-2xl border border-white/10 bg-[#09090b]/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-lg font-medium text-neutral-300 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              <a href="#" className="text-center font-medium text-neutral-300 hover:text-white py-2">
                Sign in
              </a>
              <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient-x px-5 py-3 text-sm font-semibold text-white transition-all">
                Start free
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
export default Header;
