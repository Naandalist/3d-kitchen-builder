"use client";

import { create } from "zustand";
import { kitchenAssetMap } from "@/data/kitchen-assets";
import type {
  KitchenObject,
  KitchenRoom,
  Vector3Tuple,
} from "@/types/kitchen";

const defaultRoom: KitchenRoom = {
  width: 6,
  depth: 5,
  height: 3,
};

type Snapshot = {
  objects: KitchenObject[];
};

type EditorStore = {
  room: KitchenRoom;
  objects: KitchenObject[];
  selectedObjectId: string | null;
  past: Snapshot[];
  future: Snapshot[];

  addObject: (assetId: string) => void;
  selectObject: (id: string | null) => void;
  setPosition: (
    id: string,
    position: Vector3Tuple,
    commit?: boolean,
  ) => void;
  rotateSelected: (deltaRadians: number) => void;
  duplicateSelected: () => void;
  deleteSelected: () => void;
  replaceDesign: (room: KitchenRoom, objects: KitchenObject[]) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
};

function cloneObjects(objects: KitchenObject[]) {
  return objects.map((object) => ({
    ...object,
    position: [...object.position] as Vector3Tuple,
    rotation: [...object.rotation] as Vector3Tuple,
    scale: [...object.scale] as Vector3Tuple,
  }));
}

export const useEditorStore = create<EditorStore>((set, get) => {
  const checkpoint = () => {
    const { objects, past } = get();

    set({
      past: [...past, { objects: cloneObjects(objects) }],
      future: [],
    });
  };

  return {
    room: defaultRoom,
    objects: [],
    selectedObjectId: null,
    past: [],
    future: [],

    addObject: (assetId) => {
      const asset = kitchenAssetMap.get(assetId);
      if (!asset) return;

      checkpoint();

      const id = crypto.randomUUID();
      const object: KitchenObject = {
        id,
        assetId,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [
          asset.defaultScale,
          asset.defaultScale,
          asset.defaultScale,
        ],
      };

      set((state) => ({
        objects: [...state.objects, object],
        selectedObjectId: id,
      }));
    },

    selectObject: (id) => set({ selectedObjectId: id }),

    setPosition: (id, position, commit = false) => {
      if (commit) checkpoint();

      set((state) => ({
        objects: state.objects.map((object) =>
          object.id === id ? { ...object, position } : object,
        ),
      }));
    },

    rotateSelected: (deltaRadians) => {
      const id = get().selectedObjectId;
      if (!id) return;

      checkpoint();

      set((state) => ({
        objects: state.objects.map((object) =>
          object.id === id
            ? {
                ...object,
                rotation: [
                  object.rotation[0],
                  object.rotation[1] + deltaRadians,
                  object.rotation[2],
                ],
              }
            : object,
        ),
      }));
    },

    duplicateSelected: () => {
      const { objects, selectedObjectId } = get();
      const selected = objects.find(
        (object) => object.id === selectedObjectId,
      );
      if (!selected) return;

      checkpoint();

      const copy: KitchenObject = {
        ...selected,
        id: crypto.randomUUID(),
        position: [
          selected.position[0] + 0.25,
          selected.position[1],
          selected.position[2] + 0.25,
        ],
      };

      set((state) => ({
        objects: [...state.objects, copy],
        selectedObjectId: copy.id,
      }));
    },

    deleteSelected: () => {
      const id = get().selectedObjectId;
      if (!id) return;

      checkpoint();

      set((state) => ({
        objects: state.objects.filter((object) => object.id !== id),
        selectedObjectId: null,
      }));
    },

    replaceDesign: (room, objects) =>
      set({
        room,
        objects: cloneObjects(objects),
        selectedObjectId: null,
        past: [],
        future: [],
      }),

    undo: () => {
      const { past, objects, future } = get();
      const previous = past.at(-1);
      if (!previous) return;

      set({
        objects: cloneObjects(previous.objects),
        past: past.slice(0, -1),
        future: [
          { objects: cloneObjects(objects) },
          ...future,
        ],
        selectedObjectId: null,
      });
    },

    redo: () => {
      const { past, objects, future } = get();
      const next = future[0];
      if (!next) return;

      set({
        objects: cloneObjects(next.objects),
        past: [
          ...past,
          { objects: cloneObjects(objects) },
        ],
        future: future.slice(1),
        selectedObjectId: null,
      });
    },

    reset: () => {
      if (get().objects.length) checkpoint();

      set({
        objects: [],
        selectedObjectId: null,
      });
    },
  };
});
