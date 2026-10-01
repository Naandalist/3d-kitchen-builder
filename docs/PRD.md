# Product Requirements Document — 3D Kitchen Builder

## Overview
3D Kitchen Builder is a desktop-first web application for arranging kitchen layouts in an interactive 3D room. Users select items from an asset library, place them in the scene, move and rotate them, duplicate or delete them, snap them to grid/walls, and save the resulting design locally.

## Product goals
The MVP must let a user:
1. Open an empty 3D kitchen room.
2. Orbit, zoom, and pan the camera.
3. Browse at least 10 kitchen assets.
4. Add an asset to the scene.
5. Select, move, rotate, duplicate, and delete objects.
6. Snap objects to a configurable grid.
7. Snap supported objects toward walls.
8. Prevent obvious overlap between major objects.
9. Undo and redo meaningful editor operations.
10. Save and restore a design with local persistence.
11. Reset the kitchen.

## Non-goals
The MVP does not include authentication, backend storage, collaboration, physics simulation, CAD-grade precision, photoreal rendering, mobile-first editing, arbitrary model uploads, or multi-room planning.

## Core flow
```text
Open app
  -> empty kitchen
  -> browse asset library
  -> add item
  -> move / rotate / arrange
  -> save design
  -> reload later
```

## Layout
- Left: asset library
- Center: 3D canvas
- Right: inspector
- Top: undo, redo, save, reset

## Environment
Initial room target:
- width: 6m
- depth: 5m
- height: 3m
- floor at Y = 0

Walls and floor are procedural Three.js geometry. The room includes a grid, ambient lighting, one primary shadow-casting light, and soft shadows.

## Asset library
Primary source: Charming Kitchen Set.

Suggested categories:
- Cabinets
- Appliances
- Kitchen
- Furniture
- Decoration

Initial target asset types include base cabinet, wall cabinet, countertop, refrigerator, stove, extractor hood, sink, dish rack, table, stool/chair, kettle, plant, containers, and mug.

## Placement and selection
For MVP, clicking an asset spawns it at a valid default position and selects it. Sidebar-to-canvas drag-and-drop is deferred.

Clicking an object selects it. Clicking empty space deselects it. Selection has a simple visual indicator.

## Movement and snapping
Floor objects move on X/Z while Y stays fixed. Default grid size is 0.25m.

Supported objects near a wall align against the wall within a configurable threshold. Rotation is initially constrained to the Y axis, with 45° steps.

## Collision
Use simple bounding-box collision for major objects. Decorative objects can opt out of collision.

## Inspector
When an object is selected, show:
- object name
- position X/Z
- rotation
- rotate left/right
- duplicate
- delete

## History
Undoable actions:
- add
- move
- rotate
- duplicate
- delete

A drag gesture counts as one history entry.

## Persistence
Persist serializable editor state to localStorage. Store room metadata and object transforms, never Three.js objects or GLB binary data.

## Keyboard shortcuts
- Delete / Backspace: delete selected object
- Cmd/Ctrl + D: duplicate
- Cmd/Ctrl + Z: undo
- Cmd/Ctrl + Shift + Z: redo
- Escape: deselect

## Performance target
Target smooth interaction on a modern desktop browser with roughly 20–40 placed objects. Prefer profiling before introducing advanced optimizations.

## Acceptance criteria
The MVP is complete when a user can construct a kitchen layout from at least 10 asset types, manipulate objects reliably, use undo/redo, save and restore the design, and keep usable performance with at least 20 placed objects.

## Delivery phases
1. Foundation: app shell, canvas, room, camera, lighting, grid
2. Asset pipeline: metadata, GLB loading, thumbnails, asset library
3. Placement: add, select, move, delete
4. Editing: rotate, duplicate, inspector, shortcuts
5. Spatial rules: grid snapping, wall snapping, collision
6. Reliability: undo/redo, save/load, reset, error handling
7. Polish: lighting, selection feedback, loading states, performance

## Product principle
Quality of object manipulation is more important than feature count. A small asset set that is pleasant to arrange is better than a large catalog with unreliable controls.
