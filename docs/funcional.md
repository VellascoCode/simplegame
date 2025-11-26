# 📋 Fluxo Funcional — Mundo 2D Spinazzi

## 1. Cadastro e sessão
1. Usuário acessa `/`.
2. Clica em **Registrar**, informa `email` + `senha`.
3. API `/api/auth/register` cria conta, em seguida login automático (`/api/auth/[...nextauth]` Credenciais + JWT).
4. Sessão é persistida; `/api/session/state` mantém ownerId/personagem escolhidos.
5. Logout chama `/api/auth/logout`.

## 2. Personagem
1. Usuário abre painel de personagens.
2. Cria personagem (`POST /api/character/create`) escolhendo nome + sprite base.
3. Seleciona personagem e `/api/session/select` guarda ownerId/characterId.
4. Tela `/play` carrega `/api/character/get`, inventário, bestiário e estado do mapa.

## 3. Cidade (Phaser)
1. `CityPhaser` inicia Phaser, carrega mapa (`/api/city/map`) e sprites.
2. Jogador anda (com teclado ou pad virtual). Colisão com NPC/zona evita atravessar.
3. Camera segue player; mini HUD mostra HP/XP/Energia.
4. NPCs inofensivos patrulham; Lancers perseguem dentro do raio.
5. Confronto: dano aplica XP, log e drops (ouro + cristais).
6. Atualiza posição via `/api/session/position` (debounce > 2 tiles).

## 4. Inventário
1. Abrir drawer (Bottom menu) → consulta `/api/inventory/get`.
2. Usar item chama `/api/inventory/remove`/hooks específicos (pot, XP etc.).
3. Compras/vendas/loot usam `/api/inventory/add/remove`.

## 5. Economia e drops
1. Ouro acumulado drasticamente (schema aceita valores grandes).
2. Lancers dropam ouro (0–3) sem ocupar slot.
3. Cristais (item30/31) vão para inventário e podem dar XP.
4. HUD lateral mostra slots, atalhos e ouro atual.

## 6. Bestiário
1. Modelo separado (`bestiary` collection) com `entries: [{ monsterId, kills, tier }]`.
2. Cada kill chama `/api/bestiary/update` com ids numéricos.
3. Drawer “Bestiário” lista total, espécies e tiers (Comum → Mítico).

## 7. Outros painéis
1. Chat global (`/api/chat/get|send`) a cada 3s.
2. Lista online (`/api/online/list|ping`) a cada ~10s.
3. Mini mapa e menus laterais (inventário, crafting, equip, conta, config).

## 8. Rotas API ativas
- Auth: `/api/auth/*`
- Personagem: `/api/character/*`
- Sessão: `/api/session/*`
- Inventário: `/api/inventory/*`
- Loja / craft / casa / fazenda / floresta: conforme README.
- Batalha: `/api/character/gold`, `/api/bestiary/*`, `/api/factions/war`.

> **Comportamento atual:** Toda prefeitura roda no cliente (Phaser). Servidor apenas registra estado (sessão, inventário, ouro, bestiário). Refatorações futuras manterão essas etapas mas com código modular e enums numéricos.
