import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { motion } from "motion/react";
import { AlertCircle, RefreshCw, Home, Compass } from "lucide-react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#09090b] px-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full flex flex-col items-center justify-center"
        >
          {/* Massive 404 Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
            <h1 className="text-[15rem] md:text-[25rem] lg:text-[35rem] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.07] to-transparent select-none blur-[2px]">
              404
            </h1>
          </div>
          
          <div className="relative z-10 space-y-8 mt-12 md:mt-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <Compass className="w-4 h-4 text-primary animate-[spin_4s_linear_infinite]" />
              <span className="text-sm font-medium tracking-wide text-neutral-300 uppercase">Sector Not Found</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
              You've drifted into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-orange-400">uncharted space.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mt-6">
              The coordinates you entered don't match any known sectors. Let's get you back on track to scaling your revenue.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-4 relative z-10"
        >
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Return to Base
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
      }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-lg w-full rounded-3xl bg-[#0f0f13] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
        
        <div className="mb-8 flex justify-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(239,68,68,0.2)] animate-pulse" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-white mb-3 tracking-tight">
            System Overload
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
            Our AI agents encountered an unexpected anomaly. We've logged the error, but you can try rebooting the sequence or returning to the command center.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reboot Sequence
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#121217] border border-white/10 text-white font-semibold hover:bg-[#1a1a24] hover:border-white/20 transition-all"
            >
              <Home className="w-4 h-4 text-neutral-400" />
              Command Center
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lumen — The AI Campaign Agent for Modern Marketing Teams" },
      { name: "description", content: "Lumen turns a single prompt into beautifully crafted campaigns across email, WhatsApp, Instagram, SMS and more — orchestrated, personalized, and measurable." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Lumen" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Lumen — The AI Campaign Agent for Modern Marketing Teams" },
      { name: "twitter:title", content: "Lumen — The AI Campaign Agent for Modern Marketing Teams" },
      { property: "og:description", content: "Lumen turns a single prompt into beautifully crafted campaigns across email, WhatsApp, Instagram, SMS and more — orchestrated, personalized, and measurable." },
      { name: "twitter:description", content: "Lumen turns a single prompt into beautifully crafted campaigns across email, WhatsApp, Instagram, SMS and more — orchestrated, personalized, and measurable." },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
