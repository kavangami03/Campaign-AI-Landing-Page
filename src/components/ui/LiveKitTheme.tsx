import { useEffect } from "react";

/**
 * Themes the LiveKit embed widget to match the site's dark palette.
 *
 * The widget renders inside an open shadow root, so page-level CSS cannot reach
 * it — we inject a stylesheet into that shadow root instead.
 *
 * It uses two separate token systems, each with its own required syntax:
 *   --lk-color-*  consumed as oklch(var(--x)) -> bare "L C H" components
 *   --background, --foreground, ... consumed as rgb(var(--x)) -> "R% G% B%" triplets
 * Values must be unwrapped components, not full color functions, or the
 * surrounding oklch()/rgb() call becomes invalid and the rule is dropped.
 */
const THEME_CSS = `
  [data-lk-theme] {
    /* shadcn-style tokens, as rgb() percentage triplets */
    --background: 3.5% 3.5% 4.3%;      /* #09090b */
    --foreground: 100% 100% 100%;
    --card: 9.4% 9.4% 10.6%;           /* #18181b */
    --card-foreground: 100% 100% 100%;
    --popover: 9.4% 9.4% 10.6%;
    --popover-foreground: 100% 100% 100%;
    --primary: 66% 33% 97%;            /* #a855f7 */
    --primary-foreground: 100% 100% 100%;
    --secondary: 15.3% 15.3% 16.5%;    /* #27272a */
    --secondary-foreground: 100% 100% 100%;
    --muted: 15.3% 15.3% 16.5%;
    --muted-foreground: 63% 63% 67%;   /* #a1a1aa */
    --accent: 15.3% 15.3% 16.5%;
    --accent-foreground: 100% 100% 100%;
    --border: 15.3% 15.3% 16.5%;
    --input: 15.3% 15.3% 16.5%;
    --ring: 66% 33% 97%;

    /* LiveKit tokens, as bare oklch components */
    --lk-color-bg0: 0.141 0.005 285.8;
    --lk-color-bg1: 0.179 0.005 285.9;
    --lk-color-bg2: 0.225 0.006 285.9;
    --lk-color-bg3: 0.274 0.006 286.0;
    --lk-color-fg0: 1 0 0;
    --lk-color-fg1: 1 0 0;
    --lk-color-fg2: 0.712 0.013 286.1;
    --lk-color-fg3: 0.552 0.014 285.9;
    --lk-color-bgAccentPrimary1: 0.627 0.233 303.9;
    --lk-color-bgAccentPrimary2: 0.558 0.244 302.3;
    --lk-color-fgAccentPrimary: 1 0 0;
    --lk-color-separator1: 0.274 0.006 286.0;
    --lk-color-separator2: 0.37 0.013 285.8;

    color-scheme: dark;
  }

  /* Panel: soften the frame against a dark page. */
  [data-lk-theme] section.bg-background {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
  }

  /* Launcher: brand gradient + lift, echoing the site's --shadow-lift. */
  button[aria-label$="agent"] {
    background-image: linear-gradient(140deg, #c084fc 0%, #a855f7 45%, #7c3aed 100%);
    border-color: rgba(255, 255, 255, 0.14) !important;
    box-shadow:
      0 8px 24px -6px rgba(168, 85, 247, 0.55),
      0 2px 8px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
    transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease;
  }
  button[aria-label$="agent"]:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow:
      0 14px 34px -6px rgba(168, 85, 247, 0.7),
      0 4px 12px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.28);
  }
  button[aria-label$="agent"]:active { transform: translateY(0) scale(0.97); }

  @media (prefers-reduced-motion: reduce) {
    button[aria-label$="agent"] { transition: none; }
    button[aria-label$="agent"]:hover { transform: none; }
  }
`;

const HOST_ID = "lk-embed-wrapper";
const MARK = "data-campaignx-theme";

export default function LiveKitTheme() {
  useEffect(() => {
    let done = false;

    const apply = () => {
      const root = document.getElementById(HOST_ID)?.shadowRoot;
      if (!root) return false;

      // The widget hardcodes a theme attribute from its dashboard config;
      // force dark so its own light-mode token block stops winning.
      root.querySelectorAll("[data-lk-theme]").forEach((el) => {
        el.setAttribute("data-lk-theme", "dark");
        el.classList.add("dark");
      });

      if (!root.querySelector(`style[${MARK}]`)) {
        const style = document.createElement("style");
        style.setAttribute(MARK, "");
        style.textContent = THEME_CSS;
        // Appended last so it wins over the widget's own stylesheet.
        root.appendChild(style);
      }
      return true;
    };

    if (apply()) done = true;

    // The widget mounts asynchronously, and re-renders when the panel opens,
    // so keep watching to re-assert the theme attribute.
    const observer = new MutationObserver(() => apply());
    observer.observe(document.body, { childList: true, subtree: true });
    if (!done) apply();

    return () => observer.disconnect();
  }, []);

  return null;
}
