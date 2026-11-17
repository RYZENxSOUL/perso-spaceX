"use client";
import { Html, OrbitControls, Stars, Line, Billboard } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, Suspense, useMemo, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { UniverseMode, UniverseObject } from "@/types/universe";

export const timeStore = { time: 0 };

type UniverseCanvasProps = { mode: UniverseMode; objects: UniverseObject[]; selectedId: string; onSelect: (object: UniverseObject | null) => void; zoomSignal?: number; resetSignal?: number; isLocked?: boolean; isPaused?: boolean; isTransitioning?: boolean };
type SceneObjectsProps = Pick<UniverseCanvasProps, "objects" | "selectedId" | "onSelect" | "isPaused">;

function CameraAnimator({ mode, selectedId, objects, zoomSignal = 0, resetSignal = 0, isLocked = false, isTransitioning = false }: { mode: UniverseMode, selectedId: string, objects: UniverseObject[], zoomSignal?: number, resetSignal?: number, isLocked?: boolean, isTransitioning?: boolean }) {
  const controlsRef = useRef<any>(null);
  
  useEffect(() => {
    if (!controlsRef.current || zoomSignal === 0) return;
    const camera = controlsRef.current.object as THREE.PerspectiveCamera;
    camera.position.multiplyScalar(zoomSignal > 0 ? .78 : 1.28);
    controlsRef.current.update();
  }, [zoomSignal]);

  useEffect(() => {
    if (!controlsRef.current || resetSignal === 0) return;
    const camera = controlsRef.current.object as THREE.PerspectiveCamera;
    camera.position.set(mode === "solar" ? 0 : 0, mode === "solar" ? 15 : 1, mode === "solar" ? 39 : 12);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  }, [mode, resetSignal]);

  useEffect(() => {
    if (isTransitioning && controlsRef.current) {
      const camera = controlsRef.current.object as THREE.PerspectiveCamera;
      // Start way out in deep space for the wormhole exit
      camera.position.set(0, 400, 1200);
      
      const targetPos = new THREE.Vector3(0, mode === "solar" ? 15 : 1, mode === "solar" ? 39 : 12);
      let frame = 0;
      const animateEntry = () => {
         frame++;
         if (frame > 250) return; // ~4.1 seconds (250 frames at 60fps)
         camera.position.lerp(targetPos, 0.035);
         controlsRef.current.update();
         requestAnimationFrame(animateEntry);
      };
      animateEntry();
    }
  }, [isTransitioning, mode]);

  return <OrbitControls 
    ref={controlsRef} 
    enabled={!isLocked}
    enableDamping 
    dampingFactor={.08} 
    minDistance={1.5} 
    maxDistance={2500} 
    rotateSpeed={.45} 
    zoomSpeed={.7} 
    enablePan={true} 
    screenSpacePanning={true}
    mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
    touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.PAN }}
    autoRotate={!selectedId} 
    autoRotateSpeed={0.2} 
    makeDefault 
  />;
}

export function UniverseCanvas({ mode, objects, selectedId, onSelect, zoomSignal = 0, resetSignal = 0, isLocked = false, isPaused = false, isTransitioning = false }: UniverseCanvasProps) {
  return <Canvas className="universe-canvas" camera={{ position: mode === "solar" ? [0, 15, 39] : [0, 1, 12], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }} onPointerMissed={() => onSelect(null)}>
    <color attach="background" args={[mode === "solar" ? "#010204" : "#080410"]} />
    <fog attach="fog" args={[mode === "solar" ? "#010204" : "#080410", 8, 90]} />
    <ambientLight intensity={mode === "solar" ? .15 : .7} />
    <Stars radius={100} depth={50} count={mode === "solar" ? 2000 : 4000} factor={1.5} saturation={0} fade speed={0} />
    <Suspense fallback={null}>
      {mode === "solar" ? <SolarSystem objects={objects} selectedId={selectedId} onSelect={onSelect} isPaused={isPaused}  /> : <DeepSpace objects={objects} selectedId={selectedId} onSelect={onSelect} />}
    </Suspense>
    <EffectComposer>
      <Bloom luminanceThreshold={1.0} luminanceSmoothing={0.5} height={300} intensity={mode === "solar" ? 1.5 : 2.0} />
    </EffectComposer>
    <CameraAnimator mode={mode} selectedId={selectedId} objects={objects} zoomSignal={zoomSignal} resetSignal={resetSignal} isLocked={isLocked} isTransitioning={isTransitioning} />
  </Canvas>;
}

