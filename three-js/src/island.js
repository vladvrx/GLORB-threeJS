export const GLORB_ISLAND = {
  cx: -153.8588555,
  cz: 13.567255,
  rx: 52,
  rz: 56,
  floorY: 3.8,
  thickness: 2.4,
};

export const WEST_MIN_X = GLORB_ISLAND.cx - GLORB_ISLAND.rx;
export const WEST_MAX_X = GLORB_ISLAND.cx + GLORB_ISLAND.rx;
export const WEST_MIN_Z = GLORB_ISLAND.cz - GLORB_ISLAND.rz;
export const WEST_MAX_Z = GLORB_ISLAND.cz + GLORB_ISLAND.rz;

export function onIsland(x, z, island = GLORB_ISLAND) {
  return Math.abs(x - island.cx) <= island.rx && Math.abs(z - island.cz) <= island.rz;
}

if (typeof window !== "undefined") window.__GLORB_ISLAND__ = GLORB_ISLAND;
