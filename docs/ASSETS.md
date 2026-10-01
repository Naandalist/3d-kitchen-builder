# Asset Integration Guide

## Primary asset pack
The intended visual pack is **Charming Kitchen Set** from Poly Pizza.

Do not commit third-party binary models until their license and redistribution terms have been verified for the exact files being used.

## Expected structure
```text
public/
  models/
    kitchen/
  thumbnails/
    kitchen/
```

## Normalization checklist
Before adding a model:
- Convert to GLB if needed.
- Normalize scale so 1 Three.js unit is approximately 1 meter.
- Prefer bottom-center origin.
- Ensure Y is vertical.
- Remove unused materials and meshes.
- Reduce texture size when excessive.
- Verify reasonable polygon count.
- Generate a static WebP thumbnail.
- Add a matching entry to `src/data/kitchen-assets.ts`.

## Initial target assets
- Base cabinet
- Wall cabinet
- Countertop
- Refrigerator
- Stove
- Extractor hood
- Sink
- Dish rack
- Table
- Stool / chair
- Kettle
- Plant
- Container
- Mug

## Performance
Prefer optimized low-poly GLB files. Introduce Draco, Meshopt, KTX2, or other compression only when profiling or file-size inspection justifies it.
