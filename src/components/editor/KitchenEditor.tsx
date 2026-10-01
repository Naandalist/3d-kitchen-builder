"use client";

import { useEffect } from "react";
import { AssetLibrary } from "./AssetLibrary";
import { Inspector } from "./Inspector";
import { Toolbar } from "./Toolbar";
import { KitchenScene } from "@/components/scene/KitchenScene";
import { useEditorStore } from "@/stores/editor-store";

export function KitchenEditor() {
  const {
    deleteSelected,
    duplicateSelected,
    undo,
    redo,
    selectObject,
  } = useEditorStore();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.matches(
          "input, textarea, select, [contenteditable=true]",
        )
      ) {
        return;
      }

      const mod = event.metaKey || event.ctrlKey;

      if (
        event.key === "Delete" ||
        event.key === "Backspace"
      ) {
        deleteSelected();
      }

      if (mod && event.key.toLowerCase() === "d") {
        event.preventDefault();
        duplicateSelected();
      }

      if (
        mod &&
        event.key.toLowerCase() === "z" &&
        event.shiftKey
      ) {
        event.preventDefault();
        redo();
      } else if (
        mod &&
        event.key.toLowerCase() === "z"
      ) {
        event.preventDefault();
        undo();
      }

      if (event.key === "Escape") {
        selectObject(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [
    deleteSelected,
    duplicateSelected,
    redo,
    selectObject,
    undo,
  ]);

  return (
    <main className="grid h-screen grid-rows-[56px_1fr] overflow-hidden">
      <Toolbar />
      <div className="grid min-h-0 grid-cols-[260px_1fr_280px]">
        <AssetLibrary />
        <KitchenScene />
        <Inspector />
      </div>
    </main>
  );
}
