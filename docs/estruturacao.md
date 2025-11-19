# Estrutura do Projeto (Resumo Rápido)

Referência viva para manter o repositório organizado de acordo com as regras combinadas.

## 1. Runtime / Client

- `pixi/runtime/**` — todo o código novo do motor PIXI (Player, NPCs, monstros, HUD, input, etc.).
  - `pixi/editor/**` concentra apenas as ferramentas do editor de mapas (sem lógica de jogo).
  - `pixi/runtime/effects` concentra efeitos compartilhados (ex.: FloatingText, partículas).
  - `pixi/runtime/audio.ts` guarda os helpers de áudio via WebAudio (tons rápidos para combate/XP).
- O combate do runtime respeita estritamente o grid 3×3 ao redor do jogador: slots são administrados em `components/PixiGame.tsx` e os monstros (`pixi/runtime/monsters/MonsterActor.ts`) só atacam/recebem dano quando ocupam um SQM adjacente (horizontal, vertical ou diagonal).
- `components/PixiGame.tsx` — host React que instancia o runtime (único ponto fora do diretório `pixi/`).
- `lib/data/leveling.json` — curva oficial de XP → nível (os dois runtimes e o backend leem este arquivo).
- `legacy/phaser/**` — código antigo do motor (App/Core/Scenes/Sistemas). Mantemos apenas para referência; não importar nada novo dali. Todo o React/TypeScript específico do Phaser (ex.: `CityPhaser`, hooks auxiliares e helpers em `legacy/phaser/game/**`) também mora aqui agora.

## 2. Dados / Conteúdo

- `maps-data/*.json` — mapas oficiais consumidos pelo PIXI (`/api/maps`) e pelo editor.
- `npc/data/<mapa>/*.json` — NPCs não agressivos organizados por mapa.
- `monsters/data/<mapa>/*.json` — monstros agressivos (AI/combate).
- `public/tilesets/**`, `public/effect/**`, `public/sprites/**` — assets de arte. Teleportes usam `effect/teleport.png`.

## 3. API / Backend

- `app/api/**` — rotas Next.js (auth, character, session, etc.).
- `lib/models.ts`, `lib/repositories.ts` — schemas e persistência (Mongo/memória).

## 4. Documentação

- `README.md` — visão macro do MVP.
- `passoapasso.md` — guia operacional que deve ser atualizado em cada ciclo.
- `TRACKER.md` — changelog vivo.
- `docs/estruturacao.md` (este arquivo) — mapa rápido da árvore de pastas e convenções.

## Convenções

1. Qualquer recurso que pertença ao runtime PIXI (sprites, HUD, AI) vive sob `pixi/**` ou `public/**`.
2. Dados de NPC/Monstro são sempre JSON individuais por mapa, seguindo `npc/data/<mapa>/nome.json` e `monsters/data/<mapa>/nome.json`.
3. Mapas ficam somente em `maps-data/` — nada de duplicar em `public/maps`.
4. Toda alteração relevante precisa atualizar `passoapasso.md` e `TRACKER.md`.
