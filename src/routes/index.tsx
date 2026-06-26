import { createFileRoute } from "@tanstack/react-router";
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
import { GlobeIcon } from "@/components/magicui/globe";
import { AppIcon } from "@/components/ui/app-icons";
import journeyBuilder from "@/assets/journey-builder.jpg";
import HeroCanvas from "@/components/hero-canvas";
import { MagneticButton, AnimatedCounter } from "@/components/hero-animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen â€” The AI Campaign Agent for Modern Marketing Teams" },
      {
        name: "description",
        content:
          "Lumen turns a single prompt into beautifully crafted, omnichannel marketing campaigns â€” orchestrated across email, WhatsApp, Instagram, SMS, LinkedIn and more.",
      },
      { property: "og:title", content: "Lumen â€” The AI Campaign Agent" },
      {
        property: "og:description",
        content:
          "Generate, personalize and publish entire marketing campaigns from a single prompt.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

/* ---------------------------------------------------------------- */
/*  Shared                                                          */
/* ---------------------------------------------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-ink-soft backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-balance text-4xl leading-[1.05] text-ink md:text-5xl lg:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------------- */
/*  Header                                                          */
/* ---------------------------------------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
    { label: "Resources", href: "#resources" }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6 header-reveal">
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
          scrolled
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
                document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
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
            className="hidden rounded-full px-4 py-2 text-sm text-neutral-300 transition hover:text-white sm:inline-block"
          >
            Sign in
          </a>
          <MagneticButton
            href="#"
            strength={0.2}
            className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 border border-white/10"
          >
            Start free
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- */
/*  Hero — Energy Stream Dark Theme                                 */
/* ---------------------------------------------------------------- */

const defaultContent = {
  tag: "Next-Gen AI Marketing",
  heading1: "Launch Campaigns",
  heading2: "That Think Before You Do",
  description:
    "Generate complete marketing campaigns powered by AI. From strategy to creatives, copy, targeting and optimization—all in one intelligent workspace.",
};

const scatteredIcons = [
  // Left side field
  {
    name: "Facebook",
    src: "/images/facebook.svg",
    color: "#1877F2",
    top: "12%",
    left: "18%",
    depth: 1.5,
    rotate: -15,
    scale: 1,
    content: {
      tag: "Facebook Ads Automation",
      heading1: "Dominate the Feed",
      heading2: "With Smart Meta Ads",
      description:
        "Automatically test hundreds of creatives and copy variations to find the perfect winning combination for your Facebook audience.",
    },
  },
  {
    name: "WhatsApp",
    src: "/images/whatsapp.svg",
    color: "#25D366",
    top: "28%",
    left: "12%",
    depth: 0.8,
    rotate: 10,
    scale: 0.8,
    content: {
      tag: "Direct Messaging",
      heading1: "Personalized Chats",
      heading2: "That Drive Instant Sales",
      description:
        "Deploy conversational AI marketing straight to their inbox with automated follow-ups and frictionless checkout flows.",
    },
  },
  {
    name: "LinkedIn",
    src: "/images/linkedin.svg",
    color: "#0A66C2",
    top: "55%",
    left: "23%",
    depth: 2.2,
    rotate: -5,
    scale: 1.1,
    content: {
      tag: "B2B Lead Generation",
      heading1: "Target Professionals",
      heading2: "With Absolute Precision",
      description:
        "Launch high-ticket B2B outreach and tailored ad funnels that speak directly to decision makers.",
    },
  },
  {
    name: "RCS",
    src: "/images/RCS.svg",
    color: "#673AB7",
    top: "72%",
    left: "12%",
    depth: 1.2,
    rotate: 20,
    scale: 0.9,
    content: {
      tag: "Rich Communication",
      heading1: "Interactive Texts",
      heading2: "Beyond Standard SMS",
      description:
        "Engage your audience with rich-media messages, interactive carousels, and instant actions right inside their native messaging app.",
    },
  },
  {
    name: "Voice",
    src: "/images/voice.svg",
    color: "#10B981",
    top: "90%",
    left: "22%",
    depth: 0.6,
    rotate: -10,
    scale: 0.85,
    content: {
      tag: "Voice AI",
      heading1: "Human-Like Calls",
      heading2: "Fully Automated Outreach",
      description:
        "Deploy conversational voice agents that sound completely natural to qualify leads and book appointments 24/7.",
    },
  },

  // Right side field
  {
    name: "Instagram",
    src: "/images/instagram.svg",
    color: "#E4405F",
    top: "10%",
    left: "78%",
    depth: 1.8,
    rotate: 12,
    scale: 1.1,
    content: {
      tag: "Visual Storytelling",
      heading1: "Convert Followers",
      heading2: "Into Loyal Customers",
      description:
        "Automated reels, stories, and stunning image ads generated and optimized entirely by artificial intelligence.",
    },
  },
  {
    name: "Twitter",
    src: "/images/twitter.svg",
    color: "#1DA1F2",
    top: "35%",
    left: "80%",
    depth: 0.9,
    rotate: -8,
    scale: 0.9,
    content: {
      tag: "Real-time Engagement",
      heading1: "Join the Conversation",
      heading2: "At the Speed of Culture",
      description:
        "Capitalize on trending topics with rapid, automated ad deployment and intelligent tweet sequencing.",
    },
  },
  {
    name: "Gmail",
    src: "/images/gmail.svg",
    color: "#EA4335",
    top: "52%",
    left: "86%",
    depth: 2.5,
    rotate: 15,
    scale: 1,
    content: {
      tag: "Email Campaigns",
      heading1: "Inboxes Await",
      heading2: "High-Converting Outreach",
      description:
        "Launch AI-crafted email sequences, newsletters, and automated follow-ups that guarantee incredible open rates.",
    },
  },
  {
    name: "Messages",
    src: "/images/messages.svg",
    color: "#4285F4",
    top: "70%",
    left: "75%",
    depth: 1.1,
    rotate: -12,
    scale: 0.8,
    content: {
      tag: "SMS Marketing",
      heading1: "Instant Delivery",
      heading2: "Highest Open Rates",
      description:
        "Send targeted text blasts and personalized promotions directly to their mobile devices automatically.",
    },
  },
  {
    name: "Comment",
    src: "/images/comment.svg",
    color: "#FBBF24",
    top: "88%",
    left: "86%",
    depth: 1.6,
    rotate: 8,
    scale: 1.05,
    content: {
      tag: "Community Management",
      heading1: "Engage Audiences",
      heading2: "With Smart AI Replies",
      description:
        "Automated comment moderation, intelligent replies, and AI-driven community building to keep your brand's voice active.",
    },
  },
];

const FloatingIcon = ({ icon, i, hoveredIcon, setHoveredIcon, handleIconClick }: any) => {
  return (
    <motion.div
      className="absolute hidden lg:block z-30"
      style={{
        top: icon.top,
        left: icon.left,
        scale: icon.scale,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: icon.scale }}
      transition={{ duration: 1, delay: i * 0.1 }}
    >
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [icon.rotate, icon.rotate + 5, icon.rotate] }}
        transition={{
          duration: 4 + icon.depth,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.2,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.25, rotate: 0 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHoveredIcon({ name: icon.name, color: icon.color })}
          onHoverEnd={() => setHoveredIcon(null)}
          onClick={(e) => handleIconClick(e, icon)}
          className="flex items-center justify-center cursor-pointer relative group"
        >
          <img
            src={icon.src}
            alt={icon.name}
            className="h-12 w-12 md:h-14 md:w-14 object-contain drop-shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity relative z-10"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIcon, setHoveredIcon] = useState<{ name: string; color: string } | null>(null);
  const [clickedIcon, setClickedIcon] = useState<{
    name: string;
    color: string;
    x: number;
    y: number;
  } | null>(null);
  const [activeContent, setActiveContent] = useState(defaultContent);

  const handleIconClick = (e: React.MouseEvent, icon: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickedIcon({
      name: icon.name,
      color: icon.color,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setTimeout(() => setClickedIcon(null), 1000);
    setActiveContent(icon.content);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#09090B] pt-32 pb-20 flex items-center justify-center perspective-1000"
    >
      {/* 3D WebGL Background Layer */}
      <HeroCanvas />

      {/* Dynamic Hover Glow removed based on request */}

      {/* Click Shockwave */}
      <AnimatePresence>
        {clickedIcon && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed rounded-full pointer-events-none z-50 mix-blend-screen"
            style={{
              left: clickedIcon.x,
              top: clickedIcon.y,
              width: "100px",
              height: "100px",
              marginLeft: "-50px",
              marginTop: "-50px",
              backgroundColor: clickedIcon.color,
              boxShadow: `0 0 50px ${clickedIcon.color}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Foreground content container */}
      <div className="container mx-auto flex max-w-[1920px] items-center justify-between px-6 lg:px-12 xl:px-24 relative z-10 w-full">
        {/* Scattered 3D Parallax Galaxy Icons */}
        {scatteredIcons.map((icon, i) => (
          <FloatingIcon
            key={icon.name}
            icon={icon}
            i={i}
            hoveredIcon={hoveredIcon}
            setHoveredIcon={setHoveredIcon}
            handleIconClick={handleIconClick}
          />
        ))}

        {/* Center Hero Content */}
        <div className="flex-1 flex flex-col items-center text-center max-w-4xl mx-auto px-4 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent.tag}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl"
            >
              <motion.div
                animate={{ x: ["-150%", "150%", "-150%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
              />
              <span className="relative z-10 text-sm font-bold uppercase tracking-widest text-primary drop-shadow-sm">
                {activeContent.tag}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center min-h-[160px] md:min-h-[200px] lg:min-h-[220px] w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeContent.heading1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="font-display text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-2xl"
              >
                {activeContent.heading1} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400 relative">
                  {activeContent.heading2}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex items-start justify-center min-h-[120px] md:min-h-[100px] w-full mt-6 md:mt-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeContent.description}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-light drop-shadow-md"
              >
                {activeContent.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            {/* Primary Button */}
            <button className="relative group cursor-pointer">
              {/* Outer pulsing glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition duration-500 group-hover:duration-200" />

              {/* Main Button Body with moving gradient */}
              <div className="relative flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-700 ease-out overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out" />

                <span className="relative z-10 drop-shadow-md tracking-wide">
                  Generate My Campaign
                </span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>

            {/* Secondary Button */}
            <button className="relative group overflow-hidden rounded-full p-[1px] cursor-pointer">
              {/* Spinning conic gradient border on hover */}
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(168,85,247,0.5)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Inner button body */}
              <div className="relative flex items-center gap-2 rounded-full bg-[#09090b] px-8 py-4 text-base font-bold text-white transition-all group-hover:bg-[#121217] overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out" />

                <span className="relative z-10 tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                  Watch Demo
                </span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MassiveFeatureGrid() {
  return (
    <section id="product" className="bg-[#09090B] py-32 px-4 md:px-6 relative z-20 border-t border-white/5 overflow-hidden">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[350px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={publishingWorkspace}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[300px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={journeyBuilder}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[300px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors"
            >
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                  src={aiBrain}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl flex flex-col md:flex-row items-center p-8 gap-8 hover:border-white/20 transition-colors"
            >
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-white/10 h-48 relative">
                <img
                  src={analytics}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors"
          >
            <div className="flex -space-x-3 mb-8 mt-4 group-hover:scale-110 transition-transform origin-left">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-30">
                <img src="/images/whatsapp.svg" alt="WA" className="w-full h-full object-contain" />
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-20">
                <img src="/images/gmail.svg" alt="Gmail" className="w-full h-full object-contain" />
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-10">
                <img
                  src="/images/messages.svg"
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

/* ---------------------------------------------------------------- */
/*  Logos marquee                                                   */
/* ---------------------------------------------------------------- */

function Trusted() {
  const logos = [
    "Northwave",
    "Atrium",
    "LumiÃ¨re",
    "Halcyon",
    "Field & Co.",
    "Stellar",
    "Marigold",
    "Verdant",
  ];
  return (
    <section className="mx-auto max-w-[1920px] border-y border-border/60 bg-ivory/40 py-10">
      <div className="container-editorial">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-ink-soft">
          Trusted by marketing teams at category-defining brands
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="font-display text-2xl text-ink-soft/70">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Stats removed from here (Moved to Hero section)                 */
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/*  Brain Â· prompt to channel flow                                  */
/* ---------------------------------------------------------------- */

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
    <section className="mx-auto max-w-[1920px] relative overflow-hidden bg-gradient-to-b from-background via-cream/40 to-background py-24 md:py-32">
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

/* ---------------------------------------------------------------- */
/*  Feature: Publishing workspace (image left)                      */
/* ---------------------------------------------------------------- */

function PublishingShowcase() {
  return (
    <section className="mx-auto max-w-[1920px] py-24 md:py-32">
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

/* ---------------------------------------------------------------- */
/*  Three pillars (editorial cards)                                 */
/* ---------------------------------------------------------------- */

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
    <section className="mx-auto max-w-[1920px] bg-ivory/40 py-24 md:py-32">
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

/* ---------------------------------------------------------------- */
/*  Analytics â€” image right                                         */
/* ---------------------------------------------------------------- */

function AnalyticsShowcase() {
  return (
    <section className="mx-auto max-w-[1920px] py-24 md:py-32">
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

/* ---------------------------------------------------------------- */
/*  Journey builder â€” full bleed                                    */
/* ---------------------------------------------------------------- */

function JourneyShowcase() {
  return (
    <section className="mx-auto max-w-[1920px] bg-cream/50 py-24 md:py-32">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp} className="flex justify-center">
            <SectionLabel>Customer journey builder</SectionLabel>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <H2 className="mt-5">
              Design the experience.{" "}
              <span className="italic text-ink-soft">Lumen runs the rest.</span>
            </H2>
          </motion.div>
        </div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-luxe"
        >
          <img
            src={journeyBuilder}
            alt="Customer journey builder mapping awareness through advocacy"
            width={1024}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Testimonials                                                    */
/* ---------------------------------------------------------------- */

function Testimonials() {
  const row1 = [
    {
      q: "Lumen is the first marketing tool that feels like a thoughtful colleague rather than another dashboard.",
      n: "Maya Chen",
      r: "VP Marketing, Northwave",
    },
    {
      q: "We shipped a five-channel holiday campaign in an afternoon. The copy was on-brand on the first draft.",
      n: "Daniel Okafor",
      r: "Head of Growth, Atrium",
    },
    {
      q: "It quietly replaced four tools we were paying for — and the analytics are easier to read.",
      n: "Elena Ruiz",
      r: "CMO, Lumière",
    },
    {
      q: "The ROI we've seen in just two months is staggering. It's like having a full agency on retainer.",
      n: "Sarah Jenkins",
      r: "Founder, Bloom",
    },
  ];

  const row2 = [
    {
      q: "Our email open rates doubled. Lumen just knows exactly how to speak to our core demographic.",
      n: "Michael Chang",
      r: "Director of CRM, Vibe",
    },
    {
      q: "I was skeptical of AI marketing, but this changed everything. The personalization is unmatched.",
      n: "Jessica Albon",
      r: "Head of Digital, Zenith",
    },
    {
      q: "The sheer volume of high-quality assets we can produce now is unbelievable. A true game changer.",
      n: "David Thorne",
      r: "Creative Director, Nexus",
    },
    {
      q: "Customer acquisition cost dropped by 40% since we let Lumen handle the A/B testing variations.",
      n: "Amanda Clarke",
      r: "Growth Lead, FinTech Plus",
    },
  ];

  // We duplicate the arrays to create a seamless infinite loop
  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];

  return (
    <section id="customers" className="bg-[#09090B] py-32 relative z-20 overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center mb-20">
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10">
          <motion.div
            animate={{ x: ["-150%", "150%", "-150%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
          />
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
            WALL OF LOVE
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
          Loved by teams who care about{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400">
            craft.
          </span>
        </h2>
      </div>

      <div 
        className="relative flex flex-col gap-8 overflow-hidden" 
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        
        {/* Row 1: Scrolling Left */}
        <div className="flex w-max">
          <motion.div
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-4"
          >
            {duplicatedRow1.map((q, i) => (
              <div
                key={`${q.n}-${i}`}
                className="w-[380px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors duration-500"
              >
                <div className="absolute -top-10 -right-10 text-[150px] font-serif leading-none text-white/5 group-hover:text-primary/10 transition-colors duration-500">
                  "
                </div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-display text-lg leading-relaxed text-neutral-300 relative z-10 mb-8">
                  "{q.q}"
                </blockquote>
                <figcaption className="flex items-center gap-4 relative z-10 mt-auto">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary via-blue-500 to-orange-500 p-[2px]">
                     <div className="h-full w-full rounded-full bg-[#121217] flex items-center justify-center">
                       <span className="text-white font-bold text-base">{q.n.charAt(0)}</span>
                     </div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{q.n}</div>
                    <div className="text-sm text-neutral-400">{q.r}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-max">
          <motion.div
            animate={{ x: ["-33.333333%", "0%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-4"
          >
            {duplicatedRow2.map((q, i) => (
              <div
                key={`${q.n}-${i}`}
                className="w-[380px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-500"
              >
                <div className="absolute -top-10 -right-10 text-[150px] font-serif leading-none text-white/5 group-hover:text-blue-500/10 transition-colors duration-500">
                  "
                </div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-display text-lg leading-relaxed text-neutral-300 relative z-10 mb-8">
                  "{q.q}"
                </blockquote>
                <figcaption className="flex items-center gap-4 relative z-10 mt-auto">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 p-[2px]">
                     <div className="h-full w-full rounded-full bg-[#121217] flex items-center justify-center">
                       <span className="text-white font-bold text-base">{q.n.charAt(0)}</span>
                     </div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{q.n}</div>
                    <div className="text-sm text-neutral-400">{q.r}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  FAQ                                                             */
/* ---------------------------------------------------------------- */

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
    <section id="resources" className="bg-[#09090B] py-24 md:py-32 relative z-20 border-t border-white/5 overflow-hidden">
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
              Questions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">answered.</span>
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
                  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white/5 border-white/20 shadow-lg' : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'}`}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                    >
                      <span className={`font-display text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-white' : 'text-neutral-300'}`}>{it.q}</span>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? 'bg-blue-500/20 text-blue-400 rotate-180' : 'bg-white/5 text-neutral-500'}`}>
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-neutral-400 leading-relaxed text-base">{it.a}</p>
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

/* ---------------------------------------------------------------- */
/*  CTA + Footer                                                    */
/* ---------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative w-full z-20 overflow-hidden bg-[#09090b] border-t border-white/5 py-32 md:py-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/20 via-blue-500/10 to-orange-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 flex flex-col items-center max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10">
            <motion.div
              animate={{ x: ["-150%", "150%", "-150%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
            />
            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm">
              START FREE • NO CREDIT CARD
            </span>
          </div>

          <h2 className="mx-auto max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl font-bold tracking-tight mb-8">
            Your next campaign is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400">
              one prompt away
            </span>
            .
          </h2>

          <p className="mx-auto max-w-xl text-lg text-neutral-400 mb-12">
            Join 12,000+ marketing teams making their best work with Lumen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="relative group/btn cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur opacity-60 group-hover/btn:opacity-100 transition duration-500" />
              <div className="relative w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-700 ease-out overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 drop-shadow-md tracking-wide">Start generating</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </div>
            </button>

            <button className="relative group/btn overflow-hidden rounded-full p-[1px] cursor-pointer">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(168,85,247,0.5)_50%,transparent_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full flex items-center justify-center gap-2 rounded-full bg-[#121217] px-8 py-4 text-base font-bold text-white transition-all group-hover/btn:bg-[#1a1a24] overflow-hidden border border-white/10 group-hover/btn:border-transparent">
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 tracking-wide text-neutral-300 group-hover/btn:text-white transition-colors">
                  Book a demo
                </span>
              </div>
            </button>
          </div>
        </div>
    </section>
  );
}

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

/* ---------------------------------------------------------------- */
/*  Interactive Solutions                                           */
/* ---------------------------------------------------------------- */

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
    <section id="solutions" className="bg-[#09090B] py-32 px-4 md:px-6 relative z-20 overflow-hidden">
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
                  <img
                    src={solutions[activeTab].image}
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

/* ---------------------------------------------------------------- */
/*  Pricing                                                         */
/* ---------------------------------------------------------------- */

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
    <section id="pricing" className="bg-[#09090B] py-32 px-4 md:px-6 relative z-20 border-t border-white/5 overflow-hidden">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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

/* ---------------------------------------------------------------- */
/*  Page                                                            */
/* ---------------------------------------------------------------- */

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-[var(--text-primary)]">
      <Header />
      <main>
        <Hero />
        <MassiveFeatureGrid />
        <InteractiveSolutions />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
