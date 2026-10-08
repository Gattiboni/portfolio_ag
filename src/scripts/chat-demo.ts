// Chat demo loop: question bubble, typing indicator, answer typed out
// character by character, then a collapsible block with the generated SQL.
// Scenes and labels come from the page's dictionary via data attributes on
// #chatCard, so each page plays the scenes of its own language.

interface Scene {
  question: string;
  sql: string;
  answer: string;
}

const TYPE_SPEED_MS = 16;

function isScene(value: unknown): value is Scene {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.question === "string" &&
    typeof v.sql === "string" &&
    typeof v.answer === "string"
  );
}

function parseScenes(raw: string | undefined): Scene[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isScene) : [];
  } catch {
    return [];
  }
}

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function initChatDemo(): void {
  const card = document.getElementById("chatCard");
  const body = document.getElementById("chatBody");
  if (!card || !body) return;
  const scenes = parseScenes(card.dataset.scenes);
  const sqlLabel = card.dataset.sqlLabel ?? "";
  if (scenes.length === 0) return;

  const noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const userBubble = (text: string): void => {
    const m = document.createElement("div");
    m.className = "msg user";
    m.textContent = text;
    body.appendChild(m);
  };

  const typingBubble = (): HTMLElement => {
    const m = document.createElement("div");
    m.className = "msg bot typing";
    m.append(
      document.createElement("i"),
      document.createElement("i"),
      document.createElement("i"),
    );
    body.appendChild(m);
    return m;
  };

  const botBubble = (): { bubble: HTMLElement; text: HTMLElement } => {
    const bubble = document.createElement("div");
    bubble.className = "msg bot";
    const text = document.createElement("span");
    text.className = "txt";
    bubble.appendChild(text);
    body.appendChild(bubble);
    return { bubble, text };
  };

  const typeInto = (el: HTMLElement, text: string): Promise<void> =>
    new Promise((resolve) => {
      if (noMotion) {
        el.textContent = text;
        resolve();
        return;
      }
      let i = 0;
      const tick = (): void => {
        if (i < text.length) {
          el.textContent += text.charAt(i++);
          setTimeout(tick, TYPE_SPEED_MS);
        } else {
          resolve();
        }
      };
      tick();
    });

  const sqlDetail = (sql: string): HTMLDetailsElement => {
    const details = document.createElement("details");
    details.className = "sql";
    const summary = document.createElement("summary");
    summary.textContent = sqlLabel;
    const pre = document.createElement("pre");
    pre.textContent = sql;
    details.append(summary, pre);
    return details;
  };

  const loop = async (): Promise<void> => {
    for (let s = 0; ; s = (s + 1) % scenes.length) {
      const scene = scenes[s];
      if (!scene) return;
      body.replaceChildren();
      userBubble(scene.question);
      await wait(noMotion ? 800 : 700);
      const typing = typingBubble();
      await wait(noMotion ? 400 : 1200);
      typing.remove();
      const { bubble, text } = botBubble();
      await typeInto(text, scene.answer);
      bubble.appendChild(sqlDetail(scene.sql));
      await wait(noMotion ? 6000 : 5200);
    }
  };

  void loop();
}
