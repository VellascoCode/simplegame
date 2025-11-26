## Visão Geral do Sistema

- ✅ **Autenticação + Sessões** — _NextAuth + APIs proprietárias_  
  Registra/login, mantém ownerId e personagem ativo, persiste mapa/posição a cada passo e bloqueia `/play` quando não há sessão válida.
- ✅ **Inventário/Quickslots** — _APIs REST + Drawer legado_  
  Adiciona/ remove itens com stacks limitados, sincroniza slots rápidos e salva no Mongo em tempo real.
- ✳️ **Economia + Casas/Fazenda** — _Serviços REST_  
  Atualiza ouro, casa e plantações; endpoints respondem e foram validados, porém UI PIXI ainda não consome todos.

## Phaser (legado) – Já testado

- ✅ **CityPhaser** — _Mapa 48×48, HUD completo_  
  Renderiza NPCs orbitais, joystick virtual, quickslots, chat modal, inventário/bestiário e teletransportes entre cenas.
- ✅ **Combate/Lancers** — _Componentes `components/game/*`_  
  Simula lutas contra lanceiros, dropa ouro/xp, usa balões de fala e depth sort com `clampPlayerDepth`.
- ⚠️ **Crafting/Account Drawers** — _Aguardando revisão final_  
  UI abre, mas os fluxos de crafting e personalização ainda dependem de dados estáticos (precisa refatorar antes de migrar).

## PIXI (novo play) – Já testado

- ✅ **Loader + Persistência** — _`components/PixiGame.tsx`_  
  Busca `/api/session/state`, normaliza tiles 64px, carrega mapas `maps-data`, salva posição a cada dois passos e respeita teleporters.
- ✅ **NPC Data-Driven** — _`npc/data/*` + `NpcActor`_  
  Usa JSON com `hue`, `speechTextColor`, `speed`, wander areas e nome amarelo; balões estilizados exibem frases periódicas.
- ✅ **Bottom Overlay** — _Menu quadrado translúcido_  
  Botões INV/CHAT/MAP/BST/ACC/CFG diretos no mapa, já acionando placeholders e marcador de minimapa.
- 🟡 **Painéis Auxiliares** — _Placeholders `OverlayPanel`_  
  Estrutura das janelas está pronta, mas precisa conectar inventário/chat real antes do lançamento público.

## Próximas Fases & Sugestões

- 🟡 **Unificar Inventário** — _Migrar InventoryDrawer para PIXI_  
  Reaproveitar APIs existentes, permitindo usar itens e slots sem voltar ao modo legado.
- 🟡 **Chat WebSocket** — _Integrar ChatPanel ao play PIXI_  
  Reutilizar feed + modal e garantir que o botão CHAT abra o histórico em tempo real.
- 🟡 **MiniMapa Real** — _Substituir placeholder_  
  Renderizar camada reduzida (8×8) do mapa atual e destacar posição do player e NPCs.
- 🔵 **Phaser → Arquivo Histórico** — _Classificar componentes legado_  
  Marcar claramente o que fica apenas para referência/backup e remover imports mortos das páginas atuais.
- ⚫ **Testes Automatizados** — _E2E + Lint Gate_  
  Habilitar `npm run lint` no CI, adicionar smoke test que carrega `/play` e `/editor` e alerta quando APIs essenciais falharem.
