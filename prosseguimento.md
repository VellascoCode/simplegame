# Prosseguimento Rápido

Documento de referência para qualquer pessoa que continuar neste repositório. Siga cada item antes de iniciar novas tarefas.

---

## 1. Leitura Obrigatória
1. `docs/estruturacao.md` — visão das pastas e convenções (Pixi em `pixi/**`, legado em `legacy/**`, dados em `npc/` e `monsters/`).
2. `TRACKER.md` — changelog vivo; atualize SEMPRE que fizer alterações relevantes.
3. `passoapasso.md` — guia operacional/testes. Todos os fluxos devem estar em conformidade com ele.
4. `assets.md` — catálogo de sprites, efeitos e tiles; verifique lá antes de usar novos arquivos.
5. Este `prosseguimento.md` para garantir que o próximo ciclo comece organizado.

Não prossiga sem ler/atualizar os quatro arquivos acima.

---

## 2. Estado Atual
- Motor ativo: `components/PixiGame.tsx` + `pixi/runtime/**` (Hud, Player, Monsters, efeitos, artefatos). Phaser e qualquer “legacy” foram isolados em `legacy/phaser/**`; **não misturar**.
- Artefatos de mapa (corpos/loot) persistem via `/api/map/artifacts` e `lib/mapArtifactsStore.ts`. Sempre que mexer em drop/corpo, manter `artifactsDirtyRef`.
- Combate utiliza slots 3×3, `MonsterActor` controla movimentação/A.I., e o HUD mostra Vida/Mana/XP carregados uma vez por `/api/session/state`.
- Painéis visuais (menu flutuante + lista do mapa) estão em `/app/play/page.tsx`.
- O editor `/editor` foi migrado para PIXI (`components/PixiEditor.tsx`), com tipagem forte e hooks limpos.

---

## 3. Convenções de Código e Documentação
- Todo código novo do runtime fica em `pixi/runtime/**` ou arquivos de host React. Se precisar acessar algo legado, mova para `legacy/**`.
- Dados por mapa: `npc/data/<mapa>/*.json`, `monsters/data/<mapa>/*.json`. Nomear arquivos com contexto (`guard-amber`, `sentinel.json`, etc.).
- Quando adicionar/mover arquivos:
  - Atualize **ao mesmo tempo** `docs/estruturacao.md`, `TRACKER.md` e `passoapasso.md`.
  - Descreva mudanças em `TRACKER.md` antes de finalizar o commit.
- Sempre rodar `npm run lint` antes de entregar qualquer coisa. Não deixe warnings pendentes (as regras atuais tratam warnings como erros futuros).
- Evitar `any`; se a API retorna dados dinâmicos, crie tipos (`type FooPayload = { ... }`).
- Para efeitos/sons, registre o asset em `assets.md`.

---

## 4. Próximos Passos Sugeridos
1. **Combate/HUD**: Expandir animações (dano, XP, aviso de loot) e validar vida infinita do player vs. novos monstros (a lógica de dano ainda está simplificada).
2. **Sistema de monstros**: criar mais variantes em `monsters/data/refugio/*.json`, respeitando novas tags de raridade/perigo.
3. **Persistência**: garantir que corpos/loot sejam limpos por TTL via API (validar `MapArtifactsStore` com Mongo e fallback em memória).
4. **Menu/UI**: transformar o painel deslizante em componente reutilizável, com filtros (NPC vs. Monstro).
5. **Documentação contínua**: se alterar a estrutura ou adicionar features acima, atualizar `TRACKER.md` + `passoapasso.md`.

Antes de iniciar uma nova rodada, confirme com o solicitante quais itens da lista são prioritários.

---

## 5. Checklist Rápido
1. ✅ Ler `docs/estruturacao.md`, `TRACKER.md`, `passoapasso.md`, `assets.md`.
2. ✅ Revisar `prosseguimento.md`.
3. ✅ Manter alterações dentro da árvore correta (`pixi/runtime/**`, `app/**`, etc.).
4. ✅ Atualizar docs/changelog a cada modificação funcional.
5. ✅ Rodar `npm run lint` e garantir zero warnings/erros.

Siga estes passos e mantenha o repositório organizado para o próximo ciclo.
