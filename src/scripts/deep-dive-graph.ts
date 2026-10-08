// State of the deep-dive graph and its panel. The SVG and every panel view
// are in the HTML (built from the content files); this script only decides
// which zone and point are active, toggles classes and `hidden`, and moves
// focus. Without it, zones and points are plain links into the list.
//
// Keyboard: the eight zones are tab stops; a zone's points become tab stops
// only while that zone is active. Enter (native on links) or Space selects.
// Selecting moves focus to the heading of the panel view that opened; the
// panel's back buttons return it to the zone or point in the graph.

interface State {
  zone: string | null;
  node: string | null;
}

const zoneOf = (nodeId: string) => nodeId.slice(0, nodeId.lastIndexOf("-"));

// Let the browser handle new-tab and new-window clicks.
const modified = (e: MouseEvent) =>
  e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

export function initDeepDiveGraph(): void {
  const svg = document.querySelector<SVGSVGElement>("svg[data-dd-graph]");
  const panel = document.querySelector<HTMLElement>("[data-dd-panel]");
  const tip = document.querySelector<HTMLElement>("[data-dd-tip]");
  if (!svg || !panel || !tip) return;

  const core = svg.dataset.core ?? "";
  const groups = [...svg.querySelectorAll<SVGGElement>("g[data-zone-group]")];
  const hubs = [...svg.querySelectorAll<SVGAElement>("a.dd-hub")];
  const points = [...svg.querySelectorAll<SVGAElement>("a.dd-nd")];
  const spokes = [...svg.querySelectorAll<SVGLineElement>("[data-spoke]")];
  const relations = [...svg.querySelectorAll<SVGPathElement>("path[data-a]")];
  const views = [...panel.querySelectorAll<HTMLElement>("[data-view]")];

  let state: State = { zone: null, node: null };

  const hubOf = (zone: string) => hubs.find((h) => h.dataset.zone === zone);
  const pointOf = (id: string) => points.find((p) => p.dataset.node === id);

  // A point view always opens with its technical detail folded.
  function foldDetail(view: HTMLElement): void {
    const more = view.querySelector<HTMLButtonElement>(".dd-more");
    const deep = view.querySelector<HTMLElement>(".dd-deep");
    if (!more || !deep) return;
    more.setAttribute("aria-expanded", "false");
    more.textContent = more.dataset.show ?? "";
    deep.hidden = true;
  }

  const render = (): void => {
    const { zone, node } = state;
    if (zone) svg.dataset.zone = zone;
    else delete svg.dataset.zone;

    groups.forEach((g) =>
      g.classList.toggle("on", g.dataset.zoneGroup === zone),
    );
    hubs.forEach((h) => {
      if (h.dataset.zone === zone) h.setAttribute("aria-current", "true");
      else h.removeAttribute("aria-current");
    });

    const peers = new Set<string>();
    relations.forEach((r) => {
      const a = r.dataset.a ?? "";
      const b = r.dataset.b ?? "";
      const touches = !!node && (a === node || b === node);
      if (touches) peers.add(a === node ? b : a);
      r.classList.toggle("on", touches);
      r.classList.toggle(
        "zon",
        !node && !!zone && (zoneOf(a) === zone || zoneOf(b) === zone),
      );
    });

    points.forEach((p) => {
      const id = p.dataset.node ?? "";
      p.setAttribute("tabindex", zoneOf(id) === zone ? "0" : "-1");
      p.classList.toggle("sel", id === node);
      p.classList.toggle("peer", peers.has(id));
      if (id === node) p.setAttribute("aria-current", "true");
      else p.removeAttribute("aria-current");
    });

    spokes.forEach((s) =>
      s.classList.toggle("on", zone === core || s.dataset.spoke === zone),
    );

    const shown = node ?? zone ?? "home";
    views.forEach((v) => {
      const on = v.dataset.view === shown;
      if (on && v.hidden) foldDetail(v);
      v.hidden = !on;
    });
  };

  function select(zone: string | null, node: string | null): void {
    state = { zone, node };
    render();
  }

  // Selecting from the graph or the panel: focus the heading that opened.
  function open(zone: string, node: string | null): void {
    select(zone, node);
    const view = views.find((v) => !v.hidden);
    view?.querySelector<HTMLElement>("h2")?.focus();
  }

  // Graph: zones and points.
  function activate(target: EventTarget | null): boolean {
    const link = (target as Element | null)?.closest<SVGAElement>(
      "a.dd-hub, a.dd-nd",
    );
    if (!link) return false;
    const node = link.dataset.node;
    if (node) open(zoneOf(node), node);
    else if (link.dataset.zone) open(link.dataset.zone, null);
    return true;
  }
  svg.addEventListener("click", (e) => {
    if (modified(e)) return;
    if (activate(e.target)) e.preventDefault();
  });
  // Enter fires a click on links; Space has to be handled here.
  svg.addEventListener("keydown", (e) => {
    if (e.key !== " ") return;
    if (activate(e.target)) e.preventDefault();
  });

  // Panel: rows, links between points, back buttons, technical detail.
  panel.addEventListener("click", (e) => {
    const el = (e.target as Element).closest<HTMLElement>("a, button");
    if (!el) return;

    if (el.classList.contains("dd-more")) {
      const view = el.closest<HTMLElement>("[data-view]");
      const deep = view?.querySelector<HTMLElement>(".dd-deep");
      if (!deep) return;
      const expand = deep.hidden;
      deep.hidden = !expand;
      el.setAttribute("aria-expanded", String(expand));
      el.textContent = (expand ? el.dataset.hide : el.dataset.show) ?? "";
      return;
    }
    if (el.hasAttribute("data-back-home")) {
      const left = state.zone;
      select(null, null);
      if (left) hubOf(left)?.focus();
      return;
    }
    if (el.dataset.backZone) {
      const left = state.node;
      select(el.dataset.backZone, null);
      if (left) pointOf(left)?.focus();
      return;
    }
    if (el instanceof HTMLAnchorElement && modified(e)) return;
    if (el.dataset.node) {
      e.preventDefault();
      open(zoneOf(el.dataset.node), el.dataset.node);
    } else if (el.dataset.zone) {
      e.preventDefault();
      open(el.dataset.zone, null);
    }
  });

  // Name of a point on hover or focus. Position comes from the point's
  // build-time coordinates (data-x, data-y), not from measuring the page.
  const showTip = (target: EventTarget | null): void => {
    const p = (target as Element | null)?.closest<SVGAElement>("a.dd-nd");
    if (!p) return hideTip();
    const group = p.closest<SVGGElement>("g[data-zone-group]");
    const zc = group?.style.getPropertyValue("--zc");
    tip.style.setProperty("--x", p.dataset.x ?? "50%");
    tip.style.setProperty("--y", p.dataset.y ?? "50%");
    if (zc) tip.style.setProperty("--zc", zc);
    tip.classList.toggle("below", p.hasAttribute("data-below"));
    const [small, span] = tip.children;
    if (small) small.textContent = p.dataset.tipZone ?? "";
    if (span) span.textContent = p.dataset.tipTitle ?? "";
    tip.classList.add("on");
  };
  const hideTip = (): void => {
    tip.classList.remove("on");
  };
  svg.addEventListener("pointerover", (e) => showTip(e.target));
  svg.addEventListener("pointerout", hideTip);
  // On the wrapper, not the SVG: Chrome makes an SVG element with focus
  // listeners a tab stop of its own.
  const wrapper = svg.parentElement ?? svg;
  wrapper.addEventListener("focusin", (e) => showTip(e.target));
  wrapper.addEventListener("focusout", hideTip);

  render();
}
