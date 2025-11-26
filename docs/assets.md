# 🎨 ASSETS — Tiny Swords (Free Pack)
Guia completo de onde cada asset está localizado e como deve ser usado no projeto.

---

# 1. Tilemaps (64px in-game)
Local principal: `/public/tilesets/*`

Arquivos:
- `Tilemap_color1.png`
- `Tilemap_color2.png`
- `Tilemap_color3.png`
- `Tilemap_color4.png`
- `Tilemap_color5.png`
- `Water Background color.png`
- `Water Foam.png`
- `Shadow.png`

Características:
- Grid: **32 × 32 pixels**
- Tamanho total: **576 × 384**
- Uso: mapas da cidade, fazenda, floresta e interiores simples.

### 1.1 Piso customizado (`tile*.png`)
- Local: `/public/tilesets/tile1.png`, `tile2.png`, … (`tileN.png`).
- Dimensão: **100 × 100** cada (1 tile por arquivo) — o manifest `/api/tiles` gera automaticamente os IDs na ordem alfanumérica.
- Uso:
  - `CityPhaser` reamostra cada PNG para 64×64 e monta o mapa lógico (padrão 32×20 células, ajustável até 64×40).
  - Editor `/editor` trabalha sobre a matriz e permite selecionar `ground/detail/buildings/tints/collision/cover` com pincéis 1×1~3×3.
- Observação: manter os arquivos 100×100 para preservar o redimensionamento consistente.

### 1.2 Mapas JSON
- Local: `/maps-data/map_city.json`
- API dedicada: `GET/POST /api/city/map`
- Estrutura:
  ```json
  {
    "ground": number[][],
    "detail": number[][],
    "buildings": number[][],
    "tints": number[][],
    "collision": number[][],
    "cover": number[][]
  }
  ```
- Uso:
  - O editor `/editor` carrega/salva esse arquivo diretamente (botão “Salvar mapa”) e exibe uma “lupa” (preview) da região editada.
  - `ground/detail` usam `tile*.png`, `buildings` usa `/public/tilesets/buildings/*`, `tints` aplica cores extras no piso, `collision` marca tiles bloqueados e `cover` define onde o jogador passa por trás das construções.

---

# 2. Construções
Local: `/public/tilesets/buildings`

Arquivos incluem:
- Casas (House1, House2, House3)
- Castelos
- Estruturas azuis/vermelhas

Características:
- Padrão: múltiplos tiles 32×32
- Uso: cidade e lojas

---

# 3. Decorações / Details
Local: `/public/tilesets/details`

Arquivos:
- Árvores
- Pedras
- Arbustos
- Flores
- Pequenos objetos

Uso:
- Cidade
- Floresta
- Fazenda
- Casa (layer `detail` no editor)

---

# 4. Criaturas (Enemies & Animals)
Local: `/public/sprites/creatures`

Arquivos:
- Goblins
- Knights
- Pequenos monstros

Uso:
- Criatura básica da floresta (MVP)
- Futuras expansões de combate

---

# 5. Personagens (Player Placeholder)
Local: `/public/sprites/characters`

Arquivos:
- Sprites humanos simples
- 4 direções
- Idle + walk

Uso:
- Personagem inicial do jogador (até criar o Rafael 2D)
- `public/sprites/warriorblue/walk.png` possui 6 frames (192×192 cada) na direção direita. No Phaser:
  - Esquerda: aplicar `setFlipX(true)` para espelhar.
  - Cima/baixo: manter a animação lateral apenas movendo o sprite verticalmente.
- `public/sprites/warriorblue/idle.png` replica o sprite parado; as animações (idle/run) são configuradas em `lib/characterSprites.ts` para manter cada personagem com metadados de frames/tamanho.
- Guardas amigáveis e monstros agressivos reaproveitam `warriorblue/walk.png` (6 frames, 192×192) definindo `frameWidth/frameHeight` e `size` nos arquivos `npc/data/**` e `monsters/data/**`.
- Villagers usam `public/sprites/vilager1/walk.png` (8 frames, 128×128 por frame).
- Monstros agressivos (ex.: Sentinela Sombria) ficam descritos em `monsters/data/<mapa>/*.json` e podem reutilizar sprites existentes (`/sprites/lancer/walk.png`, etc.) informando `frameWidth/frameHeight/size`.
- `public/sprites/pinguin1/walk.png` traz 5 frames (112×128) — altura 128 px, largura 112 px por frame, usado para o corpo “Pingu Explorador”.

---

# 6. Itens & Armas
Local: `/public/icons`

Arquivos:
- Espadas
- Escudos
- Poções
- Ferramentas
- Recursos

Uso:
- Lojas
- Craft
- Inventário

---

# 7. UI (Interface)
Local: `/public/ui`

Arquivos:
- Botões
- Painéis
- Banners
- Setas
- Marcadores

Uso:
- Interface do jogo
- Inventário
- Chat
- Lojas

---

# 8. HUD / GUI (Landing & HUD)
Local: `/public/gui`

Conteúdo:
- `Banner_*.svg` — botões principais estilo HUD (landing page usa os azul/laranja).
- `Box_*.svg` — painéis arredondados/quadrados para modais, cartões e HUD do jogo.
- `TextBox_*.svg` — balões para textos de missões/diálogos.

Uso:
- Landing page `/` (hero, modais de registro/login/seleção).
- Overlays in-game (inventário, HUD de ações, notificações futuras).

---

# 9. Espíritos Controladores
Local: `/public/spirit`

Arquivos:
- `1.png`, `2.png`, `3.png`, `4.png`

Uso:
- Cartas na criação de personagem (landing `/`) para representar os seres que assumem o corpo iniciante.
- Os metadados (nome, classe, elemento, mundo) ficam em `lib/data/spirits.json` e são consumidos na UI e na API ao salvar `spiritId`.

---

# 10. Efeitos
Local: `/public/effect`

Arquivos:
- `teleport.png` — spritesheet 11 frames (128 px) usado no efeito de teleporte.
- `lvlup.png` — spritesheet 8 frames (128×116) usado na animação de level up do personagem.
- `itens/dead.png` — sprite 64×64 exibido no corpo do monstro derrotado.

Uso:
- A animação é registrada em `lib/effects.ts` e carregada no runtime Pixi para o feedback visual dos portais (`tile104`), do level up (efeito “LVL {n}”) e dos corpos/loot drops dos monstros.

---

# 11. Como o CODEX deve usar estes assets
1. Importar tilesets com `Phaser.Tilemap` usando grid 32×32  
2. Carregar as imagens via:
   ```ts
   this.load.image("terrain1", "/tilesets/terrain/Tilemap_color1.png")
   ```
3. Criar mapas JSON simples (1 layer) usando o tamanho 32×32  
4. Personagens carregados como spritesheet:
   ```ts
   this.load.spritesheet("player", "/sprites/characters/player.png", { frameWidth: 32, frameHeight: 32 });
   ```
5. Estrutura de mapas:
   - cidade: usar `Tilemap_colorX.png`
- casa: usar land tiles + few decor
- fazenda: usar soil + decor
- floresta: usar trees + terrain

---

# 10. Próximos Passos
- Criar `map_city.json`
- Criar `map_farm.json`
- Criar `map_forest.json`
- Criar `map_house.json`
- Implementar carregamento dos mapas em Phaser
- Adicionar colisões
