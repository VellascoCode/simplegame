# PASSO A PASSO — Mundo 2D Spinazzi

Documento vivo alinhado ao README e ao `TRACKER.md`. Sempre atualizar este arquivo antes de iniciar um novo ciclo de desenvolvimento ou testes.

---

## 1. Preparação do Ambiente
1. Copiar `.env.example` para `.env`, preencher `MONGODB_URI` com o cluster já configurado e `NEXT_PUBLIC_API_URL` (ex.: `http://localhost:3000`).
2. Executar `npm install` (já realizado nesta fase) e `npm run dev` para iniciar o servidor Next.
3. Confirmar conexão com o banco executando qualquer rota (ex.: `POST /api/auth/register`) e verificando registros no MongoDB `spinazzi`.

## 2. Estrutura de Assets (assets.md)
- Tiles base: arquivos `tile*.png` (100×100) em `/public/tilesets/` são convertidos para blocos 64×64 pelo Phaser. Basta adicionar novos `tileN.png` ou `details/dN.png`/`buildings/*.png` e o manifest `/api/tiles` já os expõe ao editor/cena.
- Paletas extras: `/public/tilesets/details/` (detalhes sobre o piso) e `/public/tilesets/buildings/` (estruturas grandes). Bloqueios/sobreposições são configurados no editor via camadas `collision` e `cover`.
- Personagens provisórios em `/public/sprites/characters` (atualmente `sprites/warriorblue/walk.png`, 6 frames de 192 px + idle de mesmo tamanho) e o novo `pinguin1/walk.png` (5 frames 112×128 após o corte).
- Cartas espirituais em `/public/spirit/{1..4}.png` definem a identidade do personagem-controller (ver `lib/data/spirits.json`).
- Atributos iniciais do personagem (Força, Destreza, Inteligência, Constituição e Sorte) começam em 10 pontos cada e são salvos com 5 pontos livres (`attributePoints`) para gastos futuros.
- NPCs amigáveis foram reorganizados em `npc/data/{mapa}/nome.json` — guardas usam `warriorblue` (6 frames 192×192, `size` reduzido para 128 px) e vilagers usam `vilager1` (8 frames, 128 px). Monstros agressivos ficam em `monsters/data/{mapa}/` e reutilizam o mesmo spritesheet (`warriorblue` por padrão).
- Tiles especiais: `/tilesets/tile104.png` marca portais/teleportes e `/effect/teleport.png` traz 11 frames (128 px) usados na animação de teletransporte.
- Estrutura completa do repositório documentada em `docs/estruturacao.md`.
- Curva de XP → nível está centralizada em `lib/data/leveling.json` (padrão 50 XP por nível, sem carregar excedente); qualquer ajuste deve ser feito neste arquivo para refletir no runtime e no backend.
- Runtime ativo: todo código PIXI fica em `pixi/runtime/**` e o host em `components/PixiGame.tsx`; o motor legado (incluindo `CityPhaser`, hooks e helpers em `legacy/phaser/game/**`) ficou isolado em `legacy/phaser/**` e não deve ser modificado.
- Criaturas básicas em `/public/sprites/creatures` (floresta).
- Ícones e itens em `/public/itens` e `/public/icons` para inventário/lojas.
- HUD inspirado em GUI medieval criado via Tailwind + gradientes em `globals.css` (sem depender de `/public/gui`).
- UI complementar em `/public/ui`.
- Próximos arquivos JSON a gerar: `map_city.json`, `map_farm.json`, `map_forest.json`, `map_house.json`, todos seguindo a matriz `ground/detail/buildings/tints/collision/cover` (padrão 32×20, ajustável até 64×40).

## 3. Ordem Oficial do MVP
1. Etapa 1 — Autenticação + criação/seleção de personagem (máx. 4 por usuário, sempre escolher um para entrar).
2. Etapa 2 — Cidade carregada no Phaser com mapa vazio.
3. Etapa 3 — Movimentação básica do personagem escolhido.
4. Etapa 4 — Estruturas (Casa, Fazenda, Floresta, Lojas) com rotas correspondentes.
5. Etapa 5 — Inventário (rotas + UI).
6. Etapa 6 — Lista de Online (ping 10s).
7. Etapa 7 — Chat Global (polling 3s).

