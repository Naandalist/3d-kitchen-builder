"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { KitchenRoom } from "./KitchenRoom";
import { KitchenObject } from "./KitchenObject";
import { SceneLighting } from "./SceneLighting";
import { useEditorStore } from "@/stores/editor-store";

export function KitchenScene() {
  const objects = useEditorStore((state) => state.objects);
  const selectObject = useEditorStore(
    (state) => state.selectObject,
  );

  return (
    <section className="min-h-0 bg-stone-100">
      <Canvas
        shadows
        camera={{
          position: [7, 6, 7],
          fov: 45,
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

        <OrbitControls
          makeDefault
          minDistance={4}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </section>
  );
}
