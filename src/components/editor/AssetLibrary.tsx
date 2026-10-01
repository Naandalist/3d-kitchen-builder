"use client";

import { kitchenAssets } from "@/data/kitchen-assets";
import { useEditorStore } from "@/stores/editor-store";
import { AssetPreview } from "./AssetPreview";

export function AssetLibrary() {
  const addObject = useEditorStore(
    (state) => state.addObject,
  );

  return (
    <aside className="overflow-y-auto border-r border-stone-200 bg-white p-3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">
          Assets
        </h2>
        <span className="text-[10px] text-stone-400">
          {kitchenAssets.length} items
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {kitchenAssets.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => addObject(asset.id)}
            title={`Add ${asset.name}`}
            className="group overflow-hidden rounded-lg border border-stone-200 bg-white p-1.5 text-left transition hover:border-stone-400 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <AssetPreview
              modelPath={asset.modelPath}
              name={asset.name}
            />
            <div className="px-1 pb-1 pt-2">
              <div className="truncate text-xs font-medium text-stone-800">
                {asset.name}
              </div>
              <div className="mt-0.5 capitalize text-[10px] text-stone-400">
                {asset.category}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
