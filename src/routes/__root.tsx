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
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-lg w-full rounded-3xl bg-[#0f0f13] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500" />
        
        <div className="mb-8 flex justify-center relative">
          <h1 className="text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 select-none">
            404
          </h1>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/20 pointer-events-none z-[-1]"
          >
            <Compass className="w-32 h-32" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Lost in the void.</h2>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8">
          The coordinates you entered don't match any known sectors. Let's get you back on track to scaling your revenue.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <Home className="w-4 h-4" />
          Return to Command Center
        </Link>
      </motion.div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
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
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ff8f4-df7a-45a3-a99d-9c12caf33b67/id-preview-8b4320ce--b6634a03-dd9a-4ee2-aa18-c4d7c396ce02.lovable.app-1782386061855.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ff8f4-df7a-45a3-a99d-9c12caf33b67/id-preview-8b4320ce--b6634a03-dd9a-4ee2-aa18-c4d7c396ce02.lovable.app-1782386061855.png" },
    ],
    links: [
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
