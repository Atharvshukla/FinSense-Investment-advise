"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Mesh, Vector3 } from "three";

function FloatingChart() {
  const meshRef = useRef<Mesh>(null);

  // UseSpring returns a SpringValue<number[]>, which is compatible with animated.mesh
  const { position } = useSpring({
    from: { position: [0, -1, 0] },
    to: { position: [0, 1, 0] },
    config: { duration: 2000 },
    loop: { reverse: true },
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  // Use animated.mesh directly
  const AnimatedMesh = animated('mesh');
  return (
    <AnimatedMesh ref={meshRef} position={position as unknown as Vector3}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4F46E5" />
    </AnimatedMesh>
  );
}

export function FloatingChartCanvas() {
  return (
    <div className="h-[300px] w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingChart />
      </Canvas>
    </div>
  );
}