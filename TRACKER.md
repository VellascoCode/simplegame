# STATUS DO MVP
- Estrutura Next.js/TypeScript ativa com rotas server-side, telas de todas as etapas do MVP, Phaser na cidade, inventário/online/chat integrados e rotas `/api/check` respondendo conforme exigido.

# TAREFAS REALIZADAS
- Leitura integral do README e documentação viva em `TRACKER.md`.
- Runtime PIXI recebeu estabilização do HUD/combate (refs fixas para artefatos, carregamento de XP/hp sem `xpStats` fora da ordem, cleanup seguro da aplicação e dependências corretas no `useEffect`), acabando com os erros `Cannot access 'xpStats' before initialization` e `instance.destroy is not a function`.
- Todo o código Phaser que ainda residia em `components/game/**`, `components/CityPhaser.tsx` e `hooks/useSessionPosition.ts` foi movido para `legacy/phaser/**`, cumprindo a regra de separar o legado e eliminando centenas de lint errors de `Phaser`/`AbortSignal`.
- Componentes de inventário/chat/online foram ajustados para não deixarem Promises soltas e agora usam `next/image` nos ícones (somando com o novo menu flutuante em `/play`) para atender o lint do Next.
- Instalação das dependências (Next.js, TypeScript, Phaser, MongoDB Driver, Zod) e configuração (`tsconfig.json`, `next.config.js`, `.env.example`, `next-env.d.ts`).
- Estruturação dos diretórios obrigatórios em `/app`, `/api` e `/public`.
- Implementação completa das rotas REST (auth, character, inventory, house, farm, forest, online, chat, check) com validações Zod e fallback de persistência.
- Telas `/login`, `/character`, `/play`, `/house`, `/farm`, `/forest`, `/shops`, `/chat` desenvolvidas conforme etapas 1 a 7.
- Phaser inicializado em `/app/play` com movimentação básica, inventário e lista de online com polling.
- Inventário, chat global e lista de online integrados com polling (10s / 3s) e manipulação direta das rotas.
- Documento `passoapasso.md` criado para guiar execução/tarefas utilizando o conteúdo de `assets.md`.
- Landing `/` redesenhada com Tailwind (tema madeira), hero explicativo, destaques do README e modais exclusivos para registro/login.
- Painel “Minha Conta” (após login) mostra dados do jogador, criação/seleção de personagens e botão “Jogar”; menu inferior estilo HUD dá acesso às rotas Admin/Casa/Fazenda/etc.
- Última rota visitada é armazenada no `localStorage` e pode ser retomada pela landing; o menu inferior atualiza esse estado automaticamente.
- Backend ajustado para múltiplos personagens por usuário, limite de 4, rotas `/api/character/get` com lista/detalhe e normalização dos dados Mongo/memória.
- Script `npm run dev` fixado na porta 3001 e `next.config.js` compatível com Next 16.
- Piso da cidade utiliza `tile1.png` até `tile6.png` (100×100 → 64×64) e é carregado a partir de `/api/city/map`.
- `/api/city/map` criado (GET/POST) persistindo `public/maps/map_city.json`; o editor `/editor` importa o mapa atual, ajusta largura/altura (até 64×40) e salva direto no jogo.
- Cidade ganhou NPCs soldados azuis com falas aleatórias, player maior, câmera seguindo e controle virtual para mobile.
- Inventário agora é um grid 5x4 com slots e itens predefinidos (poções de mana/vida) que empilham até 100 unidades.
- Chat agora aceita nome do personagem, mostra o nome real nas mensagens e abre em um modal flutuante com som ao abrir.
- Sprites dos personagens passaram a ter metadados (run/idle) em `lib/characterSprites.ts`, usados tanto no preview da landing quanto no Phaser.
- Criação de personagem recebeu seleção de espírito (fundo `/public/spirit/{1..4}.png`), escolha visual de corpo (warrior/pingu) e 4 filtros de cor com persistência (`spriteColor`/`spiritId`).
- Pingu teve spritesheet normalizado (5 frames 112×128) e a UI agora mostra os cards animados com a cor aplicada.
- Personagens agora armazenam atributos base (FOR/DEX/INT/CON/SORTE = 10) e pontos livres iniciais (5) diretamente no documento (`attributes` + `attributePoints`) para uso futuro.
- Runtime PIXI agora carrega o sprite/cor reais do personagem da sessão e remove o erro transitório de `destroy()` ao inicializar o mapa.
- Teleportes dos mapas foram destacados com `tile104.png` e ganharam animação: ao pisar, o jogador pisca 1s com mensagem “Teletransportando…” antes de trocar de mapa.
- Combate no runtime PIXI recebeu temporizadores de 1s para ambos os lados, dano flutuante/sons por ataque e XP, e o agressor do Refúgio agora se move suavemente sem “tremor”, mostra o HP perdido acima da cabeça e toca efeitos de morte/teleporte.
- NPCs amigáveis da cidade foram consolidados em um único arquivo (`npc/data/city.json`) para facilitar manutenção.
- Motor PIXI monitora a conectividade: se o servidor ou rede cair, o mapa pausa, exibe aviso (“Sem conexão / Reconectando”) e só recarrega quando a conexão volta, evitando jogo offline/cheats.
- Bug do MonsterActor quebrando o runtime (acesso `worldPosition` após `destroy`) foi corrigido com cache da última posição, eliminando o erro “Cannot read properties of null”.
- Camada de detalhes ganhou paleta própria (`public/tilesets/details/`) e o editor consegue alternar entre piso/detalhes/construções com pincéis 1×1~3×3.
- Build do `/pixieditor` estabilizado reorganizando os hooks (`setOrbTile`, `loadMapByName`, etc.) em `components/PixiEditor.tsx`, eliminando o `ReferenceError: Cannot access 'eX' before initialization` durante o `next build`.
- `next.config.js` voltou a executar lint e checagem de tipos no `next build` (remoção de `ignoreDuringBuilds`/`ignoreBuildErrors`) e a tipagem foi corrigida em toda a base (MapListPanel/TileSelect do editor, guardas do `PixiGame`, utilitários legacy em `legacy/phaser/**`, enums de sprites e `lib/auth*`), permitindo builds limpos mesmo em ambientes Node 16 usando `npx node@18.19.1`.
- Script `npm run lint` agora roda `eslint .` sem filtro de extensão e o legado foi sanado: `app/play-legacy/page.tsx` não tem mais hooks condicionais (QuickSlots/ChatDrawer foram refeitos e passaram a usar `next/image`), o runtime Phaser (`legacy/phaser/**`) teve imports/constantes corrigidos (carregamento dinâmico do Phaser, dependências dos `useEffect`, InputController seguro, etc.) e o build do Next volta a completar sem erros de tipagem.
- Personagem principal usa `public/sprites/warriorblue/walk.png` com animação e escala maior (≈140 px) para coincidir com o layout solicitado.
- Layout global sem sidebar fixa — hub `/` centraliza toda navegação.
- Estilização geral ajustada para tons de madeira (cards, botões, modais) em vez dos assets anteriores.
- Estrutura do mapa passou a contar com as camadas `ground/detail/buildings/tints/collision/cover`, manifest dinâmico (`/api/tiles`) e Phaser com colisões configuráveis, NPCs visíveis e profundidade por Y.
- Todo o runtime legado (Phaser) foi movido para `legacy/phaser/**`, deixando `pixi/runtime/**` como única fonte ativa para o jogo.
- Editor `/editor` ganhou PIN 8989, paletas automáticas, borracha/preencher camada, preview ("lupa"), seleção de tints/bloqueio/sobreposição e salva direto em `public/maps/map_city.json`.
- Menu inferior agora flutua diretamente sobre o mapa da cidade e o jogador exibe nome + nível acima da cabeça (escala ajustada), melhorando o HUD solicitado.
- HUD básico (HP/Energia/XP + nível) reposicionado como overlay no canto superior esquerdo do mapa, com barras estilo GUI medieval.
- Execução do lint deixou de ficar oculta: polyfills para `structuredClone`/`AbortSignal.throwIfAborted` garantem que `npm run lint` e o VS Code reportem todas as pendências reais.
- Inventário lateral foi removido: agora há atalhos rápidos configuráveis (4 slots) sobre o mapa e um menu inferior com botões quadrados para inventário, chat, logout, conta e configurações, cada um abrindo painéis deslizantes próprios.
- Sistema de combate experimental com lanceiros (`/sprites/lancer`) adicionado: eles patrulham, perseguem o jogador, atacam com animações/sons, exibem dano/flutuação de XP (+2 por kill) e fazem respawn automático.
- Sessão do jogador agora usa NextAuth (Credentials + JWT) + persistência no banco: `/api/session/*` salva personagem ativo, mapa e posição, e `/play` não depende mais de query string.
- Quick slots agora persistem em `/api/quickslots` e o Phaser envia atualizações da posição (`/api/session/position`), permitindo refresh do mapa sem perder estado.
- NPCs amigáveis da cidade foram recriados em `npc/data/cidadecentral/*.json` (guardas usam warriorblue com tint e villagers usam sprites 128 px fatiados corretamente).
- HUD do PIXI agora fica no canto esquerdo mostrando Cidade/X,Y e barras de Vida/Mana/XP alimentadas pelos stats retornados em `/api/session/state`.
- XP e níveis passaram a seguir `lib/data/leveling.json` (50 XP por nível, barra reinicia) e o player exibe “LVL {n} | Iniciante” acima do nome com texto flutuante a cada level up.
- Adicionamos a animação `effect/lvlup.png` (8 frames) para reforçar o level up dentro do mapa.
- Estrutura do repositório passou a ser rastreada em `docs/estruturacao.md` (organização de Pixi/NPC/Monstros/Mapas).
- Refúgio ganhou o monstro agressivo “Sentinela Sombria” (respawn 5s, HP 10, dano do jogador 1–3, concede 1–2 XP) definido em `monsters/data/refugio/`, usando o spritesheet `warriorblue`.
- Três guardiões coloridos adicionais (Rubro, Gélido e Esmeralda) foram adicionados em `monsters/data/refugio`, cada um com raio de patrulha próprio e XP configurável via JSON.
- O ciclo de vida do Application do PIXI agora é destruído com segurança (cancelando o auto-resize), acabando com o erro `_cancelResize is not a function` e com os crashes ao ler `app.renderer.width`.
- Combate PIXI passou a reservar SQMs em torno do jogador (3×3) — cada monstro ganha um slot único, anda SQM a SQM e respeita o raio configurado no JSON, evitando sobreposição no mesmo tile.
- Monstros exibem nome/raridade/caveira/HP na cabeça, deixam cadáver (1 min), largam loot configurável (stack com timer de 5 min) e o player coleta passando por cima com aviso visual + envio automático ao inventário/ouro.
- Reforçamos as regras de combate SQM (3×3): cada monstro ocupa um dos slots em torno do player, anda SQM a SQM e só pode atacar/receber dano quando estiver adjacente.
- Menu de ações agora fica em um botão flutuante no topo direito com painel deslizante, incluindo toggle para a nova lista de mapa (NPCs/Monstros com raridade/perigo/HP em tempo real).

