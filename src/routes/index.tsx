import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import { InteractiveTooltip } from "@/components/ui/interactive-tooltip";
import {
  Sparkles, ArrowRight, ArrowUpRight, Check, Mail, MessageCircle,
  Instagram, Facebook, Linkedin, Youtube, Phone, Send, Star, Shield,
  Zap, BarChart3, Workflow, Globe, Users, Calendar, ChevronDown, Wand2,
  Twitter, Twitch, Figma, Slack, Github, Dribbble
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
      { name: "description", content: "Lumen turns a single prompt into beautifully crafted, omnichannel marketing campaigns â€” orchestrated across email, WhatsApp, Instagram, SMS, LinkedIn and more." },
      { property: "og:title", content: "Lumen â€” The AI Campaign Agent" },
      { property: "og:description", content: "Generate, personalize and publish entire marketing campaigns from a single prompt." },
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
    <h2 className={`font-display text-balance text-4xl leading-[1.05] text-ink md:text-5xl lg:text-6xl ${className}`}>
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

  const nav = ["Product", "Solutions", "Customers", "Pricing", "Resources"];

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
              key={item}
              href="#"
              className="relative rounded-full px-4.5 py-1.5 text-sm text-neutral-300 transition-colors hover:text-white"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span className="relative z-10">{item}</span>
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
          <a href="#" className="hidden rounded-full px-4 py-2 text-sm text-neutral-300 transition hover:text-white sm:inline-block">
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

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);


  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#09090B] pt-32 pb-20">
      
      {/* 3D WebGL Background Layer */}
      <HeroCanvas />

    </section>
  );
}



/* ---------------------------------------------------------------- */
/*  Logos marquee                                                   */
/* ---------------------------------------------------------------- */

