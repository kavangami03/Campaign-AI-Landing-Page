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
const MIC_SVG =
  "url('data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
      'stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="9" y="2" width="6" height="12" rx="3"/>' +
      '<path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4"/><path d="M8 21h8"/>' +
      '</svg>'
  ) +
  "')";

const THEME_CSS = `
  [data-lk-theme] { --cx-mic: ${MIC_SVG}; }
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

  /* Panel: translucent glass over the page instead of a flat block. */
  [data-lk-theme] section.bg-background {
    /* Near-opaque: enough glass for depth at the edges, but text stays
       readable over the busy gradient hero behind it. */
    background-image: linear-gradient(
      160deg,
      rgba(24, 20, 34, 0.985) 0%,
      rgba(13, 12, 17, 0.99) 55%,
      rgba(10, 9, 14, 0.995) 100%
    ) !important;
    backdrop-filter: blur(30px) saturate(150%);
    -webkit-backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 18px;
    box-shadow:
      0 24px 60px -12px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(168, 85, 247, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.07);
  }

  /* Fall back to an opaque panel where backdrop-filter is unsupported. */
  @supports not (backdrop-filter: blur(1px)) {
    [data-lk-theme] section.bg-background {
      background-color: rgb(14, 13, 18) !important;
    }
  }

  /* The audio visualizer sits on its own opaque plate. */
  [data-lk-theme] section.bg-background div[class*="size-[450px]"] {
    background-color: transparent !important;
  }

  /* Nested .bg-background elements inherit the panel colour and read as
     opaque blobs on glass — make the inner ones transparent instead. */
  [data-lk-theme] section.bg-background .bg-background {
    background-color: transparent !important;
  }

  /* The control bar keeps a faint surface so it stays legible. */
  [data-lk-theme] section.bg-background .bg-background[class*="rounded-"] {
    background-color: rgba(255, 255, 255, 0.06) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* Launcher: swap the stock robot glyph for a clean microphone, drawn as a
     mask so it stays crisp at any DPI and needs no network request. */
  button[aria-label$="agent"] svg {
    display: none;
  }
  /* The launcher paints its colour with absolutely-positioned overlay divs,
     so the glyph must sit above them (z-index) and be centred by the button's
     own box. position:absolute here is safe — it is the ::after that is
     positioned, not the button, whose position:fixed stays intact. */
  button[aria-label$="agent"]::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    width: 21px;
    height: 21px;
    background-color: #fff;
    -webkit-mask: var(--cx-mic) center / contain no-repeat;
    mask: var(--cx-mic) center / contain no-repeat;
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

  /* End-call button: keep it red but on-theme, not stock crimson. */
  [data-lk-theme] button[aria-label*="isconnect"],
  [data-lk-theme] button[aria-label*="End"] {
    background-image: linear-gradient(140deg, #f87171 0%, #ef4444 100%);
    border-color: rgba(255, 255, 255, 0.14) !important;
    box-shadow: 0 6px 18px -4px rgba(239, 68, 68, 0.5);
  }

  /* Transcript surface + message bubbles. */
  [data-lk-theme] [class*="overflow-y-"] {
    scrollbar-width: thin;
    scrollbar-color: rgba(168, 85, 247, 0.4) transparent;
  }
  [data-lk-theme] [class*="overflow-y-"]::-webkit-scrollbar { width: 6px; }
  [data-lk-theme] [class*="overflow-y-"]::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.4);
    border-radius: 999px;
  }

  /* Chat input: readable on glass. */
  [data-lk-theme] input,
  [data-lk-theme] textarea {
    background-color: rgba(255, 255, 255, 0.05) !important;
    color: #fff !important;
  }
  [data-lk-theme] input::placeholder,
  [data-lk-theme] textarea::placeholder {
    color: rgba(255, 255, 255, 0.42) !important;
  }

  /* ---- Transcript ---------------------------------------------------- */

  /* The visualizer sits on a z-50 layer above the transcript, so it lands on
     top of the messages. Once there is a conversation it is decorative — drop
     it behind the text and fade it back. */
  [data-lk-theme] section.bg-background > div[class*="z-50"]:has(div[class*="size-[450px]"]) {
    z-index: 0 !important;
    opacity: 0.5;
    pointer-events: none;
  }
  [data-lk-theme] div[class*="size-[450px]"] {
    background-color: transparent !important;
  }

  /* Messages need to scroll; the widget ships overflow-y-hidden. */
  [data-lk-theme] [class*="overflow-y-hidden"] {
    overflow-y: auto !important;
  }

  /* Give the transcript room to breathe. */
  [data-lk-theme] .is-assistant,
  [data-lk-theme] .is-user {
    max-width: 88% !important;
  }

  /* Speech bubbles. The widget exposes .is-user / .is-assistant per row. */
  [data-lk-theme] .is-assistant > div,
  [data-lk-theme] .is-user > div {
    padding: 10px 14px;
    border-radius: 18px;
    font-size: 13.5px;
    line-height: 1.5;
    letter-spacing: 0.005em;
  }
  [data-lk-theme] .is-assistant > div {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom-left-radius: 6px;
    color: rgba(255, 255, 255, 0.94);
  }
  [data-lk-theme] .is-user > div {
    background: linear-gradient(140deg, #a855f7 0%, #7c3aed 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-bottom-right-radius: 6px;
    color: #fff;
    box-shadow: 0 4px 14px -4px rgba(168, 85, 247, 0.5);
  }

  /* ---- Composer ------------------------------------------------------ */

  /* Lighten the heavy slab around the input. */
  [data-lk-theme] div[class*="rounded-[31px]"] {
    background: rgba(255, 255, 255, 0.04) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 22px !important;
    padding: 10px !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  [data-lk-theme] div[class*="rounded-[31px]"] > div:first-child {
    border-bottom-color: rgba(255, 255, 255, 0.08) !important;
  }

  /* ---- Visualizer ---------------------------------------------------- */

  /* The idle visualizer plate is a flat grey box; make it a soft brand-tinted
     halo instead so the empty state does not look broken. */
  [data-lk-theme] div[class*="size-[450px]"] {
    background-image: radial-gradient(
      circle at 50% 50%,
      rgba(168, 85, 247, 0.16) 0%,
      rgba(168, 85, 247, 0.05) 45%,
      transparent 70%
    ) !important;
    border-radius: 999px !important;
    border: none !important;
  }

  /* The bars idle at 10% opacity (bg-current/10) and brighten while the agent
     speaks. Raise the idle floor so the resting state still reads as alive,
     and let the widget's own opacity animation ride on top. */
  [data-lk-theme] div[class*="size-[450px]"] > * {
    background-image: linear-gradient(180deg, #c084fc 0%, #a855f7 100%) !important;
    border-radius: 999px !important;
    opacity: 0.85;
    box-shadow: 0 0 12px -2px rgba(168, 85, 247, 0.55);
  }

  /* ---- Control bar --------------------------------------------------- */

  /* Round the mic/transcript cluster and lift it off the panel. */
  [data-lk-theme] div[class*="rounded-[31px]"] > div:last-child button,
  [data-lk-theme] div[class*="rounded-[31px]"] > div:last-child [class*="rounded-full"] {
    transition: transform 160ms ease, background-color 160ms ease;
  }
  [data-lk-theme] div[class*="rounded-[31px]"] > div:last-child button:hover {
    transform: translateY(-1px);
  }

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
    let openedTranscript = false;

    const apply = () => {
      const root = document.getElementById(HOST_ID)?.shadowRoot;
      if (!root) return false;

      // The widget hardcodes a theme attribute from its dashboard config;
      // force dark so its own light-mode token block stops winning.
      root.querySelectorAll("[data-lk-theme]").forEach((el) => {
        el.setAttribute("data-lk-theme", "dark");
        el.classList.add("dark");
      });

      // The transcript panel defaults to collapsed, which leaves the popup
      // looking empty. Open it once per session so the conversation is visible.
      if (!openedTranscript) {
        const toggle = root.querySelector(
          'button[aria-label*="transcript" i][data-state="off"]'
        );
        if (toggle instanceof HTMLElement) {
          toggle.click();
          openedTranscript = true;
        }
      }

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
