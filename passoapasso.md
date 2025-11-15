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
- Personagens provisórios em `/public/sprites/characters` (atualmente `sprites/warriorblue/walk.png`, 6 frames de 192 px + idle de mesmo tamanho).
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
3. Após login, usar a seção “Minha conta” (mesma página) para criar e selecionar até 4 personagens.
4. O botão “Jogar” envia automaticamente para `/city?ownerId=<id>&characterId=<id>`; não alterar URLs manualmente.
5. Verificar inventário resumido (cards à direita) e abrir o painel completo pela ação “Ver inventário” (slide).
6. Prosseguir para `/house`, `/farm`, `/forest`, `/shops`, `/chat` conforme etapas do README.
7. A página inicial (`/`) continua sendo o hub: use o menu inferior (Admin/Fazenda/etc.) para navegar sem alterar manualmente a barra de endereço.

## 5. Checklist de Testes Iniciais
- [ ] Registro e login retornam `id` do usuário.
- [ ] Criação de personagem respeita limite de 4 por `ownerId`.
- [ ] Listagem exibe personagens existentes e permite selecionar um.
- [ ] Navegação para `/city` carrega o `ownerId` selecionado e mantém integração com inventário/online/chat.
- [ ] Rotas `/api/check/*` continuam respondendo `{ status: "ok" }`.
- [ ] Após `.env` preenchido, confirmar que dados persistem no MongoDB.
- [ ] Editor `/editor` protegido por PIN `8989` acessa normalmente, permitindo desenhar o grid.
- [ ] JSON exportado no editor pode ser reutilizado dentro do `CityScene`.

## 6. Sincronização Contínua
- Toda alteração funcional deve atualizar simultaneamente `TRACKER.md` e este `passoapasso.md`.
- Novos assets ou mapas adicionados precisam ser registrados em `TRACKER.md` (seções de MAPAS/ASSETS) e referenciados aqui.
- Testes executados devem ser marcados no checklist acima, adicionando comentários sobre data/resultado quando necessário.

## 7. Admin / Editor de Mapas
- Rota `/editor` (client component) exige PIN `8989` para liberar a UI.
- Manifest automático (`/api/tiles`) lista todos os arquivos em `/public/tilesets` (ground, details, buildings). Basta copiar a arte para a pasta correta para ela surgir na paleta.
- Camadas disponíveis: `ground`, `detail`, `buildings`, `tints`, `collision` (bloqueio) e `cover` (por trás/por cima). Ferramentas: pincéis 1×1~3×3, borracha, preenchimento da camada, ajuste de largura/altura (até 64×40) e “lupa” que mostra a região ampliada.
- Cada clique grava o ID selecionado. Controles extras permitem limpar camada, copiar JSON ou salvar diretamente no jogo (`POST /api/city/map` → `public/maps/map_city.json`).
- Sempre registrar novos PINs, tiles ou mudanças de fluxo também neste arquivo e no `TRACKER.md`.
