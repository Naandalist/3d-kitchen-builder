export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[4, 7, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
