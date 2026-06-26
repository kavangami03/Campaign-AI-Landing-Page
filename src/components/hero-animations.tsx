import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

/* ------------------------------------------------------------ */
/*  Magnetic button — pulls toward cursor on hover              */
/* ------------------------------------------------------------ */

export function MagneticButton({
  children,
  className = "",
  href = "#",
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(ref.current, { x: dx, y: dy, duration: 0.4, ease: "power3.out" });
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={(e) => onMove(e.nativeEvent)}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------ */
/*  Split text reveal — GSAP char-by-char animation             */
/* ------------------------------------------------------------ */

export function SplitTextReveal({
  children,
  className = "",
  delay = 0,
  tag: Tag = "span",
}: {
  children: string;
  className?: string;
  delay?: number;
  tag?: keyof JSX.IntrinsicElements;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".split-char");
    gsap.set(chars, { opacity: 0, y: 60, rotateX: -40 });
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.02,
      delay,
      ease: "power4.out",
    });
  }, [delay]);

  const words = children.split(" ");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={{ perspective: "600px" }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              className="split-char inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------ */
/*  Counter animation — counts up to a number                   */
/* ------------------------------------------------------------ */

export function AnimatedCounter({
  value,
  suffix = "",
  className = "",
  duration = 2,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration,
            delay,
            ease: "power2.out",
            onUpdate: () => {
              if (ref.current) {
                ref.current.textContent =
                  (value >= 1000000
                    ? (obj.val / 1000000).toFixed(1) + "M"
                    : value >= 1000
                      ? Math.round(obj.val).toLocaleString()
                      : obj.val.toFixed(1)) + suffix;
              }
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, suffix, duration, delay]);

  return <span ref={ref} className={className}>0</span>;
}
