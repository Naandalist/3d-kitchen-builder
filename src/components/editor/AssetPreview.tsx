"use client";

import { Bounds, Center, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

type AssetPreviewProps = {
  modelPath: string;
  name: string;
};

export function AssetPreview({
  modelPath,
  name,
}: AssetPreviewProps) {
  return (
    <div
      className="aspect-square w-full overflow-hidden rounded-md bg-gradient-to-b from-stone-50 to-stone-100"
      aria-label={`${name} preview`}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [2.4, 1.8, 2.4], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.7} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={2}
        />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.35}>
            <Center>
              <PreviewModel modelPath={modelPath} />
            </Center>
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}

function PreviewModel({
  modelPath,
}: {
  modelPath: string;
}) {
  const gltf = useGLTF(modelPath);
  const scene = useMemo(
    () => clone(gltf.scene),
    [gltf.scene],
  );

  return <primitive object={scene} />;
}
