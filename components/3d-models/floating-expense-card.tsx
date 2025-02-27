"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Box } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { Group, Mesh } from "three";

function FloatingExpenseCard() {
  const groupRef = useRef<Group>(null);

  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: { rotation: [0, Math.PI * 2, 0] },
    config: { duration: 10000 },
    loop: true,
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.002;
    }
  });

  // Create an animated group component
  const AnimatedGroup = animated('group');

  return (
    <AnimatedGroup ref={groupRef} rotation={rotation as unknown as [number, number, number]}>
      <Box args={[3, 2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4F46E5" opacity={0.7} transparent />
      </Box>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Expenses
      </Text>
    </AnimatedGroup>
  );
}

export function FloatingExpenseCardCanvas() {
  return (
    <div className="h-[200px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingExpenseCard />
      </Canvas>
    </div>
  );
}