# Technical Decisions — 3D Kitchen Builder

## Core stack
Use Next.js, TypeScript, React, Three.js, React Three Fiber, Drei, Zustand, and Tailwind CSS. The MVP remains client-side and does not require a backend.

## Rendering architecture
React Three Fiber is the primary abstraction over Three.js. Three.js APIs may be used for geometry math, raycasting, bounding boxes, and vector calculations, but the Three.js scene graph is not the canonical application state.

```text
React UI
  -> Zustand editor state
  -> React Three Fiber
  -> Three.js
  -> WebGL
```

## State ownership
Zustand is the single source of truth for editor state. Store serializable logical state such as asset IDs, transforms, selection, room configuration, and history.

Never make mesh.position, mesh.rotation, scene.children, or React-local component state the canonical kitchen state.

## Asset definition vs scene instance
Static metadata belongs in AssetDefinition. Runtime placed objects belong in KitchenObject.

## Coordinate system
Use standard Three.js coordinates:
- X: width
- Y: vertical
- Z: depth
- floor: Y = 0

Normalize imported models to roughly 1 unit = 1 meter and prefer bottom-center origins.

## Model format
Production format is GLB. Avoid mixing OBJ, FBX, directory-based glTF, and GLB at runtime. Normalize/convert assets before adding them to the library.

Load models with Drei `useGLTF()`. Cache and preload when beneficial.

## Placement
MVP flow:
```text
asset click
  -> create KitchenObject
  -> choose valid spawn position
  -> select object
  -> user moves object
```

Do not implement DOM-to-WebGL drag-and-drop in the first version.

## Movement
Floor objects move only on X/Z. Compute pointer-floor intersections with raycasting and keep Y fixed.

Disable OrbitControls while an object drag is active, then re-enable it when dragging ends.

## Snapping
Grid snapping is mathematical:
```ts
Math.round(value / gridSize) * gridSize
```

Default grid size: 0.25m.

Wall snapping uses room boundaries and a configurable threshold. Keep the logic in utility modules, not React components.

## Rotation
Store radians internally. UI may display degrees. Constrain normal kitchen objects to Y-axis rotation initially. Default step: 45°.

## Collision
Use `THREE.Box3` for basic major-object collision. No physics engine in the MVP.

## Undo / redo
Use snapshot-based history for MVP. A drag gesture commits one history entry, not one entry per pointer move.

## Persistence
Use localStorage. Persist versioned serializable data only.

## IDs
Use `crypto.randomUUID()` for KitchenObject IDs. Never use array indexes as identity.

## Components
Keep components narrow and business rules in store/lib/data modules.

## Selection
Store only `selectedObjectId` globally. Do not store a Three.js Mesh reference in Zustand.

## Thumbnails
Use static WebP thumbnails. Do not render a live WebGL canvas per asset card.

## Client boundary
Keep the 3D editor behind a client component boundary. Do not mark the whole app client-side unless necessary.

## Testing
Unit test pure logic: snapping, room bounds, collision helpers, history, persistence serialization, and store actions.

Use Playwright for critical flows such as add, select, rotate, duplicate, delete, undo, redo, save, reload, and restore.

## Rejected MVP decisions
Do not add Redux, a physics engine, backend database, authentication, event sourcing, arbitrary model uploads, multiplayer architecture, custom shaders, full XYZ transform controls, or premature GPU instancing.

## Priority order
1. Correct object manipulation
2. Predictable state
3. Smooth interaction
4. Reliable undo/redo
5. Asset consistency
6. Performance
7. Visual polish

## Architectural invariant
A developer should be able to inspect `useEditorStore.getState().objects` and understand the complete logical kitchen without reading mutable Mesh state from the Three.js scene graph.