# TAREFAS PENDENTES
- Conectar ao MongoDB real (`MONGODB_URI`) e validar persistência em ambiente integrado.
- Popular mapas/tilesets reais (cidade, casa, fazenda, floresta, lojas) e sprites definitivos.
- Revisar regras de jogo (colisões avançadas, portas, economia das lojas) após assets reais.
- Completar assets obrigatórios descritos no README e validar pipeline de importação `/public`.
- Escrever testes automatizados para rotas críticas e fluxos de autenticação/inventário.
- Gerar arquivos `map_city.json`, `map_farm.json`, `map_forest.json`, `map_house.json` usando tilesets 32×32.
- Criar rotina de seleção de personagem também dentro de `/play` para validar estado carregado e sprites quando assets estiverem prontos.
- Refinar o HUD da cidade (inventário rápido com slots verticais, botão de inventário sobre o mapa e chat modal animado com identificação do personagem) conforme o layout solicitado.
- Documentar e monitorar a adição de novos tiles (`/public/tilesets/**`) garantindo que o manifest continue atualizado e registrado no `assets.md`/`passoapasso.md`.
- Integrar `spriteColor` e `spiritId` na renderização in-game (Pixi/Phaser) para refletir as escolhas feitas na landing.
- Planejar UI de distribuição dos atributos (consumindo `attributePoints`) e refletir os valores dentro do combate/HUD.

