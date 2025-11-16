# CHECKLIST — Próximas Entregas

## 1. Camadas do Mapa e Construções
- [x] Suportar tiles 64×64 com múltiplas camadas (piso/detail/buildings).
- [x] Carregar sprites de construções em `public/tilesets/buildings/` e exibi-los no Phaser.
- [x] Definir como salvar/ler essas camadas no `map_city.json`.

## 2. Inventário / UI
- [x] Inventário ao lado direito do mapa, exibindo os 5 itens principais em cards verticais.
- [x] Botão “Ver inventário” que abre um painel flutuante (slide da direita) com a grade 5×4.
- [x] Itens empilháveis limitados a 10 unidades; itens únicos (armas, etc.) não empilham.
- [x] Utilizar ícones reais em `/public/itens` (ex.: `item1.png`, `item10.png`) para testar.

## 3. NPCs
- [x] NPCs com mesma escala do personagem, exibindo nome + nível fictício acima.
- [x] Criar colisão simples entre jogador e NPC para evitar atravessar.
- [x] Adicionar diálogos/balões curtos aleatórios.

## 4. Editor / Ferramentas
- [x] Adicionar “pincéis” 1×1, 2×2 e 3×3 para pintar áreas maiores rapidamente.
- [x] Permitir inserção de construções (tilesets/buildings) nas camadas superiores.
- [x] Planejar como cada camada será persistida (piso vs. detalhes vs. construções).

## 5. UX / Responsividade
- [x] Remover largura fixa da landing e aumentar a viewport da cidade (Phaser + layout responsivo).
- [x] Inventário rápido mostrar slots como no grid e abrir o painel completo em slide da direita.
- [x] Chat global virar um painel em slide (como o inventário), com botão persistente.
- [x] Ajustar lista de rotas/sugestões para refletir o novo fluxo e registrar próximos passos.
- [x] Mostrar atributos do personagem (HP/MP/XP) na UI da cidade.
- [x] Criar animação visual ao consumir poções (ex.: efeito na HUD/personagem).

## 6. Próximos desafios
- [x] No editor, permitir marcar regiões de “passar por trás”/“colisão” para cada construção (camadas `collision`/`cover` + preview).
- [x] Ajustar o HUD da cidade para refletir o layout solicitado (slots rápidos, inventário/chat em slides, menu inferior dedicado).
- [ ] Exibir efeitos/buffs no HUD (integração futura com rotas de combate) e animar o uso de poções diretamente no personagem.
- [ ] Salvar/recuperar múltiplos mapas (`map_house.json`, `map_farm.json`, `map_forest.json`) usando o mesmo fluxo do editor.
- [ ] Evoluir o combate dos lanceiros (ataques à distância, drops, integração com atributos reais do personagem e consumo real de HP/XP).
- [x] Integrar NextAuth (Credentials) para autenticação/sessão oficial (SessionProvider + `/api/session/*` usando `getServerSession`).
- [ ] Embutir a cidade diretamente dentro da landing `/` para evitar navegação manual e esconder a URL das rotas secundárias.
- [ ] Revisar duplicação do canvas Phaser (dois mapas lado a lado) e garantir limpeza única independentemente de renders ou hot-reload.
- [ ] Reescrever o editor com painel flutuante (andar pelo mapa enquanto pinta), lupa lateral, flood-fill dedicado, borracha e toggles de colisão/cover em meio bloco.
- [ ] Refinar o layout in-game: 4 slots rápidos verticais fixos no lado direito, menu inferior apenas com botões quadrados (inventário, chat, logout, conta, configs) usando os ícones de `/public/icons` e slides já existentes.
- [ ] Garantir que nomes, níveis e balões dos NPCs/Jogador fiquem sempre acima da cabeça (z-index) e que o mini chat de dano/XP fique visível até 5 s mesmo no mobile.
- [ ] Melhorar a landing page com prévias animadas dos personagens (idle/run), novas sessões de conteúdo e imagens reais dos mapas/sprites.
- [ ] Evoluir o mini mapa para refletir o mapa real (camadas do editor + ícones de pontos de interesse) e permitir zoom.
- [ ] Implementar crafting real (consumo de itens, geração de loot) utilizando o painel recém-criado.
- [ ] Criar páginas dedicadas para Marketplace, Wiki, Fórum e Arquivamentos e conectar o cabeçalho/nav com essas rotas.
- [ ] Definir o sistema de combate baseado em SQM (alvo único, linha/frente, arco e giro 360°) respeitando armas/skills e espaçamento 3×3.
- [ ] Introduzir mochilas e upgrades de capacidade (slots iniciais = 4; cada mochila adiciona +20 slots ou conforme atributo configurável).
- [ ] Configurar mapas internos (casas/salas), falas completas dos NPCs, sistema inicial de quests e ampliar o crafting para suportar novas receitas/drops.
- [ ] Evento recorrente de facções (ex.: 10 lanceiros x 10 cavaleiros a cada 10 minutos) com drops persistentes por várias horas e indicadores no mapa.
