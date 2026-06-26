
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
          <img decoding="async" loading="eager" src={icon.src}
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

  const [index, setIndex] = useState(0);

  const rotatingFeatures = useMemo(
    () => [
      { text: "campaigns, generated", icon: <Wand2 className="w-8 h-8 md:w-10 md:h-10" /> },
      { text: "analytics, tracked", icon: <BarChart3 className="w-8 h-8 md:w-10 md:h-10" /> },
      { text: "socials, automated", icon: <Globe className="w-8 h-8 md:w-10 md:h-10" /> },
      { text: "creatives, perfected", icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" /> },
      { text: "emails, delivered", icon: <Mail className="w-8 h-8 md:w-10 md:h-10" /> },
      { text: "leads, converted", icon: <Users className="w-8 h-8 md:w-10 md:h-10" /> },
      { text: "workflows, streamlined", icon: <Workflow className="w-8 h-8 md:w-10 md:h-10" /> },
      { text: "branding, elevated", icon: <Star className="w-8 h-8 md:w-10 md:h-10" /> },
    ],
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingFeatures.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [rotatingFeatures.length]);

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

          <div className="flex items-center justify-center min-h-[240px] md:min-h-[280px] lg:min-h-[320px] w-full">
            <AnimatePresence mode="wait">
              {activeContent === defaultContent ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-2xl mb-4 max-w-5xl mx-auto">
                    One platform for everything your marketing team does:
                  </h1>
                  <div className="min-h-[80px] md:min-h-[100px] w-full flex justify-center items-center">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4"
                      >
                        <div className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient-x text-white p-2 md:p-3 rounded-full flex-shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                          {rotatingFeatures[index].icon}
                        </div>
                        <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient-x pb-2 text-center leading-tight sm:whitespace-nowrap">
                          {rotatingFeatures[index].text}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                <motion.h1
                  key={activeContent.heading1}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-2xl text-center"
                >
                  {activeContent.heading1} <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400 relative">
                    {activeContent.heading2}
                  </span>
                </motion.h1>
              )}
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
              <div className="relative flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient-x overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
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
export default Hero;