# API CHECKLIST
- [x] `POST /api/auth/register`
- [x] `POST /api/auth/login`
- [x] `GET /api/auth/logout`
- [x] `POST /api/character/create`
- [x] `GET /api/character/get`
- [x] `POST /api/online/ping`
- [x] `GET /api/online/list`
- [x] `POST /api/chat/send`
- [x] `GET /api/chat/get`
- [x] `POST /api/inventory/add`
- [x] `POST /api/inventory/remove`
- [x] `GET /api/inventory/get`
- [x] `GET /api/house/get`
- [x] `POST /api/house/update`
- [x] `GET /api/farm/get`
- [x] `POST /api/farm/plant`
- [x] `POST /api/farm/harvest`
- [x] `POST /api/forest/kill`
- [x] `GET /api/check/auth`
- [x] `GET /api/check/character`
- [x] `GET /api/check/online`
- [x] `GET /api/check/chat`
- [x] `GET /api/check/inventory`
- [x] `GET /api/check/house`
- [x] `GET /api/check/farm`
- [x] `GET /api/check/forest`
- [x] `GET /api/check/shops`

# MAPAS PENDENTES
- Cidade base (piso pedra, gramados, casas pequenas, praça central) → `map_city.json`.
- Casa simples (interior madeira, móveis básicos) → `map_house.json`.
- Fazenda com 4 áreas de plantio → `map_farm.json`.
- Floresta com slime e objetos → `map_forest.json`.
- Layout das 3 lojas obrigatórias (pode compartilhar mapas ou salas dedicadas).

