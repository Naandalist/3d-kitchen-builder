"use client";

import { loadDesign, saveDesign } from "@/lib/persistence";
import { useEditorStore } from "@/stores/editor-store";

export function Toolbar() {
  const {
    objects,
    room,
    undo,
    redo,
    reset,
    replaceDesign,
  } = useEditorStore();

  const handleLoad = () => {
    const design = loadDesign();
    if (design) {
      replaceDesign(design.room, design.objects);
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4">
      <div className="flex gap-3">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>

      <strong>3D Kitchen Builder</strong>

      <div className="flex gap-3">
        <button
          onClick={() =>
            saveDesign({
              version: 1,
              room,
              objects,
            })
          }
        >
          Save
        </button>
        <button onClick={handleLoad}>Load</button>
        <button
          onClick={() => {
            if (window.confirm("Reset the kitchen?")) {
              reset();
            }
          }}
        >
          Reset
        </button>
      </div>
    </header>
  );
}
