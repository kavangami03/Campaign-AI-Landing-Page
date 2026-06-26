import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------ */
/*  GLSL Shaders for Energy Ribbons                             */
/* ------------------------------------------------------------ */
const auroraVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const auroraFragmentShader = `
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

/* ------------------------------------------------------------ */
/*  Aurora Mesh (Optimized Full Screen Quad)                    */
/* ------------------------------------------------------------ */
function AuroraPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((state) => state.size);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -5]}>
      {/* 2x2 plane covers screen fully if placed close to orthographic/perspective camera with enough scale */}
      <planeGeometry args={[40, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------ */
/*  Cinematic Camera & Particles                                */
/* ------------------------------------------------------------ */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      spd[i] = 0.01 + Math.random() * 0.03;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a855f7"
        transparent
        opacity={0.15}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-[#09090B]">
      {/* Background radial glows for ambient lighting */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute top-[20%] left-[30%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[50%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      {/* Tiny dotted grid overlay & Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")' }} />

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        {/* Optimized Aurora Shader Quad */}
        <AuroraPlane />
        
        {/* Particles */}
        <Particles />
      </Canvas>
    </div>
  );
}
