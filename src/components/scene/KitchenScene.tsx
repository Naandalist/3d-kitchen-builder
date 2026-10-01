"use client";

import {
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { KitchenObject } from "./KitchenObject";
import { KitchenRoom } from "./KitchenRoom";
import { SceneLighting } from "./SceneLighting";
import { useEditorStore } from "@/stores/editor-store";

export function KitchenScene() {
  const objects = useEditorStore(
    (state) => state.objects,
  );
  const selectObject = useEditorStore(
    (state) => state.selectObject,
  );

  return (
    <section className="min-h-0 bg-[#ebe5dc]">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [7, 5.6, 7],
          fov: 42,
        }}
        onCreated={({ scene }) => {
          scene.background = new Color("#ebe5dc");
        }}
        onPointerMissed={() => selectObject(null)}
      >
        <SceneLighting />
        <KitchenRoom />

        {objects.map((object) => (
          <KitchenObject
            key={object.id}
            object={object}
          />
        ))}

        <ContactShadows
          position={[0, 0.006, 0]}
          opacity={0.3}
          scale={8}
          blur={2.8}
          far={4}
          resolution={512}
          frames={1}
        />

        <OrbitControls
          makeDefault
          target={[0, 1, 0]}
          minDistance={4}
          maxDistance={14}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.08}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </section>
  );
}
