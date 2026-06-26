import React from "react";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 mb-6">
      <span className="text-sm font-medium tracking-wide text-primary uppercase">
        {children}
      </span>
    </div>
  );
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 ${className}`}>
      {children}
    </h2>
  );
}
