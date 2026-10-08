// Graph geometry, computed once at build time. Pure functions of the zone
// list and the relations: no randomness, no simulation, same input same SVG.
// Constants come from the approved mock (assets-src/mock/deep-dive-mock).

export interface LayoutZoneInput {
  id: string;
  nodeCount: number;
  short: string;
}

export interface LayoutRelationInput {
  from: string;
  to: string;
}

const round = (v: number) => Math.round(v * 10) / 10;
const rad = (deg: number) => (deg * Math.PI) / 180;

// Full graph: the core zone at the centre, inside a circular nucleus, with
// its points in a ring; the other zones on an elliptical ring around it,
// each with its points fanned outwards.
export const GRAPH = {
  width: 1000,
  height: 720,
  cx: 500,
  cy: 372,
  rx: 345,
  ry: 240,
  nucleus: 112,
};

export interface GraphPoint {
  id: string;
  index: number;
  x: number;
  y: number;
  // Where the point's number sits, just outside the dot.
  numX: number;
  numY: number;
}

export interface GraphZone {
  id: string;
  core: boolean;
  x: number;
  y: number;
  hubR: number;
  haloR: number;
  label: { x: number; y: number; anchor: "start" | "middle" | "end" };
  // Hub to point, one per point.
  points: GraphPoint[];
}

export interface GraphLayout {
  zones: GraphZone[];
  // Outer zone to the nucleus edge, one per outer zone.
  spokes: { zone: string; x1: number; y1: number; x2: number; y2: number }[];
  // Point to point, as a quadratic curve.
  relations: { from: string; to: string; d: string }[];
}

export function layoutGraph(
  zones: readonly LayoutZoneInput[],
  relations: readonly LayoutRelationInput[],
  coreId: string,
): GraphLayout {
  const { cx, cy, rx, ry, nucleus } = GRAPH;
  const ring = zones.filter((z) => z.id !== coreId);
  const placed = new Map<string, GraphZone>();
  const pointsById = new Map<string, GraphPoint>();

  const place = (z: LayoutZoneInput, hx: number, hy: number, out: number) => {
    const core = z.id === coreId;
    const n = z.nodeCount;
    const points: GraphPoint[] = [];
    for (let i = 0; i < n; i++) {
      let an: number;
      let r: number;
      if (core) {
        an = rad(-90 + (i * 360) / n);
        r = 88;
      } else {
        const step = rad(Math.min(34, 190 / Math.max(1, n - 1)));
        an = out + (i - (n - 1) / 2) * step;
        // Six or more points alternate between two radii so they never touch.
        r = 80 + (n >= 6 && i % 2 ? 24 : 0);
      }
      const x = hx + Math.cos(an) * r;
      const y = hy + Math.sin(an) * r;
      const p: GraphPoint = {
        id: `${z.id}-${i}`,
        index: i,
        x: round(x),
        y: round(y),
        numX: round(x + Math.cos(an) * 17),
        numY: round(y + Math.sin(an) * 17 + 3.5),
      };
      points.push(p);
      pointsById.set(p.id, p);
    }

    let label: GraphZone["label"];
    if (core) label = { x: hx, y: hy + 44, anchor: "middle" };
    else {
      const c = Math.cos(out);
      const s = Math.sin(out);
      // Near the vertical axis the label sits on the inner side of the hub;
      // elsewhere it sits beside it, towards the centre.
      label =
        Math.abs(c) < 0.35
          ? { x: hx, y: hy - s * 50, anchor: "middle" }
          : {
              x: hx - Math.sign(c) * 28,
              y: hy - s * 22,
              anchor: c < 0 ? "start" : "end",
            };
    }

    placed.set(z.id, {
      id: z.id,
      core,
      x: round(hx),
      y: round(hy),
      hubR: core ? 19 : 14,
      haloR: core ? 36 : 27,
      label: { ...label, x: round(label.x), y: round(label.y) },
      points,
    });
  };

  const spokes: GraphLayout["spokes"] = [];
  zones.forEach((z) => {
    if (z.id === coreId) place(z, cx, cy, 0);
  });
  ring.forEach((z, i) => {
    const a = rad(-90 + (i * 360) / ring.length);
    const hx = cx + Math.cos(a) * rx;
    const hy = cy + Math.sin(a) * ry;
    place(z, hx, hy, Math.atan2(hy - cy, hx - cx));
    const d = Math.hypot(hx - cx, hy - cy);
    spokes.push({
      zone: z.id,
      x1: round(cx + ((hx - cx) / d) * nucleus),
      y1: round(cy + ((hy - cy) / d) * nucleus),
      x2: round(hx),
      y2: round(hy),
    });
  });

  const rels = relations.map((r) => {
    const a = pointsById.get(r.from);
    const b = pointsById.get(r.to);
    if (!a || !b) throw new Error(`Deep dive layout: ${r.from} -> ${r.to}`);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    // Bend away from the centre, so the lines do not pile up on the core.
    const dx = mx - cx;
    const dy = my - cy;
    const d = Math.hypot(dx, dy) || 1;
    const touchesCore =
      r.from.startsWith(`${coreId}-`) || r.to.startsWith(`${coreId}-`);
    const k = touchesCore ? 0 : 46;
    const qx = round(mx + (dx / d) * k);
    const qy = round(my + (dy / d) * k);
    return {
      from: r.from,
      to: r.to,
      d: `M${a.x} ${a.y} Q${qx} ${qy} ${b.x} ${b.y}`,
    };
  });

  // Keep the data's zone order in the output.
  const ordered = zones.map((z) => placed.get(z.id) as GraphZone);
  return { zones: ordered, spokes, relations: rels };
}

