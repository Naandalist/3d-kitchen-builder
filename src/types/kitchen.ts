export type Vector3Tuple = [number, number, number];

export type KitchenObject = {
  id: string;
  assetId: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: Vector3Tuple;
};

export type KitchenRoom = {
  width: number;
  depth: number;
  height: number;
};

export type KitchenDesign = {
  version: number;
  room: KitchenRoom;
  objects: KitchenObject[];
};
