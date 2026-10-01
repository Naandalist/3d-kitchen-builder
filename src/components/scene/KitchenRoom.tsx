"use client";

import { Grid } from "@react-three/drei";
import { useEditorStore } from "@/stores/editor-store";

export function KitchenRoom() {
  const room = useEditorStore((state) => state.room);

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[room.width, room.depth]} />
        <meshStandardMaterial
          color="#d8c3a5"
          roughness={0.92}
          metalness={0}
        />
      </mesh>

      <Grid
        args={[room.width, room.depth]}
        cellSize={0.25}
        sectionSize={1}
        cellColor="#bca98e"
        sectionColor="#9f896d"
        cellThickness={0.45}
        sectionThickness={0.75}
        fadeDistance={9}
        fadeStrength={1.2}
        infiniteGrid={false}
        position={[0, 0.003, 0]}
      />

      <mesh
        position={[
          0,
          room.height / 2,
          -room.depth / 2,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[room.width, room.height, 0.08]}
        />
        <meshStandardMaterial
          color="#f4efe7"
          roughness={0.96}
          metalness={0}
        />
      </mesh>

      <mesh
        position={[
          -room.width / 2,
          room.height / 2,
          0,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[0.08, room.height, room.depth]}
        />
        <meshStandardMaterial
          color="#f4efe7"
          roughness={0.96}
          metalness={0}
        />
      </mesh>

      <mesh
        position={[
          0,
          0.065,
          -room.depth / 2 + 0.055,
        ]}
        receiveShadow
      >
        <boxGeometry args={[room.width, 0.13, 0.06]} />
        <meshStandardMaterial
          color="#e2d7c8"
          roughness={0.9}
        />
      </mesh>

      <mesh
        position={[
          -room.width / 2 + 0.055,
          0.065,
          0,
        ]}
        receiveShadow
      >
        <boxGeometry args={[0.06, 0.13, room.depth]} />
        <meshStandardMaterial
          color="#e2d7c8"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}