function SolarSystem({ objects, selectedId, onSelect, isPaused = false }: SceneObjectsProps) {
  const planets = objects.filter(o => o.category !== "Moon" && o.id !== "sun");
  const moons = objects.filter(o => o.category === "Moon");
  const sun = objects.find(o => o.id === "sun");

  return <group rotation={[-.08, -.18, 0]}>
    <pointLight position={[0, 0, 0]} intensity={2.8} distance={300} color="#ffdfb0" decay={0} />
    {sun && <CelestialBody key={sun.id} object={sun} selected={selectedId === sun.id} onSelect={onSelect} sun isPaused={isPaused} />}
    
    {planets.map((object) => {
      const radius = Math.sqrt(object.position[0] ** 2 + object.position[2] ** 2);
      const speed = 1.2 / Math.sqrt(radius); 
      const startAngle = Math.atan2(object.position[2], object.position[0]);
      const inclination = Math.atan2(object.position[1], radius);
      
      const planetMoons = moons.filter(m => (object.id === "earth" && m.id === "moon") || (object.id === "jupiter" && m.id === "europa"));

      return (
        <group key={object.id} rotation={[inclination, 0, 0]}>
          <OrbitLine radius={radius} />
          <AnimatedOrbit speed={speed} startAngle={startAngle} isPaused={isPaused || !!selectedId}>
            <CelestialBody object={object} selected={selectedId === object.id} onSelect={onSelect} isOrbiting isPaused={isPaused} />
            
            {planetMoons.map((moon, index) => {
              const moonOrbitRadius = object.radius * (3.0 + index);
              const moonSpeed = 4.0 / Math.sqrt(moonOrbitRadius);
              return (
                <group key={moon.id} position={[radius, 0, 0]} rotation={[0.2, 0, 0.1]}>
                  <OrbitLine radius={moonOrbitRadius} />
                  <AnimatedOrbit speed={moonSpeed} startAngle={index * Math.PI} isPaused={isPaused || !!selectedId}>
                    <group position={[moonOrbitRadius, 0, 0]}>
                      <CelestialBody object={moon} selected={selectedId === moon.id} onSelect={onSelect} isMoon isPaused={isPaused} />
                    </group>
                  </AnimatedOrbit>
                </group>
              );
            })}
          </AnimatedOrbit>
        </group>
      );
    })}
  </group>;
}

function AnimatedOrbit({ children, speed, startAngle = 0, isPaused = false }: { children: React.ReactNode; speed: number; startAngle?: number; isPaused?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current && !isPaused) {
      groupRef.current.rotation.y = startAngle + timeStore.time * speed;
    }
  });
  return <group ref={groupRef}>{children}</group>;
}

function DeepSpace({ objects, selectedId, onSelect }: SceneObjectsProps) {
  return (
    <group rotation={[.05, .15, 0]}>
      <AsteroidField />
      {objects.map((object) => <DeepSpaceObject key={object.id} object={object} selected={selectedId === object.id} onSelect={onSelect} />)}
    </group>
  );
}

function AsteroidField({ count = 1200 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120,
      z: (Math.random() - 0.5) * 120,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      scale: 0.05 + Math.random() * 0.2,
      speed: 0.1 + Math.random() * 0.3
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.rx += delta * p.speed;
      p.ry += delta * p.speed;
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#413844" roughness={0.9} metalness={0.2} />
    </instancedMesh>
  );
}

