import { o as __toESM } from "../_runtime.mjs";
import { i as Vector2, n as useFrame, o as require_jsx_runtime, r as useThree, s as require_react, t as Canvas } from "../_libs/@react-three/fiber+[...].mjs";
import { n as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as Mail, c as ChevronDown, d as Sparkles, l as Check, n as Workflow, o as Globe, r as Send, t as Zap, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journey-builder-DURf-2ME.js
var ai_brain_default = "/assets/ai-brain-DXEuV1bS.jpg";
var publishing_workspace_default = "/assets/publishing-workspace-73rgsdL3.jpg";
var analytics_default = "/assets/analytics-BYpejegE.jpg";
var journey_builder_default = "/assets/journey-builder-Bga-oBKB.jpg";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BLRPobaO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var auroraVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
var auroraFragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Simple hash
float hash(float n) { return fract(sin(n) * 43758.5453123); }

// 3D Noise
float noise(in vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0 + 113.0 * p.z;
    return mix(
        mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
            mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
        mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
            mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
}

// FBM
float fbm(vec3 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 4; i++) {
        f += w * noise(p);
        p *= 2.0;
        w *= 0.5;
    }
    return f;
}

void main() {
    // Normalize coordinates based on resolution
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    float t = uTime * 0.15;
    
    vec3 color = vec3(0.0);
    
    // Ribbon 1 (Purple)
    float wave1 = sin(uv.x * 2.0 + t) * 0.5 + 0.5;
    float ribbon1 = 1.0 - abs(uv.y - 0.5 + wave1 * 0.2 + fbm(vec3(uv * 3.0, t)) * 0.2);
    ribbon1 = pow(max(0.0, ribbon1), 6.0);
    color += vec3(0.6, 0.2, 0.9) * ribbon1;

    // Ribbon 2 (Blue)
    float wave2 = cos(uv.x * 1.5 - t * 1.2) * 0.5 + 0.5;
    float ribbon2 = 1.0 - abs(uv.y - 0.4 + wave2 * 0.3 + fbm(vec3(uv * 2.0, t * 1.5)) * 0.15);
    ribbon2 = pow(max(0.0, ribbon2), 8.0);
    color += vec3(0.2, 0.4, 1.0) * ribbon2;

    // Ribbon 3 (Orange/Pink)
    float wave3 = sin(uv.x * 3.0 + t * 0.8) * 0.5 + 0.5;
    float ribbon3 = 1.0 - abs(uv.y - 0.6 + wave3 * 0.1 + fbm(vec3(uv * 4.0, t * 0.5)) * 0.25);
    ribbon3 = pow(max(0.0, ribbon3), 10.0);
    color += vec3(0.9, 0.4, 0.2) * ribbon3;

    // Soft volumetric blend
    float alpha = max(max(color.r, color.g), color.b);
    
    // Fade top and bottom
    alpha *= smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);

    gl_FragColor = vec4(color, alpha * 0.6);
}
`;
function AuroraPlane() {
	const materialRef = (0, import_react.useRef)(null);
	const size = useThree((state) => state.size);
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uResolution: { value: new Vector2(size.width, size.height) }
	}), []);
	(0, import_react.useEffect)(() => {
		if (materialRef.current) materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
	}, [size]);
	useFrame((state) => {
		if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			0,
			-5
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [40, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			ref: materialRef,
			vertexShader: auroraVertexShader,
			fragmentShader: auroraFragmentShader,
			uniforms,
			transparent: true,
			depthWrite: false,
			blending: 2
		})]
	});
}
function Particles() {
	const pointsRef = (0, import_react.useRef)(null);
	const count = 2e3;
	const [positions, speeds] = (0, import_react.useMemo)(() => {
		const pos = new Float32Array(count * 3);
		const spd = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			pos[i * 3] = (Math.random() - .5) * 40;
			pos[i * 3 + 1] = (Math.random() - .5) * 20;
			pos[i * 3 + 2] = (Math.random() - .5) * 20 - 5;
			spd[i] = .01 + Math.random() * .03;
		}
		return [pos, spd];
	}, []);
	useFrame((state) => {
		if (!pointsRef.current) return;
		const t = state.clock.getElapsedTime();
		pointsRef.current.rotation.y = t * .02;
		const pos = pointsRef.current.geometry.attributes.position.array;
		for (let i = 0; i < count; i++) {
			pos[i * 3 + 1] += speeds[i];
			if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
		}
		pointsRef.current.geometry.attributes.position.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref: pointsRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			count,
			array: positions,
			itemSize: 3
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			size: .03,
			color: "#a855f7",
			transparent: true,
			opacity: .15,
			depthWrite: false,
			blending: 2
		})]
	});
}
function HeroCanvas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-0 h-full w-full bg-[#09090B]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 opacity-40 mix-blend-screen",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[20%] left-[30%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[40%] right-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[10%] left-[50%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[100px]" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none opacity-40 mix-blend-overlay" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none",
				style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E\")" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
				camera: {
					position: [
						0,
						0,
						6
					],
					fov: 45
				},
				dpr: [1, 1.5],
				gl: {
					antialias: true,
					alpha: true
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraPlane, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {})]
			})
		]
	});
}
function MagneticButton({ children, className = "", href = "#", strength = .35 }) {
	const ref = (0, import_react.useRef)(null);
	const onMove = (0, import_react.useCallback)((e) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = (e.clientX - cx) * strength;
		const dy = (e.clientY - cy) * strength;
		gsapWithCSS.to(ref.current, {
			x: dx,
			y: dy,
			duration: .4,
			ease: "power3.out"
		});
	}, [strength]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		ref,
		href,
		className,
		onMouseMove: (e) => onMove(e.nativeEvent),
		onMouseLeave: (0, import_react.useCallback)(() => {
			if (!ref.current) return;
			gsapWithCSS.to(ref.current, {
				x: 0,
				y: 0,
				duration: .6,
				ease: "elastic.out(1, 0.3)"
			});
		}, []),
		children
	});
}
var fadeUp = {
	initial: {
		opacity: 0,
		y: 24
	},
	whileInView: {
		opacity: 1,
		y: 0
	},
	viewport: {
		once: true,
		margin: "-80px"
	},
	transition: {
		duration: .7,
		ease: [
			.22,
			1,
			.36,
			1
		]
	}
};
function Header() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [hoveredIdx, setHoveredIdx] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6 header-reveal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${scrolled ? "border-white/10 bg-black/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl" : "border-transparent bg-transparent"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "flex items-center gap-2 pl-3 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-blue-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-transform duration-500 group-hover:rotate-180",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl tracking-tight text-white",
						children: "Lumen"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: [
						"Product",
						"Solutions",
						"Customers",
						"Pricing",
						"Resources"
					].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#",
						className: "relative rounded-full px-4.5 py-1.5 text-sm text-neutral-300 transition-colors hover:text-white",
						onMouseEnter: () => setHoveredIdx(i),
						onMouseLeave: () => setHoveredIdx(null),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10",
							children: item
						}), hoveredIdx === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							layoutId: "header-nav-pill",
							className: "absolute inset-0 z-0 rounded-full bg-white/10",
							transition: {
								type: "spring",
								stiffness: 320,
								damping: 25
							}
						})]
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hidden rounded-full px-4 py-2 text-sm text-neutral-300 transition hover:text-white sm:inline-block",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
						href: "#",
						strength: .2,
						className: "group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 border border-white/10",
						children: ["Start free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" })]
					})]
				})
			]
		})
	});
}
var defaultContent = {
	tag: "Next-Gen AI Marketing",
	heading1: "Launch Campaigns",
	heading2: "That Think Before You Do",
	description: "Generate complete marketing campaigns powered by AI. From strategy to creatives, copy, targeting and optimization—all in one intelligent workspace."
};
var scatteredIcons = [
	{
		name: "Facebook",
		src: "/images/facebook.svg",
		color: "#1877F2",
		top: "12%",
		left: "18%",
		depth: 1.5,
		rotate: -15,
		scale: 1,
		content: {
			tag: "Facebook Ads Automation",
			heading1: "Dominate the Feed",
			heading2: "With Smart Meta Ads",
			description: "Automatically test hundreds of creatives and copy variations to find the perfect winning combination for your Facebook audience."
		}
	},
	{
		name: "WhatsApp",
		src: "/images/whatsapp.svg",
		color: "#25D366",
		top: "28%",
		left: "12%",
		depth: .8,
		rotate: 10,
		scale: .8,
		content: {
			tag: "Direct Messaging",
			heading1: "Personalized Chats",
			heading2: "That Drive Instant Sales",
			description: "Deploy conversational AI marketing straight to their inbox with automated follow-ups and frictionless checkout flows."
		}
	},
	{
		name: "LinkedIn",
		src: "/images/linkedin.svg",
		color: "#0A66C2",
		top: "55%",
		left: "23%",
		depth: 2.2,
		rotate: -5,
		scale: 1.1,
		content: {
			tag: "B2B Lead Generation",
			heading1: "Target Professionals",
			heading2: "With Absolute Precision",
			description: "Launch high-ticket B2B outreach and tailored ad funnels that speak directly to decision makers."
		}
	},
	{
		name: "RCS",
		src: "/images/RCS.svg",
		color: "#673AB7",
		top: "72%",
		left: "12%",
		depth: 1.2,
		rotate: 20,
		scale: .9,
		content: {
			tag: "Rich Communication",
			heading1: "Interactive Texts",
			heading2: "Beyond Standard SMS",
			description: "Engage your audience with rich-media messages, interactive carousels, and instant actions right inside their native messaging app."
		}
	},
	{
		name: "Voice",
		src: "/images/voice.svg",
		color: "#10B981",
		top: "90%",
		left: "22%",
		depth: .6,
		rotate: -10,
		scale: .85,
		content: {
			tag: "Voice AI",
			heading1: "Human-Like Calls",
			heading2: "Fully Automated Outreach",
			description: "Deploy conversational voice agents that sound completely natural to qualify leads and book appointments 24/7."
		}
	},
	{
		name: "Instagram",
		src: "/images/instagram.svg",
		color: "#E4405F",
		top: "10%",
		left: "78%",
		depth: 1.8,
		rotate: 12,
		scale: 1.1,
		content: {
			tag: "Visual Storytelling",
			heading1: "Convert Followers",
			heading2: "Into Loyal Customers",
			description: "Automated reels, stories, and stunning image ads generated and optimized entirely by artificial intelligence."
		}
	},
	{
		name: "Twitter",
		src: "/images/twitter.svg",
		color: "#1DA1F2",
		top: "35%",
		left: "80%",
		depth: .9,
		rotate: -8,
		scale: .9,
		content: {
			tag: "Real-time Engagement",
			heading1: "Join the Conversation",
			heading2: "At the Speed of Culture",
			description: "Capitalize on trending topics with rapid, automated ad deployment and intelligent tweet sequencing."
		}
	},
	{
		name: "Gmail",
		src: "/images/gmail.svg",
		color: "#EA4335",
		top: "52%",
		left: "86%",
		depth: 2.5,
		rotate: 15,
		scale: 1,
		content: {
			tag: "Email Campaigns",
			heading1: "Inboxes Await",
			heading2: "High-Converting Outreach",
			description: "Launch AI-crafted email sequences, newsletters, and automated follow-ups that guarantee incredible open rates."
		}
	},
	{
		name: "Messages",
		src: "/images/messages.svg",
		color: "#4285F4",
		top: "70%",
		left: "75%",
		depth: 1.1,
		rotate: -12,
		scale: .8,
		content: {
			tag: "SMS Marketing",
			heading1: "Instant Delivery",
			heading2: "Highest Open Rates",
			description: "Send targeted text blasts and personalized promotions directly to their mobile devices automatically."
		}
	},
	{
		name: "Comment",
		src: "/images/comment.svg",
		color: "#FBBF24",
		top: "88%",
		left: "86%",
		depth: 1.6,
		rotate: 8,
		scale: 1.05,
		content: {
			tag: "Community Management",
			heading1: "Engage Audiences",
			heading2: "With Smart AI Replies",
			description: "Automated comment moderation, intelligent replies, and AI-driven community building to keep your brand's voice active."
		}
	}
];
var FloatingIcon = ({ icon, i, hoveredIcon, setHoveredIcon, handleIconClick }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "absolute hidden lg:block z-30",
		style: {
			top: icon.top,
			left: icon.left,
			scale: icon.scale
		},
		initial: {
			opacity: 0,
			scale: 0
		},
		animate: {
			opacity: 1,
			scale: icon.scale
		},
		transition: {
			duration: 1,
			delay: i * .1
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: {
				y: [
					0,
					-15,
					0
				],
				rotate: [
					icon.rotate,
					icon.rotate + 5,
					icon.rotate
				]
			},
			transition: {
				duration: 4 + icon.depth,
				repeat: Infinity,
				ease: "easeInOut",
				delay: i * .2
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				whileHover: {
					scale: 1.25,
					rotate: 0
				},
				transition: { duration: .4 },
				whileTap: { scale: .9 },
				onHoverStart: () => setHoveredIcon({
					name: icon.name,
					color: icon.color
				}),
				onHoverEnd: () => setHoveredIcon(null),
				onClick: (e) => handleIconClick(e, icon),
				className: "flex items-center justify-center cursor-pointer relative group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: icon.src,
					alt: icon.name,
					className: "h-12 w-12 md:h-14 md:w-14 object-contain drop-shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity relative z-10"
				})
			})
		})
	});
};
function Hero() {
	const containerRef = (0, import_react.useRef)(null);
	const [hoveredIcon, setHoveredIcon] = (0, import_react.useState)(null);
	const [clickedIcon, setClickedIcon] = (0, import_react.useState)(null);
	const [activeContent, setActiveContent] = (0, import_react.useState)(defaultContent);
	const handleIconClick = (e, icon) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setClickedIcon({
			name: icon.name,
			color: icon.color,
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		});
		setTimeout(() => setClickedIcon(null), 1e3);
		setActiveContent(icon.content);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: containerRef,
		className: "relative min-h-screen w-full overflow-hidden bg-[#09090B] pt-32 pb-20 flex items-center justify-center perspective-1000",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: clickedIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: .8,
					scale: 0
				},
				animate: {
					opacity: 0,
					scale: 50
				},
				exit: { opacity: 0 },
				transition: {
					duration: 1,
					ease: "easeOut"
				},
				className: "fixed rounded-full pointer-events-none z-50 mix-blend-screen",
				style: {
					left: clickedIcon.x,
					top: clickedIcon.y,
					width: "100px",
					height: "100px",
					marginLeft: "-50px",
					marginTop: "-50px",
					backgroundColor: clickedIcon.color,
					boxShadow: `0 0 50px ${clickedIcon.color}`
				}
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container mx-auto flex max-w-[1920px] items-center justify-between px-6 lg:px-12 xl:px-24 relative z-10 w-full",
				children: [scatteredIcons.map((icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
					icon,
					i,
					hoveredIcon,
					setHoveredIcon,
					handleIconClick
				}, icon.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col items-center text-center max-w-4xl mx-auto px-4 z-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									scale: .9,
									y: 10
								},
								animate: {
									opacity: 1,
									scale: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									scale: .9,
									y: -10
								},
								transition: { duration: .4 },
								className: "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: { x: [
										"-150%",
										"150%",
										"-150%"
									] },
									transition: {
										duration: 4,
										repeat: Infinity,
										ease: "linear"
									},
									className: "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative z-10 text-sm font-bold uppercase tracking-widest text-primary drop-shadow-sm",
									children: activeContent.tag
								})]
							}, activeContent.tag)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center min-h-[160px] md:min-h-[200px] lg:min-h-[220px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
									initial: {
										opacity: 0,
										y: 20
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: -20
									},
									transition: { duration: .4 },
									className: "font-display text-5xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-2xl",
									children: [
										activeContent.heading1,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden md:block" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400 relative",
											children: activeContent.heading2
										})
									]
								}, activeContent.heading1)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-start justify-center min-h-[120px] md:min-h-[100px] w-full mt-6 md:mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: {
										opacity: 0,
										y: 15
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: -15
									},
									transition: { duration: .4 },
									className: "text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-light drop-shadow-md",
									children: activeContent.description
								}, activeContent.description)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								delay: .6
							},
							className: "mt-12 flex flex-wrap items-center justify-center gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "relative group cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition duration-500 group-hover:duration-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-700 ease-out overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative z-10 drop-shadow-md tracking-wide",
											children: "Generate My Campaign"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" })
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "relative group overflow-hidden rounded-full p-[1px] cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(168,85,247,0.5)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center gap-2 rounded-full bg-[#09090b] px-8 py-4 text-base font-bold text-white transition-all group-hover:bg-[#121217] overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative z-10 tracking-wide text-neutral-300 group-hover:text-white transition-colors",
										children: "Watch Demo"
									})]
								})]
							})]
						})
					]
				})]
			})
		]
	});
}
function MassiveFeatureGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-[#09090B] py-32 px-4 md:px-6 relative z-20 border-t border-white/5 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 -left-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center mb-20 md:mb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { x: [
								"-150%",
								"150%",
								"-150%"
							] },
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm",
							children: "EVERYTHING YOU NEED"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white max-w-3xl leading-[1.1] tracking-tight",
						children: [
							"An entire marketing team ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden md:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif italic text-primary font-normal",
								children: "working at the speed of thought."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-neutral-400 max-w-xl text-base md:text-lg",
						children: "From zero to launch in seconds. Generate creatives, manage interactions, and track revenue automatically across every channel."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "lg:col-span-2 rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[350px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: publishing_workspace_default,
								alt: "Workspace",
								className: "w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 mix-blend-lighten"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/80 to-transparent" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md mb-4 border border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "w-3.5 h-3.5 text-primary" }), "AI Campaign Engine"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl md:text-3xl font-display font-medium text-white mb-2",
									children: "Full Campaign Generation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-neutral-400 text-sm md:text-base max-w-lg",
									children: "Targeting, copy, and creatives generated instantly from a single prompt before the campaign goes live."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .1 },
						className: "rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full h-[160px] bg-white/5 rounded-2xl mb-8 border border-white/10 p-4 relative overflow-hidden flex flex-col gap-3 group-hover:scale-[1.02] transition-transform duration-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/2 bg-white/20 rounded-md mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-full bg-white/10 rounded-md" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-full bg-white/10 rounded-md" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-full bg-primary/20 border border-primary/30 rounded-md mt-auto flex items-center justify-center text-primary text-xs font-bold",
									children: "Submit Form"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl md:text-2xl font-display font-medium text-white mb-2",
								children: "Lead Generation Funnels"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-neutral-400 text-sm",
								children: "Deploy high-converting landing pages and dynamic intake forms automatically."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-6 h-6 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl md:text-2xl font-display font-medium text-white mb-2",
								children: "Automated Outreach"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-neutral-400 text-sm",
								children: "Intelligent email sequences and follow-ups that guarantee incredible open rates."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .1 },
						className: "rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30 group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-6 h-6 text-green-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl md:text-2xl font-display font-medium text-white mb-2",
								children: "Cross-Channel Publishing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-neutral-400 text-sm",
								children: "Push your creatives directly to Facebook, Instagram, LinkedIn, and more."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .2 },
						className: "rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center mb-6 border border-orange-500/30 group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-6 h-6 text-orange-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl md:text-2xl font-display font-medium text-white mb-2",
								children: "Dynamic A/B Testing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-neutral-400 text-sm",
								children: "Automatically test hundreds of ad variations to find the perfect winning combination."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[300px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 z-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: journey_builder_default,
									alt: "Journey Builder",
									className: "w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 mix-blend-lighten"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/80 to-transparent" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl md:text-3xl font-display font-medium text-white mb-2",
									children: "Visual Workflow Builder"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-neutral-400 text-sm md:text-base max-w-sm",
									children: "Map out complex customer journeys and automated engagement loops with a drag-and-drop canvas."
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative min-h-[300px] flex flex-col justify-end p-8 md:p-10 hover:border-white/20 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 z-0 flex items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: ai_brain_default,
										alt: "AI Reporting",
										className: "w-[120%] h-[120%] object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0f0f13] via-transparent to-[#0f0f13]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/60 to-transparent" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl md:text-3xl font-display font-medium text-white mb-2",
									children: "Deep AI Reasoning"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-neutral-400 text-sm md:text-base max-w-sm",
									children: "Lumen analyzes your brand voice and past performance data to craft the perfect editorial tone."
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl flex flex-col md:flex-row items-center p-8 gap-8 hover:border-white/20 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full md:w-1/2 rounded-2xl overflow-hidden border border-white/10 h-48 relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: analytics_default,
									alt: "Analytics",
									className: "w-full h-full object-cover mix-blend-lighten opacity-80 group-hover:scale-105 transition-transform duration-700"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full md:w-1/2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl md:text-2xl font-display font-medium text-white mb-2",
									children: "Real-time Analytics"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-neutral-400 text-sm",
									children: "Track conversions, click-through rates, and total revenue impact at a single glance."
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl flex flex-col md:flex-row-reverse items-center p-8 gap-8 hover:border-white/20 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full md:w-1/2 rounded-2xl border border-white/10 h-48 bg-white/[0.02] relative overflow-hidden flex items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-16 h-16 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] group-hover:scale-110 transition-transform" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full md:w-1/2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl md:text-2xl font-display font-medium text-white mb-2",
									children: "Global Localization"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-neutral-400 text-sm",
									children: "Automatically translate and adapt your campaigns for international audiences in seconds."
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "lg:col-span-2 rounded-[32px] border border-white/10 bg-[#0f0f13] overflow-hidden group shadow-2xl relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 hover:border-white/20 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full md:w-1/2 z-10 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl md:text-3xl font-display font-medium text-white mb-2",
								children: "Automated Reminders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-neutral-400 text-sm md:text-base",
								children: "Ensure customers show up with perfectly timed, AI-personalized text and email reminders."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full md:w-1/2 relative h-[250px] flex justify-center items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute w-[220px] h-[300px] rounded-3xl bg-[#111116] border-[6px] border-white/5 shadow-2xl flex flex-col p-4 overflow-hidden group-hover:scale-105 transition-transform duration-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-1 bg-white/10 mx-auto rounded-full mb-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "self-start bg-white/10 text-white text-[10px] px-3 py-2 rounded-2xl rounded-tl-sm mb-3",
										children: "Hi! Just a reminder about our event tomorrow at 2 PM."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "self-end bg-primary text-white text-[10px] px-3 py-2 rounded-2xl rounded-tr-sm mb-3",
										children: "Thanks! Will be there."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "self-start bg-white/10 text-white text-[10px] px-3 py-2 rounded-2xl rounded-tl-sm mb-3",
										children: "Perfect. See you soon."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-auto bg-green-500/20 text-green-400 text-xs text-center py-2 rounded-lg font-medium border border-green-500/20",
										children: "Confirmed ✓"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .1 },
						className: "rounded-[32px] border border-white/10 bg-[#0f0f13] p-8 md:p-10 relative overflow-hidden group shadow-2xl flex flex-col hover:border-white/20 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex -space-x-3 mb-8 mt-4 group-hover:scale-110 transition-transform origin-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/images/whatsapp.svg",
											alt: "WA",
											className: "w-full h-full object-contain"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/images/gmail.svg",
											alt: "Gmail",
											className: "w-full h-full object-contain"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2.5 backdrop-blur-md shadow-xl relative z-10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/images/messages.svg",
											alt: "SMS",
											className: "w-full h-full object-contain"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl md:text-2xl font-display font-medium text-white mb-2 mt-auto",
								children: "Campaign Text & Emails"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-neutral-400 text-sm",
								children: "Engage your user base with high-converting, targeted marketing blasts and announcements."
							})
						]
					})
				]
			})]
		})]
	});
}
function Testimonials() {
	const row1 = [
		{
			q: "Lumen is the first marketing tool that feels like a thoughtful colleague rather than another dashboard.",
			n: "Maya Chen",
			r: "VP Marketing, Northwave"
		},
		{
			q: "We shipped a five-channel holiday campaign in an afternoon. The copy was on-brand on the first draft.",
			n: "Daniel Okafor",
			r: "Head of Growth, Atrium"
		},
		{
			q: "It quietly replaced four tools we were paying for — and the analytics are easier to read.",
			n: "Elena Ruiz",
			r: "CMO, Lumière"
		},
		{
			q: "The ROI we've seen in just two months is staggering. It's like having a full agency on retainer.",
			n: "Sarah Jenkins",
			r: "Founder, Bloom"
		}
	];
	const row2 = [
		{
			q: "Our email open rates doubled. Lumen just knows exactly how to speak to our core demographic.",
			n: "Michael Chang",
			r: "Director of CRM, Vibe"
		},
		{
			q: "I was skeptical of AI marketing, but this changed everything. The personalization is unmatched.",
			n: "Jessica Albon",
			r: "Head of Digital, Zenith"
		},
		{
			q: "The sheer volume of high-quality assets we can produce now is unbelievable. A true game changer.",
			n: "David Thorne",
			r: "Creative Director, Nexus"
		},
		{
			q: "Customer acquisition cost dropped by 40% since we let Lumen handle the A/B testing variations.",
			n: "Amanda Clarke",
			r: "Growth Lead, FinTech Plus"
		}
	];
	const duplicatedRow1 = [
		...row1,
		...row1,
		...row1
	];
	const duplicatedRow2 = [
		...row2,
		...row2,
		...row2
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-[#09090B] py-32 relative z-20 overflow-hidden border-t border-white/5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center mb-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { x: [
							"-150%",
							"150%",
							"-150%"
						] },
						transition: {
							duration: 4,
							repeat: Infinity,
							ease: "linear"
						},
						className: "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm",
						children: "WALL OF LOVE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight",
					children: [
						"Loved by teams who care about",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400",
							children: "craft."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col gap-8 overflow-hidden",
				style: {
					maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { x: ["0%", "-33.333333%"] },
						transition: {
							duration: 30,
							ease: "linear",
							repeat: Infinity
						},
						className: "flex gap-8 px-4",
						children: duplicatedRow1.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-[380px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors duration-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-10 -right-10 text-[150px] font-serif leading-none text-white/5 group-hover:text-primary/10 transition-colors duration-500",
									children: "\""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1 mb-6 relative z-10",
									children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-5 h-5 text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]",
										viewBox: "0 0 20 20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "font-display text-lg leading-relaxed text-neutral-300 relative z-10 mb-8",
									children: [
										"\"",
										q.q,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "flex items-center gap-4 relative z-10 mt-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-gradient-to-br from-primary via-blue-500 to-orange-500 p-[2px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full w-full rounded-full bg-[#121217] flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white font-bold text-base",
												children: q.n.charAt(0)
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-base font-bold text-white",
										children: q.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-neutral-400",
										children: q.r
									})] })]
								})
							]
						}, `${q.n}-${i}`))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { x: ["-33.333333%", "0%"] },
						transition: {
							duration: 30,
							ease: "linear",
							repeat: Infinity
						},
						className: "flex gap-8 px-4",
						children: duplicatedRow2.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-[380px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-10 -right-10 text-[150px] font-serif leading-none text-white/5 group-hover:text-blue-500/10 transition-colors duration-500",
									children: "\""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1 mb-6 relative z-10",
									children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-5 h-5 text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]",
										viewBox: "0 0 20 20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "font-display text-lg leading-relaxed text-neutral-300 relative z-10 mb-8",
									children: [
										"\"",
										q.q,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "flex items-center gap-4 relative z-10 mt-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 p-[2px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full w-full rounded-full bg-[#121217] flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white font-bold text-base",
												children: q.n.charAt(0)
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-base font-bold text-white",
										children: q.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-neutral-400",
										children: q.r
									})] })]
								})
							]
						}, `${q.n}-${i}`))
					})
				})]
			})
		]
	});
}
function FAQ() {
	const items = [
		{
			q: "What exactly does Lumen generate from a prompt?",
			a: "Lumen generates campaign strategy, copy, visuals, audience segments, channel-specific variants and a publishing schedule â€” all editable and on-brand."
		},
		{
			q: "Which channels does Lumen support today?",
			a: "Email, WhatsApp, Instagram, Facebook, LinkedIn, YouTube, SMS, RCS and Voice â€” plus webhook integrations into your existing stack."
		},
		{
			q: "How does Lumen learn our brand voice?",
			a: "Connect a website, upload brand guidelines, or paste past campaigns. Lumen builds a private brand model used in every generation."
		},
		{
			q: "Is our data used to train shared models?",
			a: "Never. Your data stays in your workspace, encrypted in transit and at rest. Models trained on your content are isolated to your account."
		},
		{
			q: "Can my team approve drafts before they go live?",
			a: "Yes â€” configurable approval flows, role-based access and a full audit trail for every send."
		}
	];
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-[#09090B] py-24 md:py-32 relative z-20 border-t border-white/5 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 -right-[10%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-[1400px] mx-auto px-4 md:px-6 relative z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-[1fr_1.4fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					...fadeUp,
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { x: [
									"-150%",
									"150%",
									"-150%"
								] },
								transition: {
									duration: 4,
									repeat: Infinity,
									ease: "linear"
								},
								className: "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent skew-x-12"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative z-10 text-xs font-bold uppercase tracking-widest text-blue-400 drop-shadow-sm",
								children: "FREQUENTLY ASKED"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight",
							children: ["Questions, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400",
								children: "answered."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-neutral-400 text-lg",
							children: "Still wondering something specific? Our team is happy to walk your stack through a working session."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4",
					children: items.map((it, i) => {
						const isOpen = open === i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							...fadeUp,
							transition: {
								duration: .5,
								delay: i * .04
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "bg-white/5 border-white/20 shadow-lg" : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpen(isOpen ? null : i),
									className: "flex w-full items-center justify-between gap-6 px-6 py-6 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-display text-lg md:text-xl font-medium transition-colors ${isOpen ? "text-white" : "text-neutral-300"}`,
										children: it.q
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? "bg-blue-500/20 text-blue-400 rotate-180" : "bg-white/5 text-neutral-500"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-5 w-5" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "px-6 pb-6 text-neutral-400 leading-relaxed text-base",
											children: it.a
										})
									})
								})]
							})
						}, it.q);
					})
				})]
			})
		})]
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative w-full z-20 overflow-hidden bg-[#09090b] border-t border-white/5 py-32 md:py-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/20 via-blue-500/10 to-orange-500/20 rounded-full blur-[150px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col items-center max-w-[1400px] mx-auto px-6 md:px-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { x: [
								"-150%",
								"150%",
								"-150%"
							] },
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm",
							children: "START FREE • NO CREDIT CARD"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mx-auto max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl font-bold tracking-tight mb-8",
						children: [
							"Your next campaign is",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400",
								children: "one prompt away"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto max-w-xl text-lg text-neutral-400 mb-12",
						children: "Join 12,000+ marketing teams making their best work with Lumen."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "relative group/btn cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur opacity-60 group-hover/btn:opacity-100 transition duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-700 ease-out overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative z-10 drop-shadow-md tracking-wide",
										children: "Start generating"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "relative group/btn overflow-hidden rounded-full p-[1px] cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(168,85,247,0.5)_50%,transparent_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full flex items-center justify-center gap-2 rounded-full bg-[#121217] px-8 py-4 text-base font-bold text-white transition-all group-hover/btn:bg-[#1a1a24] overflow-hidden border border-white/10 group-hover/btn:border-transparent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative z-10 tracking-wide text-neutral-300 group-hover/btn:text-white transition-colors",
									children: "Book a demo"
								})]
							})]
						})]
					})
				]
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-[#09090b] border-t border-white/5 pt-20 overflow-hidden relative z-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-primary/20 to-transparent blur-[100px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto px-4 md:px-6 relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-16 lg:grid-cols-[1.5fr_2.5fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl font-bold text-white tracking-tight",
								children: "Lumen"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xs text-base text-neutral-400 leading-relaxed mb-8",
							children: "The AI campaign agent for marketing teams who care about craft, clarity and results."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative max-w-sm group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur opacity-30 group-focus-within:opacity-100 transition duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center bg-[#121217] rounded-full p-1 border border-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									placeholder: "Enter your email",
									className: "bg-transparent border-none outline-none text-white px-4 w-full text-sm placeholder:text-neutral-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "bg-white text-black p-2 rounded-full hover:scale-105 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-8 md:grid-cols-4",
						children: [
							{
								t: "Product",
								l: [
									"Campaigns",
									"Automation",
									"Analytics",
									"Integrations",
									"Pricing"
								]
							},
							{
								t: "Solutions",
								l: [
									"E-commerce",
									"Travel",
									"Finance",
									"Media",
									"Enterprise"
								]
							},
							{
								t: "Resources",
								l: [
									"Blog",
									"Customer stories",
									"Templates",
									"Changelog",
									"Help center"
								]
							},
							{
								t: "Company",
								l: [
									"About",
									"Careers",
									"Press",
									"Security",
									"Contact"
								]
							}
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold uppercase tracking-widest text-white mb-6",
							children: c.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-4",
							children: c.l.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#",
								className: "group inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors relative pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" })]
							}) }, l))
						})] }, c.t))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full flex justify-center pt-10 pb-4 select-none pointer-events-none relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[12vw] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent",
						children: "L U M E N"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row items-center justify-between gap-4 py-8 border-t border-white/5 text-sm text-neutral-500 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Lumen Labs, Inc. All rights reserved."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white transition-colors",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white transition-colors",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white transition-colors",
								children: "Security"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white transition-colors",
								children: "DPA"
							})
						]
					})]
				})
			]
		})]
	});
}
function InteractiveSolutions() {
	const [activeTab, setActiveTab] = (0, import_react.useState)(0);
	const solutions = [
		{
			id: "ecommerce",
			title: "For E-Commerce Brands",
			subtitle: "Drive conversions on autopilot.",
			description: "Let the agent analyze your catalog, write compelling ad copy, and automatically deploy A/B tests across Meta and Google to find your winning ROAS.",
			image: "/images/ecommerce-dashboard.png"
		},
		{
			id: "agencies",
			title: "For Marketing Agencies",
			subtitle: "Scale without scaling headcount.",
			description: "Manage dozens of clients from a single command center, with automated reporting and white-labeled campaign generation powered by AI.",
			image: "/images/agency-workspace.png"
		},
		{
			id: "creators",
			title: "For Content Creators",
			subtitle: "Turn your audience into a business.",
			description: "Automate your DMs, launch engaging newsletters, and push content across all your social channels simultaneously.",
			image: "/images/content_creators_dashboard.png"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-[#09090B] py-32 px-4 md:px-6 relative z-20 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 -right-[10%] w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-16 md:mb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { x: [
							"-150%",
							"150%",
							"-150%"
						] },
						transition: {
							duration: 4,
							repeat: Infinity,
							ease: "linear"
						},
						className: "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm",
						children: "WHO IT'S FOR"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight",
					children: [
						"Built for",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400",
							children: "Growth."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4 relative",
					children: solutions.map((sol, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(idx),
						className: `text-left p-6 rounded-2xl transition-all duration-300 relative border ${activeTab === idx ? "bg-[#121217] border-white/10" : "bg-transparent border-transparent hover:bg-white/5"}`,
						children: [
							activeTab === idx && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "active-solution-indicator",
								className: "absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-primary to-orange-500 rounded-r-full",
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								transition: { duration: .3 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: `font-display text-2xl font-bold mb-2 transition-colors duration-300 ${activeTab === idx ? "text-white" : "text-neutral-400"}`,
								children: sol.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-sm transition-colors duration-300 ${activeTab === idx ? "text-neutral-300" : "text-neutral-500"}`,
								children: sol.subtitle
							})
						]
					}, sol.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative rounded-3xl overflow-hidden border border-white/10 bg-[#0f0f13] aspect-[4/3] lg:aspect-auto lg:h-[600px] shadow-2xl flex flex-col group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20,
								filter: "blur(10px)"
							},
							animate: {
								opacity: 1,
								y: 0,
								filter: "blur(0px)"
							},
							exit: {
								opacity: 0,
								y: -20,
								filter: "blur(10px)"
							},
							transition: {
								duration: .4,
								ease: "easeOut"
							},
							className: "absolute inset-0 flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent z-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: solutions[activeTab].image,
									alt: solutions[activeTab].title,
									className: "w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-1000"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-20 p-8 md:p-12 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/90 to-transparent mt-auto border-t border-white/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl",
									children: solutions[activeTab].description
								})
							})]
						}, activeTab)
					})
				})]
			})]
		})]
	});
}
function Pricing() {
	const [isAnnual, setIsAnnual] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-[#09090B] py-32 px-4 md:px-6 relative z-20 border-t border-white/5 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 -left-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-16 md:mb-24 flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#121217] px-5 py-2 mb-8 shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { x: [
								"-150%",
								"150%",
								"-150%"
							] },
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 text-xs font-bold uppercase tracking-widest text-primary drop-shadow-sm",
							children: "PRICING"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-8",
						children: [
							"Scale your revenue, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden md:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-orange-400",
								children: "not your overhead."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center bg-[#121217] p-2 rounded-full border border-white/10 relative shadow-xl mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setIsAnnual(false),
							className: `relative px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${!isAnnual ? "text-white" : "text-neutral-400 hover:text-white"}`,
							children: [!isAnnual && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "pricing-toggle",
								className: "absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] z-[-1]",
								transition: {
									type: "spring",
									stiffness: 300,
									damping: 30
								}
							}), "Monthly"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setIsAnnual(true),
							className: `relative px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 z-10 flex items-center gap-2 ${isAnnual ? "text-white" : "text-neutral-400 hover:text-white"}`,
							children: [
								isAnnual && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "pricing-toggle",
									className: "absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] z-[-1]",
									transition: {
										type: "spring",
										stiffness: 300,
										damping: 30
									}
								}),
								"Annually",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold",
									children: "Save 20%"
								})
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto",
				children: [
					{
						name: "Starter",
						description: "For solo founders and early-stage startups.",
						monthlyPrice: 49,
						annualPrice: 39,
						features: [
							"1 Workspace",
							"3 Campaign Generations/mo",
							"Standard Templates",
							"Email Support"
						],
						highlighted: false,
						buttonText: "Start Free Trial"
					},
					{
						name: "Growth",
						description: "For scaling teams and marketing agencies.",
						monthlyPrice: 149,
						annualPrice: 119,
						features: [
							"Unlimited Workspaces",
							"Unlimited Campaigns",
							"Custom Brand AI Model",
							"Cross-Channel Publishing",
							"A/B Testing Engine",
							"Priority 24/7 Support"
						],
						highlighted: true,
						buttonText: "Get Started Now"
					},
					{
						name: "Enterprise",
						description: "For large organizations with complex needs.",
						monthlyPrice: "Custom",
						annualPrice: "Custom",
						features: [
							"Custom SLA",
							"Dedicated Success Manager",
							"On-Premise Deployment",
							"Advanced Analytics & RBAC",
							"White-labeling"
						],
						highlighted: false,
						buttonText: "Contact Sales"
					}
				].map((tier, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .5,
						delay: i * .1
					},
					className: `relative rounded-3xl p-8 md:p-10 flex flex-col group ${tier.highlighted ? "bg-[#0f0f13] border-none shadow-[0_0_50px_rgba(168,85,247,0.15)] transform lg:-translate-y-4 z-10" : "bg-[#09090b] border border-white/10 hover:bg-[#0f0f13] transition-colors duration-300 z-0"}`,
					children: [
						tier.highlighted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-primary via-blue-500/50 to-orange-500/50 opacity-50 z-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-3xl bg-[#0f0f13] z-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full z-20 shadow-lg",
								children: "Most Popular"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-bold text-white mb-2",
									children: tier.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-neutral-400 text-sm mb-6 min-h-[40px]",
									children: tier.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-8 flex items-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl font-display font-bold text-white tracking-tight",
										children: typeof tier.monthlyPrice === "number" ? `$${isAnnual ? tier.annualPrice : tier.monthlyPrice}` : tier.monthlyPrice
									}), typeof tier.monthlyPrice === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-neutral-500 mb-2",
										children: "/ month"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4 mb-10",
									children: tier.features.map((feature, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 bg-primary/20 p-1 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-neutral-300 text-sm",
											children: feature
										})]
									}, j))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 mt-auto",
							children: tier.highlighted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "w-full relative group/btn cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-orange-500 rounded-full blur opacity-60 group-hover/btn:opacity-100 transition duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-700 ease-out overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative z-10 drop-shadow-md tracking-wide",
										children: tier.buttonText
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "w-full relative group/btn overflow-hidden rounded-full p-[1px] cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full flex items-center justify-center gap-2 rounded-full bg-[#121217] px-8 py-4 text-sm font-bold text-white transition-all group-hover/btn:bg-[#1a1a24] overflow-hidden border border-white/10 group-hover/btn:border-transparent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[500%] transition-transform duration-1000 ease-in-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative z-10 tracking-wide text-neutral-300 group-hover/btn:text-white transition-colors",
										children: tier.buttonText
									})]
								})]
							})
						})
					]
				}, tier.name))
			})]
		})]
	});
}
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-[var(--text-primary)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MassiveFeatureGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveSolutions, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { LandingPage as component };
