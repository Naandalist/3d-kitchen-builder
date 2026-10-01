import { Box3, Object3D } from "three";

export function getWorldBounds(object: Object3D) {
  return new Box3().setFromObject(object);
}

export function intersectsAny(candidate: Box3, others: Box3[]) {
  return others.some((box) => candidate.intersectsBox(box));
}
