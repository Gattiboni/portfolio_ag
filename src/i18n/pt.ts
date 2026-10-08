// Portuguese dictionary. Typed as Dictionary so the compiler rejects any key
// that is missing from, or not present in, en.ts.

import type { Dictionary } from "./en";

export const pt: Dictionary = {
  meta: {
    title: "Alan Gattiboni · Data & AI Solutions Architect",
    description:
      "Arquiteto de soluções de dados e IA. Plataformas data-driven em produção: arquitetura medallion, copilotos de dados em linguagem natural, automação e governança.",
    ogTitle: "Alan Gattiboni · Data & AI Solutions Architect",
    ogDescription:
      "Plataformas de dados e IA que saem do diagnóstico e chegam em produção.",
  },
  a11y: {
    langGroup: "Idioma",
    langPt: "Português",
    langEn: "English",
    menu: "Menu",
    galleryPrev: "Imagens anteriores",
    galleryNext: "Próximas imagens",
    lightbox: "Visualização ampliada",
    lightboxClose: "Fechar",
    lightboxPrev: "Anterior",
    lightboxNext: "Próxima",
    chatDemo:
      "Demonstração ilustrativa do MãoChat, copiloto de dados em linguagem natural",
    sectionIndex: "Seções desta página",
    backToTop: "Voltar ao topo",
    sectionPosition: "Seção {n} de {total}: {label}",
  },
  nav: {
    brandHtml: "Alan <em>Gattiboni</em>",
    about: "Sobre",
    help: "Como eu ajudo",
    case: "Case principal",
    projects: "Projetos",
    contact: "Contato",
  },
  hero: {
    role: "Data & AI Solutions Architect · São Paulo",
    phraseHtml:
      'A I.A. tem o potencial de nos devolver <span class="thin">o que há de mais humano:</span> <span class="gold-i">o nosso tempo.</span>',
    subHtml:
      "Eu construo plataformas de dados e IA que fazem exatamente isso: <strong>tiram decisões do escuro e devolvem tempo</strong> para quem opera o negócio. Do diagnóstico à produção.",
    cue: "conheça a história",
  },
  about: {
    eyebrow: "Sobre mim",
    titleHtml:
      "Quinze anos dentro da operação.<br>Hoje, construindo <em>o que sempre faltou nela.</em>",
    p1Html:
      "Passei quinze anos dentro de operações: hotelaria, varejo, serviços. Expansão de unidades, reestruturação, gestão financeira, times multidisciplinares. Aprendi como uma operação funciona de verdade. <strong>Onde o dado nasce, onde ele se perde,</strong> e o quanto de decisão é tomada no escuro porque a informação certa não chegou a tempo.",
    p2Html:
      "Foi essa vivência que me levou para o outro lado da mesa. Não como virada de carreira. <strong>Como consequência:</strong> depois de anos sentindo na pele a falta da camada de dados, decidi construí-la. Hoje projeto e implemento plataformas de dados e IA de ponta a ponta: arquitetura, pipelines, modelagem semântica, governança, interface. <strong>Do diagnóstico à produção.</strong>",
    pull: "Quinze anos tocando projetos me ensinaram o que o dado precisa responder. Quando virei engenheiro, eu já sabia onde ele nasce e onde ele se perde.",
    metric1Value: "R$ 1,1 mi → R$ 11 mi",
    metric1Label: "receita anual da operação que liderei como Managing Partner",
    metric2Value: "15 mil usuários",
    metric2Label: "no aplicativo da startup que cofundei",
    educationLabel: "Formação",
    education:
      "MBA em Inteligência Artificial (Ibmec) · Bacharelado em Administração Hoteleira · SCRUM Master",
    toolsLabel: "Ferramentas",
    tools:
      "Python · SQL · PostgreSQL · FastAPI · React · LLM APIs · RAG · NL-to-SQL · MCP ·",
    toolsGovernance: "governança e LGPD",
    languagesLabel: "Idiomas",
    languages: "Português (nativo), inglês (C2), espanhol (fluente)",
  },
  help: {
    eyebrow: "Como eu ajudo",
    titleHtml: "Do problema de negócio <em>à solução rodando.</em>",
    sub: "Quatro frentes, um mesmo princípio: tecnologia só vale se simplificar a vida de quem usa.",
    items: [
      {
        title: "Diagnóstico & consultoria",
        text: "Entro na operação, mapeio onde o dado nasce, onde ele se perde e onde a decisão é tomada no escuro. Saio com um plano priorizado, não com um relatório de gaveta.",
      },
      {
        title: "Automação & IA aplicada",
        text: "Rotinas manuais viram fluxos automáticos; perguntas repetitivas viram respostas instantâneas. IA generativa, integrações e automação a serviço de tempo recuperado.",
      },
      {
        title: "Plataformas de dados ponta a ponta",
        text: "Quando o problema é maior, eu construo a solução inteira: arquitetura, pipelines, governança e interface. Dado espalhado em planilha vira decisão na tela.",
      },
      {
        title: "Educação & adoção",
        text: "Tecnologia sem adoção é custo. Treinamentos, mentorias e workshops para times e gestores usarem IA no dia a dia, com segurança e critério.",
      },
    ],
  },
  manifesto: {
    eyebrow: "Ponto de vista",
    p1Html:
      "Qualquer um pluga um LLM num banco de dados. <strong>Quase todos esses projetos morrem</strong>, porque o modelo alucina em cima de dado sujo.",
    p2Html:
      'O trabalho difícil não é a interface. É <span class="g">a arquitetura embaixo dela</span>: dados consolidados, contratos claros, governança, curadoria humana. <span class="t">É isso que eu construo</span>, e o case a seguir é a prova.',
  },
  work: {
    eyebrow: "Como eu trabalho",
    titleHtml:
      "Primeiro o problema em linguagem simples. <em>Depois o código.</em>",
    items: [
      {
        title: "Spec antes do código.",
        text: "O problema em linguagem natural, depois critérios de aceite que dá pra verificar, depois o código.",
      },
      {
        title: "Agentes de código, com portões.",
        text: "Desde o fim de 2023. O plano é revisado antes de qualquer arquivo ser tocado; diff e testes antes de qualquer coisa entrar. O agente nunca faz commit.",
      },
      {
        title: "Incremental, modular, zero dívida.",
        text: "Nenhuma decisão trava a próxima. Qualquer fonte entra ou sai sem reescrita.",
      },
      {
        title: "Evidência, não slide.",
        text: "Demonstração em dado real. Changelog e decision log fecham junto com a entrega, não depois.",
      },
    ],
  },
  case: {
    eyebrow: "Case principal · em produção",
    titleHtml: "Central de Dados RH <em>&amp; MãoChat</em>",
    sub: "Plataforma de dados de RH e CSC construída do zero para uma operação logística de grande porte. Dados que viviam espalhados em planilhas e controles manuais, consolidados numa arquitetura medallion e servidos em linguagem natural, em português e mandarim.",
    layers: [
      {
        tag: "Bronze",
        title: "Ingestão bruta",
        text: "Pipelines modulares integrando múltiplas fontes: parquet, ponto eletrônico, terceirizados, bases de RH. Fontes plugam e desplugam sem reescrever o núcleo.",
      },
      {
        tag: "Silver",
        title: "Dado confiável",
        text: "Limpeza, normalização e contratos de dados por camada. Modelagem semântica validada domínio a domínio com quem é dono do negócio.",
      },
      {
        tag: "Gold",
        title: "Decisão na tela",
        text: "Métricas prontas para consumo: dashboards, APIs e o MãoChat respondendo perguntas de negócio na hora, com autonomia de quem pergunta.",
      },
    ],
    detailTitleHtml: "O copiloto: <em>MãoChat</em>",
    detailP1:
      "O usuário de negócio pergunta em português ou mandarim, do jeito que falaria com um colega, e recebe o dado direto na tela. Por trás, um loop de aprendizado supervisionado refina as respostas a cada ciclo, com fila de propostas e curadoria humana obrigatória antes de qualquer coisa entrar em produção.",
    detailP2:
      "A plataforma cobre headcount, benefícios, presenteísmo e batimento de ponto, recrutamento, terceirizados, compliance trabalhista e avaliações 360. Governança de ponta a ponta: LGPD, autenticação e controle de acesso, telemetria de uso.",
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
        title: "Em produção",
        text: "plataforma viva, com usuários reais e telemetria",
      },
      {
        title: "~100 releases, 231 decisões",
        text: "cada decisão registrada com o porquê",
      },
      {
        title: "Bilíngue PT-BR | 中文",
        text: "interface e copiloto nos dois idiomas",
      },
      {
        title: "Projetada e construída do zero",
        text: "da arquitetura de dados ao frontend",
      },
    ],
  },
  chat: {
    avatar: "M",
    name: "MãoChat",
    status: "Central de Dados RH · online",
    field: "Pergunte em português ou 中文…",
    note: "demonstração ilustrativa · linguagem natural → SQL → resposta, com curadoria humana",
    sqlLabel: "bastidor · SQL gerado",
    scenes: [
      {
        question: "Quantos colaboradores ativos temos hoje, por regional?",
        sql: "SELECT regional, COUNT(*)\nFROM gold.headcount\nWHERE status = 'ativo'\nGROUP BY regional;",
        answer:
          "Headcount ativo por regional na tela. Sudeste concentra a maior parte do quadro. Quer abrir por centro de custo?",
      },
      {
        question: "今天出勤率是多少？",
        sql: "SELECT ROUND(AVG(presenca),1)\nFROM gold.presenteismo\nWHERE data = CURRENT_DATE;",
        answer:
          "出勤率已生成。Presenteísmo do dia calculado e comparado com a média do mês.",
      },
      {
        question: "Como está o funil de recrutamento das vagas abertas?",
        sql: "SELECT etapa, COUNT(*)\nFROM gold.recrutamento\nWHERE vaga_status = 'aberta'\nGROUP BY etapa;",
        answer:
          "Funil por etapa pronto. A maior concentração está em triagem. Posso detalhar por área contratante.",
      },
    ],
  },
  projects: {
    eyebrow: "Projetos selecionados",
    titleHtml: "Do diagnóstico <em>à entrega.</em>",
    sub: "Antes da plataforma, uma trilha de projetos em varejo, hotelaria, SaaS, alimentação e serviços B2B — pela Gattiboni Enterprises.",
    items: [
      {
        kind: "Plataforma de IA",
        title: "Savvy AI",
        text: "Plataforma de IA para redução de custos e automação em restaurantes, do COGS ao cardápio digital.",
        tools: "LLMs · Python · automação",
      },
      {
        kind: "Produto independente",
        title: "SPH Control",
        text: "Aplicativo de controle de despesas pessoais, desenvolvido de ponta a ponta de forma independente.",
        tools: "desenvolvimento full-cycle",
      },
      {
        kind: "Geointeligência",
        title: "Mapas inteligentes",
        text: "Mapeamento geoespacial para inteligência comercial e análise de territórios no agronegócio, e visualização de frotas logísticas.",
        tools: "Kepler.gl · Python · JSON",
      },
      {
        kind: "Dados & risco",
        title: "Dashboards preditivos",
        text: "Gestão financeira colaborativa com classificação de risco e background check automatizado de parceiros e revendas.",
        tools: "ML · dashboards · automação",
      },
      {
        kind: "Educação",
        title: "IA pra Todxs",
        text: "Consultoria autoral, mentorias e treinamentos em IA aplicada para times e gestores, com foco prático e educação acessível.",
        tools: "workshops · adoção de IA",
      },
      {
        kind: "Identidade & produto",
        title: "Design system na entrega",
        text: "Identidade visual e design system tratados como parte do produto: arquitetura técnica e camada de marca na mesma entrega, não isoladas.",
        tools: "branding · design system · estratégia digital",
      },
    ],
  },
  gallery: {
    label: "Telas · clique para ampliar",
    items: [
      {
        title: "SPH Control · painel do dia",
        caption: "budget diário · resumo do mês",
        alt: "SPH Control: painel diário de despesas com budget, transações e notificações",
      },
      {
        title: "SPH Control · revisão",
        caption: "transações pendentes",
        alt: "SPH Control: tela de revisão de transações pendentes",
      },
      {
        title: "SPH Control · acesso e feed",
        caption: "login · atividades do dia",
        alt: "SPH Control: login e feed de atividades do dia",
      },
      {
        title: "Dashboard financeiro",
        caption: "contas a pagar · visão preditiva",
        alt: "Dashboard de contas a pagar com valores agregados por classificação e data",
      },
      {
        title: "Branding book",
        caption: "identidade · manual de marca",
        alt: "Capa do branding book da Pousada Ilha Faceira",
      },
    ],
  },
  marquee: {
    items: [
      "Python",
      "SQL · PostgreSQL",
      "Arquitetura medallion",
      "LLM APIs",
      "RAG",
      "NL-to-SQL",
      "MCP",
      "FastAPI",
      "React",
      "ETL",
      "Governança · LGPD",
      "Kepler.gl",
    ],
  },
  contact: {
    eyebrow: "Contato",
    titleHtml: "Tem um problema de dados esperando <em>virar decisão?</em>",
    sub: "Do diagnóstico à produção. Vamos conversar.",
    email: "Enviar e-mail",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
  },
  footer: {
    location: "São Paulo, Brasil",
    source: "Código no GitHub",
  },
};