function DeepSpaceObject({ object, selected, onSelect }: { object: UniverseObject; selected: boolean; onSelect: (object: UniverseObject) => void; }) {
  const texture = useLoader(TextureLoader, object.texture as string);
  texture.colorSpace = THREE.SRGBColorSpace;
  const controls = useThree((state) => state.controls) as any;
  const vec = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (selected && controls && ref.current) {
      ref.current.getWorldPosition(vec);
      controls.target.lerp(vec, 0.06);
      offset.copy(vec).add(new THREE.Vector3(0, 0, object.radius * 6));
      state.camera.position.lerp(offset, 0.06);
    }
  });

  return (
    <group position={object.position} ref={ref}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <mesh>
          <planeGeometry args={[object.radius * 6, object.radius * 6]} />
          <shaderMaterial 
            transparent 
            depthWrite={false} 
            blending={THREE.AdditiveBlending}
            uniforms={{
              uTexture: { value: texture },
              uOpacity: { value: selected ? 1.0 : 0.7 }
            }}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform sampler2D uTexture;
              uniform float uOpacity;
              varying vec2 vUv;
              void main() {
                vec4 texColor = texture2D(uTexture, vUv);
                float dist = distance(vUv, vec2(0.5));
                float edgeFade = smoothstep(0.5, 0.3, dist);
                float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
                float noiseCrush = smoothstep(0.04, 0.15, luminance);
                gl_FragColor = vec4(texColor.rgb * 1.5, texColor.a * edgeFade * noiseCrush * uOpacity);
              }
            `}
          />
        </mesh>
      </Billboard>
      
      {/* Hitbox */}
      <mesh onClick={(event) => { event.stopPropagation(); onSelect(object); }} onPointerOver={() => { document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = "default"; }}>
        <sphereGeometry args={[Math.max(object.radius * 3, 2), 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      
      <Html distanceFactor={8} position={[0, object.radius * 2.5 + .5, 0]} center>
        <button className={`canvas-label ${selected ? "active" : ""}`} onClick={(event) => { event.stopPropagation(); onSelect(object); }}>
          <i style={{ background: object.color }} />{object.name}
        </button>
      </Html>
    </group>
  );
}

function SunSurface({ object, selected }: { object: UniverseObject; selected: boolean }) {
  const texture = useLoader(TextureLoader, object.texture as string);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <shaderMaterial
      uniforms={{ uTexture: { value: texture }, uColor: { value: new THREE.Color("#ffb86c") } }}
      vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
      fragmentShader={`uniform sampler2D uTexture; uniform vec3 uColor; varying vec2 vUv; void main() { vec4 tex = texture2D(uTexture, vUv); gl_FragColor = vec4(tex.rgb * uColor * 2.5, 1.0); }`}
      toneMapped={false}
    />
  );
}

function TexturedSurface({ object, selected }: { object: UniverseObject; selected: boolean }) {
  const texture = useLoader(TextureLoader, object.texture as string);
  texture.colorSpace = THREE.SRGBColorSpace;
  const isEarth = object.id === "earth";
  return <meshStandardMaterial 
    map={texture} 
    roughness={isEarth ? .4 : .9} 
    metalness={isEarth ? .2 : .0} 
  />;
}

function Atmosphere({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh scale={1.03}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        uniforms={{ uColor: { value: new THREE.Color(color) } }}
        vertexShader={`varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`uniform vec3 uColor; varying vec3 vNormal; void main() { float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0); gl_FragColor = vec4(uColor * 2.0, 1.0) * intensity; }`}
      />
    </mesh>
  );
}



function OrbitLine({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);
  
  return <Line points={points} color="#587c89" lineWidth={1.5} transparent opacity={0.2} />;
}

