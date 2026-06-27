"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Center,
  Environment,
  ContactShadows,
  Preload,
  useGLTF,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { LoadingScreen } from "@/three/loading-screen";

gsap.registerPlugin(ScrollTrigger);

type Targets = {
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  rotationY: number;
  rotationX: number;
  lightIntensity: number;
  fillIntensity: number;
  bloomIntensity: number;
};

function BuildingModel({
  targets,
}: {
  targets: React.MutableRefObject<Targets>;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/modern_house.glb");

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) {
      return;
    }

    const t = targets.current;
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      t.cameraX,
      2.8,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      t.cameraY,
      2.8,
      delta,
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      t.cameraZ,
      2.8,
      delta,
    );
    state.camera.lookAt(0, 0.85, 0);
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      t.rotationY,
      2.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      t.rotationX,
      2.2,
      delta,
    );
  });

  return (
    <group ref={group} scale={0} position={[0, -0.95, 0]}>
      <Center top>
        {React.createElement("primitive" as any, {
          object: scene,
        })}
      </Center>
    </group>
  );
}

useGLTF.preload("/modern_house.glb");

function sceneElement(type: string, props: Record<string, unknown>) {
  return React.createElement(type as any, props);
}

export function BuildingScene() {
  const targets = useRef<Targets>({
    cameraX: 0,
    cameraY: 1.9,
    cameraZ: 14,
    rotationY: 0,
    rotationX: -0.04,
    lightIntensity: 2.2,
    fillIntensity: 0.85,
    bloomIntensity: 0.35,
  });

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .to(
          targets.current,
          {
            cameraZ: 11.8,
            cameraY: 1.72,
            bloomIntensity: 0.42,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          targets.current,
          {
            rotationY: Math.PI * 0.85,
            cameraX: 0.78,
            cameraY: 1.55,
            lightIntensity: 2.55,
            fillIntensity: 0.95,
            ease: "none",
            duration: 1,
          },
          0.33,
        )
        .to(
          targets.current,
          {
            rotationY: Math.PI * 2,
            rotationX: 0.03,
            cameraX: -0.62,
            cameraZ: 10.9,
            bloomIntensity: 0.48,
            ease: "none",
            duration: 1,
          },
          0.66,
        );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 h-full w-full">
      <Canvas
        className="absolute inset-0 block h-full w-full"
        shadows
        camera={{ position: [0, 1.9, 14], fov: 40, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100vw", height: "100vh", display: "block" }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("#050608");
          scene.fog = new THREE.Fog("#050608", 10, 26);
        }}
      >
        <AdaptiveDpr pixelated={false} />
        <AdaptiveEvents />
        <Suspense fallback={<LoadingScreen />}>
          {sceneElement("ambientLight", { intensity: 0.42, color: "#f5f7ff" })}
          {sceneElement("hemisphereLight", {
            intensity: targets.current.fillIntensity,
            color: "#d5e5ff",
            groundColor: "#090b10",
          })}
          {sceneElement("directionalLight", {
            castShadow: true,
            intensity: targets.current.lightIntensity,
            position: [6, 10, 6],
            color: "#f7fbff",
            "shadow-mapSize-width": 2048,
            "shadow-mapSize-height": 2048,
          })}
          {sceneElement("spotLight", {
            position: [-8, 8, 8],
            intensity: 0.75,
            angle: 0.28,
            penumbra: 0.8,
            color: "#7fb2ff",
          })}
          <Environment preset="city" />
          <BuildingModel targets={targets} />
          <ContactShadows
            opacity={0.55}
            scale={18}
            blur={2.6}
            far={6}
            resolution={1024}
            color="#000000"
          />
          <EffectComposer>
            <Bloom
              intensity={targets.current.bloomIntensity}
              luminanceThreshold={0.16}
              luminanceSmoothing={0.8}
            />
          </EffectComposer>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
