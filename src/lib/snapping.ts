export function snapValue(value: number, gridSize: number) {
  return Math.round(value / gridSize) * gridSize;
}

export function snapPositionXZ(
  position: [number, number, number],
  gridSize: number,
): [number, number, number] {
  return [
    snapValue(position[0], gridSize),
    position[1],
    snapValue(position[2], gridSize),
  ];
}
