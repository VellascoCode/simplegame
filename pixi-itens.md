# PIXI — Itens e Próximos Passos

## Mudanças aplicadas
- Player aceita teclas seguradas: InputController rastreia `heldDirections` e o update SQM dispara movimentos contínuos sem quebrar a fila do `moveTo`.
- Path via clique continua SQM→SQM, aborta ao encontrar bloqueio e nunca altera diretamente `view.position`.
- Camera mantém clamp perfeito: pivot segue o player com limites e `container.position` nunca mostra “preto” fora do mundo.
- Balões dos NPCs renderizados no overlay com escala + outline branco/preto, fundo 0.6 e canto 14px (visíveis mesmo fora do canvas) e textos coloridos.
- Joystick voltou a funcionar (toggle com hitArea explícita, eventos bloqueiam propagação enquanto aberto).
- PixiEditor agora lê automaticamente todos os PNG de `/public/tilesets`, suporta Layer 0/Layer 1 independentes (com overlay azul/roxo para indicar a layer passiva), pincéis 1×1 / 2×2 / 3×3, Fill/Clear por layer e brush, Block Mode com overlay 15%, resize seguro (sem sumir o mapa) e um orbe animado (corrida rápida, sem “tic-tac”) que anda via WASD/setas enquanto a câmera acompanha.
- O formato salvo passou a incluir `tilesLayer0/1/2` + `buildingOverlay` (com compatibilidade para mapas antigos via `tiles`), e `/api/maps/list|load|save` + `/lib/maps.ts` agora persistem o JSON enriquecido em `/maps/{nome}.json`.
- Painel de tiles reorganizado em grid responsivo (3→5 colunas) com highlight em forma de `ring`.
- Pintura com brush agora normaliza matrizes herdadas de mapas antigos (sem Layer 1 ou com linhas incompletas), evitando crashes ao clicar em mapas salvos antes da mudança de camadas.
- Layer 2 (Buildings) adicionada: matriz, sprites, container Pixi e overlays independentes seguem a ordem Grid → Layer 0 → Layer 1 → Layer 2 → Blocks, com sprites de detalhes/prédios ancorados na base (suporte nativo a 64/128/256 px) e highlight azul/roxo mostrando as layers passivas. Editor modularizado (TileSelect, LayerControls, OverlayControls, BlockControls) para manter a UI legível.
- Eraser com glow vermelho + brush 1×1/2×2/3×3: apaga tiles aplicando o fallback correto por layer, limpa blocos quando Block Mode + Eraser estão ativos e respeita pincel grande para tiles e bloqueios.
- Editor só cria o mapa “liso” padrão quando realmente não há `?map=` na URL; se a query existe ele espera carregar antes de construir o default (evita sobrescrever arquivos antigos).
- Salvamento/carregamento agora usam `/maps-data` (com leitura de fallback em `/maps`). Isso evita rebuild infinito no dev server e mantém os JSON legados intactos (copiados uma vez para o novo diretório).
- Overlay de buildings: botão “Sobrepor” (apenas na Layer 2) cria matrizes `top/bottom`, salva no JSON e divide o sprite — parte superior sobe para um container exclusivo acima do player, parte inferior fica no layer normal. O pincel (1×1/2×2/3×3) respeita o modo e o brush passou a pintar áreas maiores de fato.
- Lista de tiles agrupada por pasta (`tilesets`, `details`, `buildings` etc.) com seletor; o editor só mostra o grupo ativo para evitar overload visual.
- PixiGame agora carrega automaticamente o mapa `cidadecentral` via `/api/maps/load`, monta o Tilemap com `tilesLayer0/blocks` reais, renderiza details/buildings (com overlay top/bottom real) e inicia o player no meio do mapa central.
- NPCs data-driven: JSON em `npc/data/villagers.json` define falas/hues/posições, `VillagerNpc` fatiando `/sprites/vilager1/walk.png` colore os sprites e o jogo injeta 4 villagers patrulhando a praça com balloon.

## Próximas prioridades
1. **Pathfinding refinado** — substituir rota em “L” por algoritmo que desvie de obstáculos e mouse long-press.
2. **Camadas collision/cover** — carregar JSON do editor e aplicar bloqueios reais (player + NPC) usando as novas layers.
3. **Indicadores visuais** — preview do tile alvo + partícula de confirmação no clique/touch.
4. **Persistência** — salvar posição do player/NPC via `/api/session/*` e restaurar no load.
5. **Camera presets** — permitir zoom configurável (desktop/mobile) sem quebrar clamp atual.
6. **PixiEditor 2.0** — ligar Layer 1 ao jogo (decor/collision real), adicionar flood fill/undo/redo, pan/zoom com mouse e salvar múltiplas camadas extras (cover/collision) no mesmo JSON.

## Bugs corrigidos
- Player não “pulava” mais para tiles distantes ao clicar rapidamente.
- Balões não sumiam mais ao sair do viewport e ficaram legíveis (texto branco com contorno).
- Joystick abre/fecha corretamente e não vaza eventos para o mapa.
- Camera não exibe mais vazios pretos nos cantos.
- Editor salva/carrega JSON real, inclui três layers (0/1/2) com pincéis grandes + overlay top/bottom, componentes desacoplados e o resize preserva o desenho (mantendo blocos/tiles) enquanto o orbe continua na posição correta.
- Resize do editor deixou de “sumir” o mapa e o orbe não volta mais para o centro quando pintamos tiles.
- Brush aplica corretamente em blocos/tiles (inclusive Eraser), prevenindo “teleporte” ou offset quando usamos 2×2/3×3 em mapas antigos.
- Pintura com brush não dispara mais erro “Cannot set properties of undefined” quando carregamos mapas antigos sem Layer 1.

## Bugs / riscos conhecidos
- Path em “L” ainda atravessa colisões porque não lê `collision/cover`.
- NPCs usam frases em loop sem sincronizar com player (pode sobrepor HUD).
- Faltam efeitos visuais para toque e indicador de destino.
- Sem persistência de posição (refresh reseta spawn).
- PixiEditor ainda não envia Layer 1/blocks para o runtime principal, falta pan/zoom via mouse (só WASD), flood fill/undo e leitura de collision real.
- Falta testar Layer 2 + blocos no jogo (colisão continua lendo só layer/base), não há undo/flood fill/pan com mouse, o overlay azul ainda cobre o mapa todo quando a layer ativa ≠ 0 e o corte da sobreposição considera apenas a altura `>64px` (tiles menores não mostram diferença).

## Status rápido
- **Player:** click + teclado suaves; falta pathfinding inteligente.
- **NPCs:** spawn fixo 4×4~7×5, balões estilizados, patrulha restrita; aguardando falas contextuais.
- **Camera:** clamp sólido seguindo o player; zoom ainda fixo.
- **Joystick/Input:** toggle funcional, bloqueia eventos enquanto aberto, suporte a teclas seguradas ativo.
- **Editor:** canvas Pixi com grid, três layers (0 chão, 1 detalhes, 2 buildings) com overlay azul/roxo, pincéis 1×1/2×2/3×3, Eraser dedicado, Fill/Clear/Resize, Block Mode visual com brush, WASD p/orbe, salvar/carregar JSON (falta pan/zoom do mouse, undo/flood fill e integração direta com o jogo).
