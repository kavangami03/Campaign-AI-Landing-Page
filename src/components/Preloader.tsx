import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Simulate loading progress
    let current = 0;
    const interval = setInterval(() => {
      // Ease out the progress (fast at first, slow at end)
      const increment = Math.max(1, (100 - current) * 0.15);
      current += increment;
      
      if (current >= 99.9) {
        current = 100;
        clearInterval(interval);
        
        // Wait a tiny bit at 100% before triggering exit
        setTimeout(() => {
          onComplete();
          document.body.style.overflow = "unset";
        }, 400);
      }
      setProgress(current);
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  // Framer Motion variants for the staggered curtain columns
  const columnVariants = {
    initial: { y: "0%" },
    exit: (i: number) => ({
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut", // Custom cinematic easing
        delay: i * 0.05, // Stagger effect
      },
    }),
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex pointer-events-auto"
      // The root container must have an exit definition to keep AnimatePresence alive
      // until children finish. We just delay its disappearance.
      exit={{ 
        opacity: 0,
        transition: { delay: 1, duration: 0.1 } 
      }}
    >
      {/* 1. The 5 Curtain Columns */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={columnVariants}
          initial="initial"
          exit="exit"
          className="relative h-full flex-1 bg-[#050505] border-r border-white/5 last:border-r-0"
        />
      ))}

      {/* 2. The Typography Mask Layer (Centered over columns) */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.4, ease: "easeOut" } }}
      >
        <div className="relative flex items-center justify-center">
          {/* Base Outline Text */}
          <h1 
            className="text-[15vw] md:text-[12vw] font-black tracking-tighter text-transparent select-none"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
          >
            LUMEN
          </h1>

          {/* Filled Gradient Text acting as clipping mask */}
          <h1 
            className="absolute inset-0 text-[15vw] md:text-[12vw] font-black tracking-tighter select-none bg-gradient-to-tr from-primary via-blue-500 to-orange-500 bg-clip-text text-transparent"
            style={{ 
              clipPath: `inset(${100 - progress}% 0 0 0)`, // Fills from bottom to top
              transition: "clip-path 0.1s linear"
            }}
          >
            LUMEN
          </h1>
        </div>
        
        {/* Progress Counter */}
        <div className="mt-8 font-mono text-sm tracking-widest text-white/50">
          {Math.floor(progress).toString().padStart(3, '0')}%
        </div>
      </motion.div>
    </motion.div>
  );
}
