"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";

function InteriorModel() {
  const { scene } = useGLTF("/models/scene.gltf");
  return <primitive object={scene} />;
}

function SceneSetup() {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    // allow page scroll on touch devices by disabling default gestures on canvas
    gl.domElement.style.touchAction = "auto";

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, [gl]);

  // mimic the JS reference
  useEffect(() => {
    // camera position - adjust these values to change the viewing angle:
    // X: left (-) / right (+)
    // Y: down (-) / up (+)
    // Z: back (-) / forward (+)
    // Example: (15, 5, 20) = diagonal view from right, slightly elevated
    const desktopPosition = new THREE.Vector3(5, 5, -25);
    const mobilePosition = new THREE.Vector3(0, 3, 12);
    const targetPosition = isMobile ? mobilePosition : desktopPosition;

    camera.position.copy(targetPosition);

    // Make camera look at the center (where the model is)
    camera.lookAt(0, 0, 0);

    // directional light (topLight)
    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    // ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
  }, [camera, isMobile, scene]);

  // keep camera and controls synced
  useFrame(() => {
    if (controlsRef.current) controlsRef.current.update();
  });

  return (
    <>
      <Suspense fallback={null}>
        <InteriorModel />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enableDamping={true}
        dampingFactor={0.05}
        enableZoom={false}      // Better to keep zoom off so they don't get stuck
        enablePan={false}       // Keep pan off to avoid losing the model
        enableRotate={true}     
      />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
      className="h-[70vh] sm:h-full w-full"
    >
      <SceneSetup />
    </Canvas>
  );
}

// preload for performance
useGLTF.preload("/models/scene.gltf");
