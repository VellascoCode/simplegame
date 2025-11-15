# STATUS DO MVP
- Estrutura Next.js/TypeScript ativa com rotas server-side, telas de todas as etapas do MVP, Phaser na cidade, inventário/online/chat integrados e rotas `/api/check` respondendo conforme exigido.

# TAREFAS REALIZADAS
- Leitura integral do README e documentação viva em `TRACKER.md`.
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
- Camada de detalhes ganhou paleta própria (`public/tilesets/details/`) e o editor consegue alternar entre piso/detalhes/construções com pincéis 1×1~3×3.
- Personagem principal usa `public/sprites/warriorblue/walk.png` com animação e escala maior (≈140 px) para coincidir com o layout solicitado.
- Layout global sem sidebar fixa — hub `/` centraliza toda navegação.
- Estilização geral ajustada para tons de madeira (cards, botões, modais) em vez dos assets anteriores.
- Estrutura do mapa passou a contar com as camadas `ground/detail/buildings/tints/collision/cover`, manifest dinâmico (`/api/tiles`) e Phaser com colisões configuráveis, NPCs visíveis e profundidade por Y.
- Editor `/editor` ganhou PIN 8989, paletas automáticas, borracha/preencher camada, preview ("lupa"), seleção de tints/bloqueio/sobreposição e salva direto em `public/maps/map_city.json`.
- Menu inferior agora flutua diretamente sobre o mapa da cidade e o jogador exibe nome + nível acima da cabeça (escala ajustada), melhorando o HUD solicitado.
- HUD básico (HP/Energia/XP + nível) reposicionado como overlay no canto superior esquerdo do mapa, com barras estilo GUI medieval.
- Inventário lateral foi removido: agora há atalhos rápidos configuráveis (4 slots) sobre o mapa e um menu inferior com botões quadrados para inventário, chat, logout, conta e configurações, cada um abrindo painéis deslizantes próprios.
- Sistema de combate experimental com lanceiros (`/sprites/lancer`) adicionado: eles patrulham, perseguem o jogador, atacam com animações/sons, exibem dano/flutuação de XP (+2 por kill) e fazem respawn automático.
- Sessão do jogador agora usa NextAuth (Credentials + JWT) + persistência no banco: `/api/session/*` salva personagem ativo, mapa e posição, e `/play` não depende mais de query string.
- Quick slots agora persistem em `/api/quickslots` e o Phaser envia atualizações da posição (`/api/session/position`), permitindo refresh do mapa sem perder estado.

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
- Nenhum asset gerado até o momento.

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
