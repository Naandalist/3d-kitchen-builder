export function SceneLighting() {
  return (
    <>
      <hemisphereLight
        args={["#fff8ed", "#8e806f", 1.2]}
      />

      <ambientLight intensity={0.45} />

      <directionalLight
        position={[4.5, 7.5, 5]}
        intensity={2.2}
        color="#fff5e8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.00015}
      />

      <directionalLight
        position={[-4, 3, -2]}
        intensity={0.45}
        color="#dce7ff"
      />
    </>
  );
}