## 4. Fluxo do Jogador (Telar e Testar)
1. Registrar ou logar pela página inicial (`/`), armazenando o `ownerId`.
2. Criar até 4 personagens para o mesmo usuário; se já tiver 4, remover/atualizar manualmente pelo banco antes de novos testes.
3. Após login, usar a seção “Minha conta” para escolher o espírito (Tyna/Arna/Solia/Maja), o corpo iniciante (warrior ou pingu) e uma das 4 cores disponíveis antes de salvar o personagem.
4. O botão “Jogar” envia automaticamente para `/city?ownerId=<id>&characterId=<id>`; não alterar URLs manualmente.
5. Verificar inventário resumido (cards à direita) e abrir o painel completo pela ação “Ver inventário” (slide).
6. Prosseguir para `/house`, `/farm`, `/forest`, `/shops`, `/chat` conforme etapas do README.
7. A página inicial (`/`) continua sendo o hub: use o menu inferior (Admin/Fazenda/etc.) para navegar sem alterar manualmente a barra de endereço.

## 5. Checklist de Testes Iniciais
- [ ] Registro e login retornam `id` do usuário.
- [ ] Criação de personagem respeita limite de 4 por `ownerId`.
- [ ] Seletor de espíritos + cores persiste `spiritId` e `spriteColor` (ver documento no banco).
- [ ] Cada personagem inicia com atributos 10/10/10/10/10 + 5 pontos livres gravados no documento do banco.
- [ ] Ao entrar em `/play`, a engine PIXI carrega o sprite/cor do personagem selecionado sem erros de boot.
- [ ] Portais usam `tile104` no mapa e exibem a animação `effect/teleport.png` + mensagem “Teletransportando...” durante 2 segundos antes de trocar de mapa.
- [ ] HUD in-game exibe Cidade + X/Y + barras de Vida/Mana/XP com dados vindos de `/api/session/state` (sem requisições adicionais durante o loop).
- [ ] Monstro agressivo no mapa Refúgio respawna a cada 5s (quando não houver nenhum), persegue o jogador e concede 1-2 XP ao morrer (HP 10, dano do jogador = 1–3).
- [ ] Combate mostra feedback completo: ataques a cada segundo com texto flutuante (dano e XP) e efeitos sonoros diferentes para golpe, dano recebido e morte.
- [ ] Ao alcançar 50 XP o personagem sobe de nível, a barra volta para 0 e aparece a mensagem “LVL {n} | Classe” acima da cabeça (rótulo fixo + texto flutuante).
- [ ] Monstros deixam cadáver (64×64) por 1 minuto e loot configurado em `monsters/data/<mapa>/*.json` — o jogador coleta ao pisar e recebe aviso com ícone + texto.
- [ ] Combate respeita o grid 3×3: cada monstro ocupa um dos 8 SQMs ao redor do player, não divide slot, anda SQM a SQM e só pode atacar/receber dano quando estiver adjacente (1 tile de distância) ao jogador.
- [ ] `docs/estruturacao.md` atualizado sempre que movermos arquivos.
- [ ] Listagem exibe personagens existentes e permite selecionar um.
- [ ] Navegação para `/city` carrega o `ownerId` selecionado e mantém integração com inventário/online/chat.
- [ ] Rotas `/api/check/*` continuam respondendo `{ status: "ok" }`.
- [ ] Após `.env` preenchido, confirmar que dados persistem no MongoDB.
- [ ] Editor `/editor` protegido por PIN `8989` acessa normalmente, permitindo desenhar o grid.
- [ ] JSON exportado no editor pode ser reutilizado dentro do `CityScene`.
- [ ] `npm run lint` e o build de produção (`npx node@18.19.1 ./node_modules/next/dist/bin/next build` em ambientes com Node 16) concluem sem erros — o Next voltou a rodar lint + checagem de tipos em todo o projeto (Pixi, legado/Phaser, auth).
- [ ] Sistema de skills/classes ativo: modelos ampliados (classe tier/base/avançada/elite, skills com XP/nível) com criação automática de todas as skills ao carregar personagem e painéis deslizantes em `/play` exibindo classe e progresso de skills.
- [ ] Páginas estáticas `/wiki/skills` e `/wiki/classes` disponíveis com layout estilo GUI de madeira (painéis de skills/classes, barras de progresso e diagramas de progressão totalmente visuais e responsivos).

