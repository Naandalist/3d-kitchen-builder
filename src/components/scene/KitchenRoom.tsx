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
        <planeGeometry
          args={[room.width, room.depth]}
        />
        <meshStandardMaterial color="#e7e5e4" />
      </mesh>

      <Grid
        args={[room.width, room.depth]}
        cellSize={0.25}
        sectionSize={1}
        position={[0, 0.001, 0]}
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
        <meshStandardMaterial color="#fafaf9" />
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
        <meshStandardMaterial color="#fafaf9" />
      </mesh>
    </group>
  );
}
