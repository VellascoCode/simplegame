# 🚀 Migração para PIXI.JS — Checklist

Documento incremental para controlar a transição do Phaser (legado) para o novo runtime PIXI.JS.

---

## 1. Base Pixi
- [x] Instalar `pixi.js`
- [x] Criar arquitetura modular `src/core`, `src/scenes`, `src/systems`, `src/entities`, `src/ui`
- [x] Adicionar `PixiGame` em `/app/play`, renderizando apenas o grid inicial
- [x] Encapsular Phaser em `legacy/` (`legacyPhaser.ts`, `legacyLoader.ts`)

## 2. Cena / Fluxo
- [ ] Passar `ownerId`, `characterId`, `characterName`, `session.position` do React para `PixiGame` via props/context
- [ ] Conectar `WorldScene` ao estado real (nome, nível, XP) para exibir HUD dentro do canvas
- [ ] Sincronizar posição do player com `/api/session/position` (debounce 2 tiles, mesma regra do Phaser)
- [ ] Carregar `map_city.json` via `/api/city/map` e desenhar tiles (ground/detail/buildings/tints)
- [ ] Ler camadas `collision`/`cover` para calcular colisões e ordem de renderização
- [ ] Preparar infraestrutura para trocar para outras cenas (Casa/Fazenda/Floresta) reaproveitando o mesmo `GameApp`

## 3. Sistemas
- [ ] Portar movimentação completa: teclado, pad virtual, limites do mapa, velocidade variável por terreno
- [ ] `movementSystem` avisar `WorldScene` ao entrar em tiles de porta (casa/fazenda/floresta) para acionar rotas Next
- [ ] Migrar NPCs (spawn, patrol radius, falas aleatórias) para `npcSystem`
- [ ] Migrar combate dos lanceiros (IA, cooldown, número máximo, efeitos de dano, drops de ouro/XP)
- [ ] Migrar drops (cristais, TTL, coleta → chamar `/api/inventory/add`)
- [ ] Implementar `dropSystem` reagindo a eventos do combate (hook público disparado por `combatSystem`)

## 4. UI / Integração
- [ ] `InventoryUI` renderizar itens reais (slots 5×4), permitir consumir itens e disparar `onItemUsed`
- [ ] `MapUI` mostrar mini mapa real (camadas simplificadas) e posição atual do jogador
- [ ] `BestiaryUI` exibir entradas de `/api/bestiary/get` (nome, kills, tier)
- [ ] Integrar botões Pixi com drawers React usando callbacks (Inventário, Chat, Bestiário, Equipamentos)
- [ ] Replicar quick slots (4 slots verticais) com inputs in-canvas + sincronização com `/api/quickslots`
- [ ] Adicionar overlay HUD (HP/MP/XP/Level/Gold) dentro do canvas para mobile-only mode

## 5. Legado (Fallback)
- [ ] Rota/debug para carregar Phaser via `loadLegacyMap()` quando necessário
- [ ] Garantir `shutdownLegacyPhaser()` sempre que Pixi assumir
- [ ] Documentar como alternar entre Pixi ↔ Phaser em `TRACKER.md`

## 6. Testes / Documentação
- [ ] Rodar smoke-test manual (movimento, NPC, UI)
- [ ] Atualizar README/TRACKER/passos com o novo motor primário e link para este doc
- [ ] Planejar testes automatizados mínimos (e2e ou integração Pixi)
- [ ] Registrar benchmark (FPS, número de sprites, tempo de carga) comparando Pixi × Phaser

## 7. Passo a passo imediato
1. **Sessão → PixiGame:** criar hook em `/app/play` que envia dados de sessão para `PixiGame`.
2. **Entrada/Movimento:** refatorar `movementSystem` para aceitar inputs externos (teclado + virtual pad) e emitir eventos.
3. **Mapa real:** consumir `/api/city/map` dentro do loader e desenhar o grid de acordo com `tileManifest`.
4. **NPC placeholder:** portar 1 NPC com fala usando `npcSystem`.
5. **Botões Pixi ↔ React:** conectar os botões Inventory/Map/Bestiary do canvas aos drawers existentes.
6. **Colisão básica:** usar `collision` para impedir atravessar paredes e NPCs.
7. **Drops básicos:** clicar no botão “Drops” cria drop que chama `/api/inventory/add` ao coletar.
8. **Fallback Phaser:** criar atalho (por exemplo, query `?mode=legacy`) para carregar o Phaser via `loadLegacyMap()` para comparações rápidas.

> Use este checklist como base para futuras instruções; marque cada item conforme avançarmos.
