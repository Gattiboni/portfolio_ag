// Deep-dive content: one data file per locale, typed here and validated when
// this module loads. Pages import it during the build, so a broken file
// fails the build instead of shipping a graph with a dangling line.
import type { Locale } from "../../config/site";
import en from "../../data/deep-dive/content.en.json";
import pt from "../../data/deep-dive/content.pt.json";

export interface DeepDiveNode {
  title: string;
  plain: string;
  // Trusted HTML written by us: paragraphs, lists, code, pre.
  deepHtml: string;
}

export interface DeepDiveZone {
  id: string;
  // Two digits, "01" to "08"; also picks the zone's colour token.
  number: string;
  title: string;
  short: string;
  plain: string;
  lead: string;
  nodes: DeepDiveNode[];
}

// Point to point, by "<zone>-<index>".
export interface DeepDiveRelation {
  from: string;
  to: string;
  why: string;
}

// Outer zone to the architecture.
export interface DeepDiveCoreRelation {
  zone: string;
  why: string;
}

export interface DeepDiveContent {
  meta: { title: string; description: string };
  page: {
    back: string;
    eyebrow: string;
    titleHtml: string;
    facts: { value: string; label: string }[];
  };
  card: { kicker: string; title: string; text: string };
  // The bar item on the home page that opens this page.
  nav: { label: string };
  ui: {
    graphLabel: string;
    miniLabel: string;
    howTo: string;
    hint: string;
    zone: string;
    allZones: string;
    backTo: string;
    linkedTo: string;
    restsOn: string;
    supports: string;
    showDetail: string;
    hideDetail: string;
    detail: string;
    listTitle: string;
    filter: string;
    filterLabel: string;
    expandAll: string;
    collapseAll: string;
  };
  zones: DeepDiveZone[];
  relations: DeepDiveRelation[];
  coreRelations: DeepDiveCoreRelation[];
}

// The zone at the centre of the graph.
export const CORE_ZONE = "arch";

// Number of --zone-N tokens in tokens.css.
const ZONE_TOKENS = 8;

const contents: Record<Locale, DeepDiveContent> = { en, pt };

export const nodeId = (zoneId: string, index: number) => `${zoneId}-${index}`;

export const zoneColor = (zone: DeepDiveZone) =>
  `var(--zone-${Number(zone.number)})`;

// Replaces "{key}" with its value. Throws when a placeholder is left over,
// so no "{...}" can reach the generated HTML.
export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  const out = template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
  const left = out.match(/\{\w+\}/);
  if (left) throw new Error(`Deep dive: unresolved ${left[0]} in "${out}"`);
  return out;
}

function checkLocale(locale: Locale, c: DeepDiveContent): string[] {
  const errors: string[] = [];
  const err = (msg: string) => errors.push(`[${locale}] ${msg}`);
  const zoneIds = new Set<string>();
  const numbers = new Set<number>();
  const nodes = new Set<string>();

  for (const z of c.zones) {
    if (zoneIds.has(z.id)) err(`zone "${z.id}" is declared twice`);
    zoneIds.add(z.id);
    const n = Number(z.number);
    if (!Number.isInteger(n) || n < 1 || n > ZONE_TOKENS)
      err(`zone "${z.id}" has number "${z.number}", outside 1-${ZONE_TOKENS}`);
    else if (numbers.has(n)) err(`zone number ${z.number} is used twice`);
    numbers.add(n);
    z.nodes.forEach((_, i) => nodes.add(nodeId(z.id, i)));
  }
  if (!zoneIds.has(CORE_ZONE))
    err(`the central zone "${CORE_ZONE}" is missing`);
  if (!c.nav.label.trim()) err(`nav.label is empty`);

  for (const r of c.relations) {
    for (const end of [r.from, r.to])
      if (!nodes.has(end))
        err(`relation ${r.from} -> ${r.to} points to "${end}", not a point`);
  }

  const covered = new Set<string>();
  for (const r of c.coreRelations) {
    if (r.zone === CORE_ZONE)
      err(`a coreRelation points to the architecture itself`);
    else if (!zoneIds.has(r.zone))
      err(`coreRelation points to "${r.zone}", not a zone`);
    else if (covered.has(r.zone)) err(`zone "${r.zone}" has two coreRelations`);
    covered.add(r.zone);
  }
  for (const id of zoneIds)
    if (id !== CORE_ZONE && !covered.has(id))
      err(`zone "${id}" has no coreRelation`);

  return errors;
}

// Shape that must match across locales: zone ids, points per zone, relation
// pairs and core relations, all in order.
function skeleton(c: DeepDiveContent) {
  return {
    zones: c.zones.map((z) => `${z.id}:${z.nodes.length}`).join(" "),
    relations: c.relations.map((r) => `${r.from}>${r.to}`).join(" "),
    coreRelations: c.coreRelations.map((r) => r.zone).join(" "),
  };
}

function validate(): void {
  const errors = (Object.keys(contents) as Locale[]).flatMap((l) =>
    checkLocale(l, contents[l]),
  );
  const a = skeleton(contents.en);
  const b = skeleton(contents.pt);
  for (const key of Object.keys(a) as (keyof typeof a)[])
    if (a[key] !== b[key])
      errors.push(
        `en and pt differ in ${key}:\n  en: ${a[key]}\n  pt: ${b[key]}`,
      );
  if (errors.length)
    throw new Error(`Deep dive content is invalid:\n- ${errors.join("\n- ")}`);
}

validate();

export interface DeepDive extends DeepDiveContent {
  pointCount: number;
  zoneById: (id: string) => DeepDiveZone;
  // The point with this id, with its zone and index.
  point: (id: string) => {
    zone: DeepDiveZone;
    index: number;
    node: DeepDiveNode;
  };
  // Every relation that touches a point, seen from that point.
  linksOf: (id: string) => { other: string; why: string }[];
  coreWhy: (zoneId: string) => string;
}

export function getDeepDive(locale: Locale): DeepDive {
  const c = contents[locale];
  const zoneById = (id: string) => {
    const z = c.zones.find((zone) => zone.id === id);
    if (!z) throw new Error(`Deep dive: no zone "${id}"`);
    return z;
  };
  return {
    ...c,
    pointCount: c.zones.reduce((sum, z) => sum + z.nodes.length, 0),
    zoneById,
    point: (id) => {
      const cut = id.lastIndexOf("-");
      const zone = zoneById(id.slice(0, cut));
      const index = Number(id.slice(cut + 1));
      const node = zone.nodes[index];
      if (!node) throw new Error(`Deep dive: no point "${id}"`);
      return { zone, index, node };
    },
    linksOf: (id) =>
      c.relations
        .filter((r) => r.from === id || r.to === id)
        .map((r) => ({ other: r.from === id ? r.to : r.from, why: r.why })),
    coreWhy: (zoneId) =>
      c.coreRelations.find((r) => r.zone === zoneId)?.why ?? "",
  };
}
