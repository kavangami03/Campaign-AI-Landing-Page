import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { M as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { f as House, i as RefreshCw, p as CircleAlert, s as Compass } from "../_libs/lucide-react.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BURtTY_5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CWdoMOB3.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#09090b] px-4 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			className: "relative z-10 max-w-lg w-full rounded-3xl bg-[#0f0f13] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex justify-center relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 select-none",
						children: "404"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { rotate: 360 },
						transition: {
							duration: 20,
							repeat: Infinity,
							ease: "linear"
						},
						className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/20 pointer-events-none z-[-1]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-32 h-32" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-white mb-3 tracking-tight",
					children: "Lost in the void."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-neutral-400 text-sm leading-relaxed mb-8",
					children: "The coordinates you entered don't match any known sectors. Let's get you back on track to scaling your revenue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.3)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-4 h-4" }), "Return to Command Center"]
				})
			]
		})]
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#09090b] px-4 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			className: "relative z-10 max-w-lg w-full rounded-3xl bg-[#0f0f13] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-10 h-10 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(239,68,68,0.2)] animate-pulse" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-bold text-white mb-3 tracking-tight",
							children: "System Overload"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-neutral-400 text-sm leading-relaxed mb-8",
							children: "Our AI agents encountered an unexpected anomaly. We've logged the error, but you can try rebooting the sequence or returning to the command center."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									router.invalidate();
									reset();
								},
								className: "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4" }), "Reboot Sequence"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#121217] border border-white/10 text-white font-semibold hover:bg-[#1a1a24] hover:border-white/20 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-4 h-4 text-neutral-400" }), "Command Center"]
							})]
						})
					]
				})
			]
		})]
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lumen — The AI Campaign Agent for Modern Marketing Teams" },
			{
				name: "description",
				content: "Lumen turns a single prompt into beautifully crafted campaigns across email, WhatsApp, Instagram, SMS and more — orchestrated, personalized, and measurable."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Lumen"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:title",
				content: "Lumen — The AI Campaign Agent for Modern Marketing Teams"
			},
			{
				name: "twitter:title",
				content: "Lumen — The AI Campaign Agent for Modern Marketing Teams"
			},
			{
				property: "og:description",
				content: "Lumen turns a single prompt into beautifully crafted campaigns across email, WhatsApp, Instagram, SMS and more — orchestrated, personalized, and measurable."
			},
			{
				name: "twitter:description",
				content: "Lumen turns a single prompt into beautifully crafted campaigns across email, WhatsApp, Instagram, SMS and more — orchestrated, personalized, and measurable."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ff8f4-df7a-45a3-a99d-9c12caf33b67/id-preview-8b4320ce--b6634a03-dd9a-4ee2-aa18-c4d7c396ce02.lovable.app-1782386061855.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ff8f4-df7a-45a3-a99d-9c12caf33b67/id-preview-8b4320ce--b6634a03-dd9a-4ee2-aa18-c4d7c396ce02.lovable.app-1782386061855.png"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	(0, import_react.useEffect)(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2
		});
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => {
			lenis.destroy();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter = () => import("./routes-BLRPobaO.mjs");
gsapWithCSS.registerPlugin(ScrollTrigger);
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Lumen â€” The AI Campaign Agent for Modern Marketing Teams" },
			{
				name: "description",
				content: "Lumen turns a single prompt into beautifully crafted, omnichannel marketing campaigns â€” orchestrated across email, WhatsApp, Instagram, SMS, LinkedIn and more."
			},
			{
				property: "og:title",
				content: "Lumen â€” The AI Campaign Agent"
			},
			{
				property: "og:description",
				content: "Generate, personalize and publish entire marketing campaigns from a single prompt."
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