function Trusted() {
  const logos = ["Northwave", "Atrium", "LumiÃ¨re", "Halcyon", "Field & Co.", "Stellar", "Marigold", "Verdant"];
  return (
    <section className="mx-auto max-w-[1920px] border-y border-border/60 bg-ivory/40 py-10">
      <div className="container-editorial">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-ink-soft">
          Trusted by marketing teams at category-defining brands
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="font-display text-2xl text-ink-soft/70">{logo}</span>
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
    { name: "Instagram", Icon: Instagram, gradient: "linear-gradient(135deg,#feda77,#f58529,#dd2a7b)" },
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
              A single prompt becomes a{" "}
              <span className="italic text-primary">whole campaign</span>.
            </H2>
          </motion.div>
          <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.18 }} className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Lumen reasons across your brand, your audience and every channel â€”
            then drafts the copy, art-directs the creative and schedules the
            send.
          </motion.p>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Prompt */}
          <motion.div {...fadeUp} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="text-xs uppercase tracking-[0.16em] text-ink-soft">Your prompt</div>
            <p className="mt-3 font-display text-2xl leading-snug text-ink">
              â€œLaunch our autumn capsule. Editorial tone, warm visuals, drive
              try-on bookings across all our channels.â€
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> 1 prompt
            </div>
          </motion.div>

          {/* Brain */}
          <motion.div {...fadeUp} transition={{ duration: 0.9, delay: 0.1 }} className="relative mx-auto h-80 w-80 md:h-96 md:w-96">
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
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="text-xs uppercase tracking-[0.16em] text-ink-soft">Generated outputs</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {channels.map((c) => (
                <div key={c.name} className="flex items-center gap-2.5 rounded-xl border border-border bg-ivory/50 px-3 py-2.5">
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
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="order-1 max-w-lg lg:order-2">
          <SectionLabel>Publishing workspace</SectionLabel>
          <H2 className="mt-5">
            One canvas to schedule{" "}
            <span className="italic">every</span> channel.
          </H2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Plan your week visually. Drag a campaign across email, WhatsApp,
            Instagram and SMS â€” Lumen handles the channel-specific formatting,
            timing and audience splits automatically.
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
          <a href="#" className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Tour the workspace <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            <H2 className="mt-5 max-w-2xl">
              Less tooling. More taste.
            </H2>
          </motion.div>
          <motion.a {...fadeUp} href="#" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink">
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
            Every send, learned from.{" "}
            <span className="italic">Every result, explained.</span>
          </H2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Beautiful, opinionated dashboards surface what's working â€” and
            Lumen writes the narrative so anyone on the team can act on it
            within minutes.
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
        <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }} className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-luxe">
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
  const quotes = [
    {
      q: "Lumen is the first marketing tool that feels like a thoughtful colleague rather than another dashboard.",
      n: "Maya Chen", r: "VP Marketing, Northwave",
    },
    {
      q: "We shipped a five-channel holiday campaign in an afternoon. The copy was on-brand on the first draft.",
      n: "Daniel Okafor", r: "Head of Growth, Atrium",
    },
    {
      q: "It quietly replaced four tools we were paying for â€” and the analytics are easier to read.",
      n: "Elena Ruiz", r: "CMO, LumiÃ¨re",
    },
  ];
  return (
    <section className="mx-auto max-w-[1920px] py-24 md:py-32">
      <div className="container-editorial">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Customer stories</SectionLabel>
          <H2 className="mt-5">Loved by teams who care about craft.</H2>
        </motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.n}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              <blockquote className="font-display text-xl leading-snug text-ink">
                â€œ{q.q}â€
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-peach to-peach-deep" />
                <div>
                  <div className="text-sm font-medium text-ink">{q.n}</div>
                  <div className="text-xs text-ink-soft">{q.r}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Security                                                        */
/* ---------------------------------------------------------------- */

function Security() {
  const items = [
    { Icon: Shield, t: "SOC 2 Type II", d: "Independently audited security controls and processes." },
    { Icon: Globe, t: "GDPR & CCPA", d: "Built with privacy regulations in mind from day one." },
    { Icon: Zap, t: "99.99% uptime", d: "Enterprise-grade infrastructure across global regions." },
  ];
  return (
    <section className="mx-auto max-w-[1920px] bg-ink py-24 text-background md:py-32">
      <div className="container-editorial grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-background/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-background/70">
            <span className="h-1.5 w-1.5 rounded-full bg-peach-deep" /> Enterprise security
          </div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-background text-balance md:text-6xl">
            Quietly serious about{" "}
            <span className="italic text-peach">trust</span>.
          </h2>
        </motion.div>
        <motion.p {...fadeUp} className="text-background/70">
          From Fortune 500 retailers to high-growth startups â€” Lumen meets the
          standards modern enterprises expect, without the bureaucracy.
        </motion.p>
      </div>
      <div className="container-editorial mt-16 grid gap-px overflow-hidden rounded-2xl border border-background/10 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.t} className="bg-ink p-8">
            <it.Icon className="h-6 w-6 text-peach" />
            <h3 className="mt-5 font-display text-2xl text-background">{it.t}</h3>
            <p className="mt-2 text-sm text-background/60">{it.d}</p>
          </div>
        ))}
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
    <section className="mx-auto max-w-[1920px] py-24 md:py-32">
      <div className="container-editorial grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <motion.div {...fadeUp}>
          <SectionLabel>Frequently asked</SectionLabel>
          <H2 className="mt-5">Questions, answered.</H2>
          <p className="mt-5 text-ink-soft">
            Still wondering something specific? Our team is happy to walk your
            stack through a working session.
          </p>
        </motion.div>
        <div className="divide-y divide-border border-y border-border">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={it.q} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.04 }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl text-ink">{it.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-ink-soft">{it.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
    <section className="mx-auto max-w-[1920px] px-4 pb-12">
      <div className="container-editorial relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-peach via-cream to-sky px-6 py-20 text-center md:px-12 md:py-28">
        <div className="absolute inset-0 bg-grain opacity-50" />
        <div className="relative">
          <SectionLabel>Start free Â· No credit card</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-tight text-ink text-balance md:text-7xl">
            Your next campaign is{" "}
            <span className="italic text-primary">one prompt away</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            Join 12,000+ marketing teams making their best work with Lumen.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-background transition hover:bg-ink/90">
              Start generating <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-background/60 px-6 py-3 text-sm font-medium text-ink backdrop-blur transition hover:bg-background">
              Book a demo
            </a>
          </div>
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
    <footer className="border-t border-border bg-ivory/40 px-4 pb-10 pt-20">
      <div className="container-editorial">
        <div className="grid gap-12 md:grid-cols-[1.4fr_3fr]">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-peach-deep text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-2xl text-ink">Lumen</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              The AI campaign agent for marketing teams who care about craft,
              clarity and results.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.t}>
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">{c.t}</div>
                <ul className="mt-4 space-y-2.5">
                  {c.l.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-ink transition hover:text-primary">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-ink-soft md:flex-row md:items-center">
          <p>Â© {new Date().getFullYear()} Lumen Labs, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Security</a>
            <a href="#" className="hover:text-ink">DPA</a>
          </div>
        </div>
      </div>
    </footer>
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
        <Trusted />
        <BrainFlow />
        <PublishingShowcase />
        <Pillars />
        <AnalyticsShowcase />
        <JourneyShowcase />
        <Testimonials />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