// Reduced graph for narrow screens: the zones only, the core at the centre.
export const MINI = { size: 360, ring: 128 };

export interface MiniZone {
  id: string;
  x: number;
  y: number;
  r: number;
  lines: { text: string; y: number }[];
}

// A label of 14 characters or more that has a space or a hyphen is split in
// two lines, at the break nearest the middle; the hyphen stays on line one.
export function wrapLabel(label: string): string[] {
  if (label.length < 14) return [label];
  let best = -1;
  for (let i = 0; i < label.length; i++) {
    const ch = label[i];
    if (ch !== " " && ch !== "-") continue;
    const cut = ch === "-" ? i + 1 : i;
    if (
      best < 0 ||
      Math.abs(cut - label.length / 2) < Math.abs(best - label.length / 2)
    )
      best = cut;
  }
  if (best <= 0) return [label];
  return [label.slice(0, best).trimEnd(), label.slice(best).trimStart()];
}

export function layoutMini(
  zones: readonly LayoutZoneInput[],
  coreId: string,
): { zones: MiniZone[]; spokes: { x: number; y: number }[] } {
  const c = MINI.size / 2;
  const ring = zones.filter((z) => z.id !== coreId);
  const out = new Map<string, MiniZone>();
  const spokes: { x: number; y: number }[] = [];

  const put = (
    z: LayoutZoneInput,
    x: number,
    y: number,
    r: number,
    below: boolean,
  ) => {
    const lines = wrapLabel(z.short);
    out.set(z.id, {
      id: z.id,
      x: round(x),
      y: round(y),
      r,
      lines: lines.map((text, i) => ({
        text,
        y: round(
          below
            ? y + r + 20 + i * 13
            : y - r - 12 - (lines.length - 1 - i) * 13,
        ),
      })),
    });
  };

  ring.forEach((z, i) => {
    const a = rad(-90 + (i * 360) / ring.length);
    const x = c + Math.cos(a) * MINI.ring;
    const y = c + Math.sin(a) * MINI.ring;
    spokes.push({ x: round(x), y: round(y) });
    put(z, x, y, 10, Math.sin(a) > -0.3);
  });
  zones.forEach((z) => {
    if (z.id === coreId) put(z, c, c, 15, true);
  });

  // Core last, so it paints over the spokes' inner ends.
  const ordered = [
    ...ring.map((z) => out.get(z.id) as MiniZone),
    ...zones
      .filter((z) => z.id === coreId)
      .map((z) => out.get(z.id) as MiniZone),
  ];
  return { zones: ordered, spokes };
}
