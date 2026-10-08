// English dictionary. Its shape is the contract: pt.ts must match it key for
// key (enforced by the Dictionary type). Copy is ported verbatim from the
// production site; only the changes recorded in D005 differ.
//
// Keys ending in "Html" hold trusted inline markup and are rendered with
// set:html. Every other string is plain text and is escaped on render.

export const en = {
  meta: {
    title: "Alan Gattiboni · Data & AI Solutions Architect",
    description:
      "Data & AI solutions architect. Data-driven platforms in production: medallion architecture, natural-language data copilots, automation and governance.",
    ogTitle: "Alan Gattiboni · Data & AI Solutions Architect",
    // No English og:description existed in production; the meta description
    // is reused instead of writing new copy.
    ogDescription:
      "Data & AI solutions architect. Data-driven platforms in production: medallion architecture, natural-language data copilots, automation and governance.",
  },
  a11y: {
    langGroup: "Idioma / Language",
    langPt: "Português",
    langEn: "English",
    menu: "Menu",
    galleryPrev: "Previous images",
    galleryNext: "Next images",
    lightbox: "Enlarged view",
    lightboxClose: "Close",
    lightboxPrev: "Previous",
    lightboxNext: "Next",
    chatDemo: "Illustrative demo of MãoChat, a natural-language data copilot",
  },
  nav: {
    brandHtml: "Alan <em>Gattiboni</em>",
    about: "About",
    help: "How I help",
    case: "Flagship case",
    projects: "Projects",
    contact: "Contact",
  },
  hero: {
    role: "Data & AI Solutions Architect · São Paulo",
    phraseHtml:
      'A.I. has the potential to give us back <span class="thin">what is most human:</span> <span class="gold-i">our time.</span>',
    subHtml:
      "I build data and AI platforms that do exactly that — <strong>they pull decisions out of the dark and give time back</strong> to the people running the business. From diagnosis to production.",
    cue: "here’s the story",
  },
  about: {
    eyebrow: "About me",
    titleHtml:
      "Fifteen years inside operations.<br>Now building <em>what they always lacked.</em>",
    p1Html:
      "I spent fifteen years inside operations: hospitality, retail, services. Opening new units, restructuring, financial management, cross-functional teams. I learned how an operation really works. <strong>Where data is born, where it gets lost,</strong> and how many decisions are made in the dark because the right information never arrived in time.",
    p2Html:
      "That experience is what took me to the other side of the table. Not a career change — <strong>a consequence:</strong> after years of feeling the missing data layer firsthand, I decided to build it. Today I design and implement end-to-end data and AI platforms: architecture, pipelines, semantic modeling, governance, interface. <strong>From diagnosis to production.</strong>",
    pull: "I don’t come from engineering. I come from operations — and that’s what makes the difference in what I build: I’ve been the user who needed the data and didn’t have it.",
    metric1Value: "R$1.1M → R$11M",
    metric1Label: "annual revenue of the operation I led as Managing Partner",
    metric2Value: "15k users",
    metric2Label: "on the app of the startup I co-founded",
    educationLabel: "Education",
    education:
      "MBA in Artificial Intelligence (Ibmec) · BA in Hotel Management · SCRUM Master",
    toolsLabel: "Tools",
    tools:
      "Python · SQL · PostgreSQL · FastAPI · React · LLM APIs · RAG · NL-to-SQL · MCP ·",
    toolsGovernance: "governance & LGPD",
    languagesLabel: "Languages",
    languages: "Fluent in Portuguese, Spanish and English",
  },
  help: {
    eyebrow: "How I help",
    titleHtml: "From business problem <em>to a solution that runs.</em>",
    sub: "Four fronts, one principle: technology is only worth it if it makes life simpler for the people who use it.",
    items: [
      {
        title: "Diagnosis & consulting",
        text: "I go inside the operation and map where data is born, where it gets lost and where decisions are made in the dark. I leave with a prioritized plan — not a report for the drawer.",
      },
      {
        title: "Automation & applied AI",
        text: "Manual routines become automated flows; repetitive questions become instant answers. Generative AI, integrations and automation in the service of time recovered.",
      },
      {
        title: "End-to-end data platforms",
        text: "When the problem is bigger, I build the whole solution: architecture, pipelines, governance and interface. Data scattered across spreadsheets becomes decisions on screen.",
      },
      {
        title: "Education & adoption",
        text: "Technology without adoption is just cost. Training, mentoring and workshops for teams and leaders to use AI day to day — with safety and judgment.",
      },
    ],
  },
  manifesto: {
    eyebrow: "Point of view",
    p1Html:
      "Anyone can plug an LLM into a database. <strong>Almost all of those projects die</strong>, because the model hallucinates on top of dirty data.",
    p2Html:
      'The hard work isn’t the interface. It’s <span class="g">the architecture underneath it</span>: consolidated data, clear contracts, governance, human curation. <span class="t">That’s what I build</span> — and the case below is the proof.',
  },
  case: {
    eyebrow: "Flagship case · in production",
    titleHtml: "Central de Dados RH <em>&amp; MãoChat</em>",
    sub: "An HR & shared-services data platform built from scratch for a large logistics operation. Data that lived scattered across spreadsheets and manual controls, consolidated into a medallion architecture and served in natural language, in Portuguese and Mandarin.",
    layers: [
      {
        tag: "Bronze",
        title: "Raw ingestion",
        text: "Modular pipelines integrating multiple sources: parquet files, time-clock systems, contractors, HR databases. Sources plug in and out without rewriting the core.",
      },
      {
        tag: "Silver",
        title: "Trustworthy data",
        text: "Cleaning, normalization and per-layer data contracts. Semantic modeling validated domain by domain with the business owners.",
      },
      {
        tag: "Gold",
        title: "Decisions on screen",
        text: "Metrics ready for consumption: dashboards, APIs and MãoChat answering business questions on the spot, giving autonomy to whoever asks.",
      },
    ],
    detailTitleHtml: "The copilot: <em>MãoChat</em>",
    detailP1:
      "Business users ask in Portuguese or Mandarin, the way they’d talk to a colleague, and get the data straight on screen. Behind it, a supervised learning loop refines answers with every cycle, with a proposal queue and mandatory human curation before anything reaches production.",
    detailP2:
      "The platform covers headcount, benefits, attendance and time-clock reconciliation, recruiting, contractors, labor compliance and 360 reviews. End-to-end governance: LGPD (Brazil’s data protection law), authentication and access control, usage telemetry.",
    chips: [
      "Python",
      "PostgreSQL",
      "FastAPI",
      "React",
      "LLM APIs",
      "NL-to-SQL",
      "MCP",
      "ETL",
      "LGPD",
      "JWT / RBAC",
    ],
    facts: [
      {
        title: "In production",
        text: "a living platform, with real users and telemetry",
      },
      {
        title: "8 HR domains modeled",
        text: "each validated with its business owners",
      },
      {
        title: "Bilingual PT-BR | 中文",
        text: "interface and copilot in both languages",
      },
      {
        title: "Designed and built from scratch",
        text: "from data architecture to frontend",
      },
    ],
  },
  chat: {
    avatar: "M",
    name: "MãoChat",
    status: "Central de Dados RH · online",
    field: "Ask in Portuguese or 中文…",
    note: "illustrative demo · natural language → SQL → answer, with human curation",
    sqlLabel: "behind the scenes · generated SQL",
    scenes: [
      {
        question: "How many active employees do we have today, by region?",
        sql: "SELECT regional, COUNT(*)\nFROM gold.headcount\nWHERE status = 'ativo'\nGROUP BY regional;",
        answer:
          "Active headcount by region is on screen. The Southeast concentrates most of the workforce. Want to break it down by cost center?",
      },
      {
        question: "今天出勤率是多少？",
        sql: "SELECT ROUND(AVG(presenca),1)\nFROM gold.presenteismo\nWHERE data = CURRENT_DATE;",
        answer:
          "出勤率已生成。Today’s attendance rate calculated and compared against the monthly average.",
      },
      {
        question: "How is the recruiting funnel for the open positions?",
        sql: "SELECT etapa, COUNT(*)\nFROM gold.recrutamento\nWHERE vaga_status = 'aberta'\nGROUP BY etapa;",
        answer:
          "Funnel by stage is ready. The largest concentration is in screening. I can break it down by hiring area.",
      },
    ],
  },
  projects: {
    eyebrow: "Selected projects",
    titleHtml: "From diagnosis <em>to delivery.</em>",
    sub: "Before the platform, a track record across retail, hospitality, SaaS, food service and B2B services — through Gattiboni Enterprises.",
    items: [
      {
        kind: "AI platform",
        title: "Savvy AI",
        text: "An AI platform for cost reduction and automation in restaurants, from COGS to digital menus.",
        tools: "LLMs · Python · automation",
      },
      {
        kind: "Independent product",
        title: "SPH Control",
        text: "A personal expense tracking app, developed end to end independently.",
        tools: "full-cycle development",
      },
      {
        kind: "Geointelligence",
        title: "Smart maps",
        text: "Geospatial mapping for commercial intelligence and territory analysis in agribusiness, plus logistics fleet visualization.",
        tools: "Kepler.gl · Python · JSON",
      },
      {
        kind: "Data & risk",
        title: "Predictive dashboards",
        text: "Collaborative financial management with risk scoring and automated background checks of partners and resellers.",
        tools: "ML · dashboards · automation",
      },
      {
        kind: "Education",
        title: "IA pra Todxs",
        text: "Independent consulting, mentoring and applied-AI training for teams and leaders, with a practical focus and accessible education.",
        tools: "workshops · AI adoption",
      },
      {
        kind: "Identity & product",
        title: "Design system as part of delivery",
        text: "Visual identity and design systems treated as part of the product: technical architecture and brand layer in the same delivery, not in silos.",
        tools: "branding · design system · digital strategy",
      },
    ],
  },
  gallery: {
    label: "Screens · click to enlarge",
    // Same order as the images listed in Gallery.astro.
    items: [
      {
        title: "SPH Control · daily panel",
        caption: "daily budget · monthly summary",
        alt: "SPH Control: daily expense panel with budget, transactions and notifications",
      },
      {
        title: "SPH Control · review",
        caption: "pending transactions",
        alt: "SPH Control: pending transactions review screen",
      },
      {
        title: "SPH Control · access & feed",
        caption: "login · daily activity",
        alt: "SPH Control: login and daily activity feed",
      },
      {
        title: "Finance dashboard",
        caption: "accounts payable · predictive view",
        alt: "Accounts payable dashboard with values aggregated by category and date",
      },
      {
        title: "Branding book",
        caption: "identity · brand manual",
        alt: "Cover of the Pousada Ilha Faceira branding book",
      },
    ],
  },
  marquee: {
    items: [
      "Python",
      "SQL · PostgreSQL",
      "Medallion architecture",
      "LLM APIs",
      "RAG",
      "NL-to-SQL",
      "MCP",
      "FastAPI",
      "React",
      "ETL",
      "Governance · LGPD",
      "Kepler.gl",
    ],
  },
  contact: {
    eyebrow: "Contact",
    titleHtml: "Got a data problem waiting <em>to become a decision?</em>",
    sub: "From diagnosis to production. Let’s talk.",
    email: "Email me",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
  },
  footer: {
    location: "São Paulo, Brazil",
    backToTop: "back to top ↑",
  },
};

export type Dictionary = typeof en;
