# 3D Kitchen Builder

Interactive desktop-first kitchen layout editor built with Next.js, TypeScript, React Three Fiber, Drei, Zustand, and Tailwind CSS.

## Goals

- Build and arrange kitchen layouts in 3D.
- Keep editor state separate from Three.js rendering state.
- Use Charming Kitchen Set assets for a consistent low-poly visual language.
- Prioritize predictable manipulation, snapping, undo/redo, and persistence over visual effects.

## Stack

- Next.js + TypeScript
- Three.js + @react-three/fiber + @react-three/drei
- Zustand
- Tailwind CSS
- Vitest + Playwright

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Available scripts

```bash
npm run dev
npm run build
npm run test
npm run test:run
npm run test:e2e
```

## Project structure

```text
src/
├── app/
├── components/
│   ├── editor/
│   └── scene/
├── data/
├── lib/
├── stores/
└── types/

docs/
├── PRD.md
├── TECHNICAL_DECISIONS.md
└── ASSETS.md

public/
├── models/kitchen/
└── thumbnails/kitchen/

tests/
└── snapping.test.ts

e2e/
└── editor.spec.ts
```

## Architecture

The editor follows one core rule:

```text
Asset metadata
      ↓
Zustand editor state
      ↓
React Three Fiber scene
      ↓
Three.js / WebGL
```

The Three.js scene is a rendering layer, not the source of truth.

## Asset status

The application is scaffolded around the **Charming Kitchen Set** asset pack.

The initial asset catalog already contains logical slots for:

- Base Cabinet
- Wall Cabinet
- Refrigerator
- Stove
- Sink
- Table
- Stool
- Kettle
- Plant
- Mug

Expected paths are defined in `src/data/kitchen-assets.ts`.

Third-party binary files are intentionally not committed yet. Verify the license and redistribution terms of each selected Charming Kitchen Set model before adding it to this public repository.

Place normalized models here:

```text
public/models/kitchen/*.glb
```

Place generated previews here:

```text
public/thumbnails/kitchen/*.webp
```

See [docs/ASSETS.md](docs/ASSETS.md) for the normalization checklist.

## Documentation

- [Product Requirements](docs/PRD.md)
- [Technical Decisions](docs/TECHNICAL_DECISIONS.md)
- [Asset Integration Guide](docs/ASSETS.md)

## Current scaffold

Included:

- desktop editor shell
- procedural room, grid, lighting, and camera controls
- typed asset catalog
- Zustand editor state
- add/select/rotate/duplicate/delete actions
- undo/redo history foundation
- local save/load helpers
- snapping and collision utility foundations
- GLB loader component
- Vitest and Playwright setup

Still intentionally left for implementation:

- pointer-based object dragging
- wall snapping integration
- collision enforcement during placement
- autosave
- production asset binaries and thumbnails
- polished selection outline and loading states
