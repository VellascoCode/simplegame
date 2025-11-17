export const roadmapSteps = [
  "Etapa 1 — Autenticação + personagens",
  "Etapa 2 — Cidade com Phaser",
  "Etapa 3 — Movimentação básica",
  "Etapa 4 — Casa / Fazenda / Floresta / Lojas",
  "Etapa 5 — Inventário",
  "Etapa 6 — Lista de online",
  "Etapa 7 — Chat global"
] as const;

export const featureHighlights = [
  {
    title: "Fluxo fixo",
    description: "Nenhum atalho fora do README. Tudo acontece pelo servidor."
  },
  {
    title: "Tiles 32×32",
    description: "`tile1.png` e `tile2.png` (100×100) reamostrados no Phaser e no editor."
  },
  {
    title: "Personagens persistentes",
    description: "Até 4 slots por usuário. Sempre escolha um antes de clicar em Jogar."
  }
] as const;

export const loreSections = [
  {
    title: "Camadas do mapa",
    content:
      "Cada mapa usa camadas de piso, detalhes e construções (tile1 até tile6). O editor salva diretamente no servidor, garantindo que o Phaser carregue o JSON correto."
  },
  {
    title: "Estruturas obrigatórias",
    content:
      "Cidade, casa, fazenda, floresta e lojas possuem rotas e telas dedicadas. Todos os fluxos passam pelas APIs listadas no README."
  },
  {
    title: "Rotas de verificação",
    content:
      "As rotas `/api/check/*` seguem ativas para validar o ambiente rapidamente (auth, character, online, chat, inventory, house, farm, forest, shops)."
  }
] as const;

export const roadmapTiles = [
  {
    title: "Sessões seguras",
    subtitle: "ownerId",
    description: "Cookies HTTP-only + Mongo guardam o dono logado e o personagem escolhido."
  },
  {
    title: "Seleção obrigatória",
    subtitle: "character",
    description: "Até 4 personagens por conta — sempre escolha um antes de abrir a cidade."
  },
  {
    title: "HUD dinâmico",
    subtitle: "painéis slide",
    description: "Inventário, chat, conta e configurações usam os mesmos dados reais das rotas API."
  }
] as const;

export const assetHighlights = [
  { label: "Tilesets", value: "tile1.png até tile6.png" },
  { label: "Sprites", value: "warriorblue, lancer e futuros NPCs" },
  { label: "GUI", value: "Botões /public/gui + ícones personalizados" },
  { label: "Mapas", value: "city, house, farm, forest (JSON)" }
] as const;

export const showcaseClasses = [
  {
    name: "Guerreiro Azul",
    sprite: "/sprites/warriorblue/idle.png",
    role: "Frente de batalha",
    description: "Ataques corpo a corpo. Base para todos os testes de HUD e combate."
  },
  {
    name: "Lanceiro NPC",
    sprite: "/sprites/lancer/walk.png",
    role: "Hostil",
    description: "NPC experimental que caça o jogador e dispara eventos de XP/dano."
  },
  {
    name: "Explorador",
    sprite: "/tilesets/tile2.png",
    role: "Economia",
    description: "Placeholder para conectarmos cidade, casa, fazenda e floresta."
  }
] as const;

export const siteNavLinks = [
  {
    id: "portal",
    label: "Portal do jogo",
    description: "Notícias, roadmap e changelog",
    icon: "/icons/viewmap.png"
  },
  {
    id: "market",
    label: "Marketplace",
    description: "Itens oficiais e player market",
    icon: "/icons/playermarket.png"
  },
  {
    id: "wiki",
    label: "Wiki",
    description: "Guias de mapas, atributos e crafting",
    icon: "/icons/achievements.png"
  },
  {
    id: "forum",
    label: "Fórum",
    description: "Discussões gerais e suporte",
    icon: "/icons/chat.png"
  },
  {
    id: "achievements",
    label: "Arquivamentos",
    description: "Coleção de conquistas e títulos",
    icon: "/icons/achievements.png"
  }
] as const;
