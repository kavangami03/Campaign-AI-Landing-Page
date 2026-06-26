import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
  description: string;
  metric?: string;
  status?: "active" | "connected" | "pending";
}

export function InteractiveTooltip({
  children,
  title,
  description,
  metric,
  status = "connected",
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    connected: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
    pending: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-neutral-900/90 p-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md"
            style={{ pointerEvents: "none" }}
          >
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-neutral-900/95" />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold tracking-wide text-white">
                  {title}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusColors[status]}`} />
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                    {status}
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-neutral-300">
                {description}
              </p>
              {metric && (
                <div className="mt-1 flex items-center justify-between border-t border-white/5 pt-2 text-[10px]">
                  <span className="text-neutral-400">Target Metric</span>
                  <span className="font-semibold text-primary">{metric}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
