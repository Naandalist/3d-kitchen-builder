export type AssetCategory =
  | "cabinet"
  | "appliance"
  | "kitchen"
  | "furniture"
  | "decoration";

export type PlacementType = "floor" | "wall" | "counter";

export type AssetDefinition = {
  id: string;
  name: string;
  category: AssetCategory;
  modelPath: string;
  thumbnailPath: string;
  placement: PlacementType;
  defaultScale: number;
  snapToGrid: boolean;
  snapToWall: boolean;
  collision: boolean;
};
