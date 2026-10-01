import { describe, expect, it } from "vitest";
import {
  snapPositionXZ,
  snapValue,
} from "@/lib/snapping";

describe("snapping", () => {
  it("snaps a value to the nearest grid step", () => {
    expect(snapValue(1.13, 0.25)).toBe(1.25);
    expect(snapValue(1.11, 0.25)).toBe(1);
  });

  it("snaps X/Z while preserving Y", () => {
    expect(
      snapPositionXZ([1.13, 0.4, -1.11], 0.25),
    ).toEqual([1.25, 0.4, -1]);
  });
});
