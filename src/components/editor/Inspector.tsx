"use client";

import { MathUtils } from "three";
import { kitchenAssetMap } from "@/data/kitchen-assets";
import { useEditorStore } from "@/stores/editor-store";

export function Inspector() {
  const store = useEditorStore();

  const object = store.objects.find(
    (item) => item.id === store.selectedObjectId,
  );

  if (!object) {
    return (
      <aside className="border-l border-stone-200 bg-white p-4 text-sm text-stone-500">
        Select an object to edit it.
      </aside>
    );
  }

  const asset = kitchenAssetMap.get(object.assetId);

  return (
    <aside className="border-l border-stone-200 bg-white p-4 text-sm">
      <h2 className="font-semibold">
        {asset?.name ?? object.assetId}
      </h2>

      <dl className="mt-4 space-y-1 text-xs text-stone-600">
        <div>X: {object.position[0].toFixed(2)}</div>
        <div>Z: {object.position[2].toFixed(2)}</div>
        <div>
          Rotation:{" "}
          {Math.round(
            MathUtils.radToDeg(object.rotation[1]),
          )}
          °
        </div>
      </dl>

      <div className="mt-4 grid gap-2">
        <button
          onClick={() =>
            store.rotateSelected(
              MathUtils.degToRad(-45),
            )
          }
        >
          Rotate left
        </button>

        <button
          onClick={() =>
            store.rotateSelected(
              MathUtils.degToRad(45),
            )
          }
        >
          Rotate right
        </button>

        <button onClick={store.duplicateSelected}>
          Duplicate
        </button>

        <button onClick={store.deleteSelected}>
          Delete
        </button>
      </div>
    </aside>
  );
}
