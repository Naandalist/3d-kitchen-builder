"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import type {
  KitchenObject as KitchenObjectType,
} from "@/types/kitchen";
import { kitchenAssetMap } from "@/data/kitchen-assets";
import { useEditorStore } from "@/stores/editor-store";

export function KitchenObject({
  object,
}: {
  object: KitchenObjectType;
}) {
  const asset = kitchenAssetMap.get(object.assetId);

  if (!asset) return null;

  return (
    <LoadedKitchenObject
      object={object}
      modelPath={asset.modelPath}
    />
  );
}

function LoadedKitchenObject({
  object,
  modelPath,
}: {
  object: KitchenObjectType;
  modelPath: string;
}) {
  const gltf = useGLTF(modelPath);
  const scene = useMemo(
    () => clone(gltf.scene),
    [gltf.scene],
  );

  const selectedObjectId = useEditorStore(
    (state) => state.selectedObjectId,
  );
  const selectObject = useEditorStore(
    (state) => state.selectObject,
  );

  const selected =
    selectedObjectId === object.id;

  const onPointerDown = (
    event: ThreeEvent<PointerEvent>,
  ) => {
    event.stopPropagation();
    selectObject(object.id);
  };

  return (
    <group
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      onPointerDown={onPointerDown}
    >
      <primitive object={scene} />

      {selected && (
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.05, 0.03, 1.05]} />
          <meshBasicMaterial wireframe />
        </mesh>
      )}
    </group>
  );
}