## 6. Sincronização Contínua
- Toda alteração funcional deve atualizar simultaneamente `TRACKER.md` e este `passoapasso.md`.
- Novos assets ou mapas adicionados precisam ser registrados em `TRACKER.md` (seções de MAPAS/ASSETS) e referenciados aqui.
- Testes executados devem ser marcados no checklist acima, adicionando comentários sobre data/resultado quando necessário.
- UI de `/wiki/skills` ajustada para seguir apenas classes Tailwind permitidas (cores padrão, rounded-md, p-1..4 e bordas 1/2/4, sem sintaxe com colchetes).
- Header de `/wiki/skills` reposicionado com botões em linha (três variações), ícone no título e banner de skills ocupando toda a largura do container.
- Refinado o layout de `/wiki/skills`: títulos ampliados, ícone de skills maior, banner mais baixo e responsivo, espaçamentos externos reduzidos, padding interno ampliado, sombras pesadas removidas e bordas múltiplas usando border-4/border-2.
- WoodPanel/MedievalCard/CardWooden atualizados com bordas duplas, pregos azul-escuro nos cantos e paleta madeira âmbar/vermelha/azul-oceano.
- Fundos dos componentes de madeira em amber-400 (papel escurecido) com texto stone escuro e bordas pretas quádruplas.
- Documento `skillseclassses.md` atualizado com 23 skills core, 13 classes base, 26 avançadas e 52 elites, incluindo Herbalist/Gemwright/Scrapper e suas ramificações.
- Página `/wiki/skills` ajustada para listar Herbalism, Gem Collecting, Herbcrafting, Gemcutting e Scrapcrafting nas categorias.
- Adicionada seção de protótipo de gamificação na `/wiki/skills` com conquistas, builds sugeridas, compatibilidade e rota de progressão.
- Novas variantes de botão (red, wooden, redRoyal, blueRoyal) e cards/seções royal aplicadas no protótipo de gamificação da `/wiki/skills` com lista de modelos de botões exibida.
- Limpeza de variantes duplicadas dos botões (apenas wood/sand/secondary/danger/redRoyal/blueRoyal), ajuste de sombras/rounded-md e cards/skills com ícones + descrições e ícone de categoria em “Coleta”.
- Corrigido caminho do ícone de Gem Collecting, removida linha de categoria dentro dos cards e mantido ícone de categoria em linha ao título “Coleta”.
>>>>>>> theirs
=======
>>>>>>> theirs

## 7. Admin / Editor de Mapas
- Rota `/editor` (client component) exige PIN `8989` para liberar a UI.
- Manifest automático (`/api/tiles`) lista todos os arquivos em `/public/tilesets` (ground, details, buildings). Basta copiar a arte para a pasta correta para ela surgir na paleta.
- Camadas disponíveis: `ground`, `detail`, `buildings`, `tints`, `collision` (bloqueio) e `cover` (por trás/por cima). Ferramentas: pincéis 1×1~3×3, borracha, preenchimento da camada, ajuste de largura/altura (até 64×40) e “lupa” que mostra a região ampliada.
- Cada clique grava o ID selecionado. Controles extras permitem limpar camada, copiar JSON ou salvar diretamente no jogo (`POST /api/city/map` → `public/maps/map_city.json`).
- Sempre registrar novos PINs, tiles ou mudanças de fluxo também neste arquivo e no `TRACKER.md`.