# ASSETS GERADOS
- Cartas espirituais (`/public/spirit/1.png` até `4.png`) com dados descritivos registrados em `lib/data/spirits.json`.
- Spritesheet `public/sprites/pinguin1/walk.png` ajustado para 5 frames de 112×128 px.

# ASSETS FALTANDO
- Tileset cidade
- Tileset casa
- Tileset fazenda
- Tileset floresta
- Sprites personagem
- Sprites lojas
- Criatura floresta
- Ícones inventário
- Pixel art cidade (plaza, casas, piso)
- Pixel art casa (interior madeira)
- Pixel art fazenda (plots e ferramentas)
- Pixel art floresta (árvores, rochas, slime)
- Sprite personagem base (4 direções, idle e walk)
- Pixel art lojas (interior com itens)

# ERROS DETECTADOS
- Nenhum erro identificado até o momento.

# PRÓXIMAS AÇÕES
- Configurar `MONGODB_URI` real e rodar as rotas contra o banco definitivo.
- Evoluir os mapas placeholders para tilesets e assets finais descritos no README.
- Ajustar balanceamento das lojas/inventário após sincronizar economia completa.
- Criar mapas JSON iniciais e conectar o carregamento no Phaser (cidade primeiro, em seguida casa/fazenda/floresta).
- Integrar o editor `/editor` ao backend (persistência + importação automática no `CityScene`).
- Validar o novo HUD da cidade (slots rápidos, botão do inventário e chat flutuante) antes de seguir para casa/fazenda/floresta.
- Aplicar o sprite/espírito escolhido no runtime (tint em Pixi/Phaser + assets específicos) para fechar o fluxo da criação visual.
- Expandir o sistema de monstros (mais mapas / drops) seguindo o modelo `monsters/data/<mapa>/`.
