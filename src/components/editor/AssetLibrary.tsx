"use client";

import { kitchenAssets } from "@/data/kitchen-assets";
import { useEditorStore } from "@/stores/editor-store";

export function AssetLibrary() {
  const addObject = useEditorStore(
    (state) => state.addObject,
  );

  return (
    <aside className="overflow-y-auto border-r border-stone-200 bg-white p-3">
      <h2 className="mb-3 text-sm font-semibold">
        Assets
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {kitchenAssets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => addObject(asset.id)}
            className="rounded border border-stone-200 p-3 text-left text-xs hover:bg-stone-50"
          >
            <div className="mb-2 aspect-square rounded bg-stone-100" />
            {asset.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