function SaturnRings({ radius }: { radius: number }) {
  const shader = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false, // Prevents z-fighting with the planet sphere
      uniforms: {
        innerRadius: { value: radius * 1.25 },
        outerRadius: { value: radius * 2.35 },
        color1: { value: new THREE.Color("#d3b996") },
        color2: { value: new THREE.Color("#e5d3b3") },
        color3: { value: new THREE.Color("#b59871") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float innerRadius;
        uniform float outerRadius;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        
        varying vec2 vUv;
        varying vec3 vPos;
        
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          float d = length(vPos.xy);
          
          if (d < innerRadius || d > outerRadius) discard;

          float normalizedD = (d - innerRadius) / (outerRadius - innerRadius);
          
          if (normalizedD > 0.65 && normalizedD < 0.72) discard; // Cassini
          if (normalizedD > 0.88 && normalizedD < 0.90) discard; // Encke

          float bands = sin(normalizedD * 80.0) * 0.5 + 0.5;
          float fineBands = sin(normalizedD * 300.0) * 0.5 + 0.5;
          float noise = random(vec2(d * 100.0, 0.0)) * 0.2;
          
          vec3 ringColor = mix(color1, color2, bands);
          ringColor = mix(ringColor, color3, smoothstep(0.72, 1.0, normalizedD));
          
          float opacity = 0.85;
          opacity *= (fineBands * 0.6 + 0.4);
          opacity -= noise;
          
          opacity *= smoothstep(0.0, 0.02, normalizedD);
          opacity *= smoothstep(1.0, 0.98, normalizedD);
          
          if (normalizedD < 0.15) {
             opacity *= (normalizedD / 0.15); 
             ringColor = mix(vec3(0.3,0.3,0.3), ringColor, normalizedD / 0.15);
          }
          
          gl_FragColor = vec4(ringColor, opacity);
        }
      `
    });
  }, [radius]);

  return (
    <mesh rotation={[Math.PI / 2 - 0.2, 0.1, -0.2]}>
      <ringGeometry args={[radius * 1.25, radius * 2.35, 256]} />
      <primitive object={shader} attach="material" />
    </mesh>
  );
}

function CelestialBody({ object, selected, onSelect, sun = false, deep = false, isOrbiting = false, isMoon = false, isPaused = false }: { object: UniverseObject; selected: boolean; onSelect: (object: UniverseObject) => void; sun?: boolean; deep?: boolean; isOrbiting?: boolean; isMoon?: boolean; isPaused?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const controls = useThree((state) => state.controls) as any;
  const vec = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => { 
    if (ref.current) { 
      if (!isPaused) {
        ref.current.rotation.y = timeStore.time * (sun ? .04 : .08); 
      }
      ref.current.scale.lerp(new THREE.Vector3(selected ? 1.28 : 1, selected ? 1.28 : 1, selected ? 1.28 : 1), .1); 
      if (selected && controls) {
        ref.current.getWorldPosition(vec);
        controls.target.lerp(vec, 0.06);
        offset.copy(vec).add(new THREE.Vector3(object.radius * 2.5, object.radius * 1.5, object.radius * 4));
        state.camera.position.lerp(offset, 0.06);
      }
    } 
  });
  
  return <group position={isMoon ? [0, 0, 0] : (isOrbiting ? [Math.sqrt(object.position[0]**2 + object.position[2]**2), 0, 0] : object.position)}>
    <mesh ref={ref}>
      <sphereGeometry args={[object.radius, 64, 64]} />
      {sun ? <SunSurface object={object} selected={selected} /> : object.texture ? <TexturedSurface object={object} selected={selected} /> : <meshStandardMaterial color={object.color} roughness={.9} />}
      {object.id === "earth" && <Atmosphere radius={object.radius} color="#4b92c2" />}
      {object.id === "venus" && <Atmosphere radius={object.radius} color="#e5c899" />}
      {object.id === "mars" && <Atmosphere radius={object.radius} color="#c25f4b" />}
    </mesh>
    
    <mesh onClick={(event) => { event.stopPropagation(); onSelect(object); }} onPointerOver={() => { document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = "default"; }}>
      <sphereGeometry args={[Math.max(object.radius * 2.5, 1.5), 16, 16]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>

    {sun && <mesh scale={1.16}><sphereGeometry args={[object.radius, 64, 64]} /><meshBasicMaterial color="#ff9d4d" transparent opacity={.12} depthWrite={false} /></mesh>}
    {object.id === "saturn" && <SaturnRings radius={object.radius} />}
    {(selected || deep) && <Html distanceFactor={8} position={[0, object.radius + .15, 0]} center><button className={`canvas-label ${selected ? "active" : ""}`} onClick={(event) => { event.stopPropagation(); onSelect(object); }}><i style={{ background: object.color }} />{object.name}</button></Html>}
    {selected && <pointLight color={object.accent ?? object.color} intensity={deep ? 2 : 1.6} distance={3.6} />}
  </group>;
}
