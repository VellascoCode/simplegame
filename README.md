# 📜 MVP — Mundo 2D Spinazzi  
**Stack:** Next.js • TypeScript • Phaser • MongoDB

---

# 1. Estrutura Geral
- Stack fixa: Next.js + TypeScript + Phaser + MongoDB  
- Todas as funcionalidades listadas abaixo são obrigatórias  
- Nenhum dado crítico salvo no cliente  
- Cada ação importante passa por rotas da API  
- Atualização leve via polling para chat e lista de online  

---

# 2. Funcionalidades do MVP (Lista Obrigatória)

### 2.1 Autenticação
- Criar conta (email + senha)  
- Login  
- Logout  

### 2.2 Personagem
- Criar personagem (nome, visual básico)  
- Salvar personagem no banco  
- Carregar personagem ao entrar no jogo  

### 2.3 Cidade
- Entrar na cidade  
- Andar pelo mapa  
- Colisões básicas  
- Interagir com portas  

### 2.4 Casa do Jogador
- Entrar na casa  
- Renderizar mapa simples  
- Salvar e carregar 4 móveis básicos  

### 2.5 Lojas
- Loja 1: Ferramentas e Poções  
- Loja 2: Armas  
- Loja 3: Compra de itens do jogador  
- Comprar e vender itens  
- Atualizar inventário  

### 2.6 Fazenda
- 4 espaços de plantio  
- Plantar  
- Crescimento por tempo  
- Colher  
- Salvar estado da plantação  

### 2.7 Floresta
- Mapa simples  
- Matar criatura básica  
- Recompensa simples  
- Atualizar inventário  

### 2.8 Sala de Chat Global
- Enviar mensagem  
- Listar últimas mensagens  
- Atualizar a cada 3 segundos  

### 2.9 Lista de Online
- Registrar presença a cada 10 segundos  
- Listar jogadores online  
- Exibir no rodapé  

### 2.10 Inventário
- Inventário básico  
- Atualizar após comprar, vender, plantar, colher, caçar  

---

# 3. Rotas da API (Obrigatórias)

### Autenticação
- `POST /api/auth/register`  
- `POST /api/auth/login`  
- `GET /api/auth/logout`  

### Personagem
- `POST /api/character/create`  
- `GET /api/character/get`  

### Online
- `POST /api/online/ping`  
- `GET /api/online/list`  

### Chat
- `POST /api/chat/send`  
- `GET /api/chat/get`  

### Inventário
- `POST /api/inventory/add`  
- `POST /api/inventory/remove`  
- `GET /api/inventory/get`  

### Casa
- `GET /api/house/get`  
- `POST /api/house/update`  

### Fazenda
- `GET /api/farm/get`  
- `POST /api/farm/plant`  
- `POST /api/farm/harvest`  

### Floresta
- `POST /api/forest/kill`  

---

# 4. MODELOS (MongoDB)

### User
```
id  
email  
passwordHash  
createdAt  
```

### Character
```
ownerId  
name  
sprite  
inventory[]  
stats { level, xp, hp, energy }  
```

### House
```
ownerId  
furniture[]  
```

### Farm
```
ownerId  
plots[] { type, plantedAt }  
```

### Chat
```
playerId  
name  
message  
createdAt  
```

### Online
```
playerId  
name  
lastSeen  
```

---

# 5. MAPAS DO MVP

### Cidade
- Praça central  
- Porta para casa  
- Porta para fazenda  
- Porta para floresta  
- 3 lojas  

### Casa
- Quarto simples  
- 4 móveis básicos  

### Fazenda
- 4 plots de plantio  

### Floresta
- Criatura básica  

---

# 6. TODO LIST OBRIGATÓRIO

### Backend
- [ ] Criar modelos  
- [ ] Criar rotas de autenticação  
- [ ] Criar rotas de personagem  
- [ ] Criar rotas de online  
- [ ] Criar rotas de chat  
- [ ] Criar rotas de inventário  
- [ ] Criar rotas da casa  
- [ ] Criar rotas da fazenda  
- [ ] Criar rotas da floresta  
- [ ] Criar rotas das lojas  
- [ ] Criar rotas /api/check  

### Front
- [ ] Tela de login  
- [ ] Tela de criação de personagem  
- [ ] Cena da cidade  
- [ ] Movimentação  
- [ ] Casa  
- [ ] Fazenda  
- [ ] Floresta  
- [ ] Lojas  
- [ ] Inventário  
- [ ] Chat global  
- [ ] Lista de online  

### Assets
- [ ] Tileset cidade  
- [ ] Tileset casa  
- [ ] Tileset fazenda  
- [ ] Tileset floresta  
- [ ] Sprites personagem  
- [ ] Sprites lojas  
- [ ] Criatura floresta  
- [ ] Ícones inventário  

---

# 7. API — Rotas de Verificação (/api/check)

Criar todas essas rotas GET, cada uma devendo retornar APENAS `"ok"`:

- `GET /api/check/auth` → `"auth ok"`  
- `GET /api/check/character` → `"character ok"`  
- `GET /api/check/online` → `"online ok"`  
- `GET /api/check/chat` → `"chat ok"`  
- `GET /api/check/inventory` → `"inventory ok"`  
- `GET /api/check/house` → `"house ok"`  
- `GET /api/check/farm` → `"farm ok"`  
- `GET /api/check/forest` → `"forest ok"`  
- `GET /api/check/shops` → `"shops ok"`  

---

# 8. Estrutura Final de Pastas (Obrigatória)

```
/app
  /city
  /house
  /farm
  /forest
  /shops
  /chat
  /login
  /character

/api
  /auth
  /character
  /online
  /chat
  /inventory
  /house
  /farm
  /forest
  /shops
  /check

/public
  /sprites
  /tilesets
  /maps
  /icons
```

---

# 9. Prompts para Assets (externos)

### Cidade
pixel art 2d isometric, stone floor tiles, grass patches, small medieval houses, central plaza, 32x32 tiles

### Casa
pixel art 2d isometric, interior small room, wood floor, bed, table, shelf, 32x32 tiles

### Fazenda
pixel art 2d isometric, dirt soil plots, 4 plant spots, farming tools, 32x32 tiles

### Floresta
pixel art 2d isometric, trees, bushes, rocks, small slime creature, 32x32 tiles

### Personagem
pixel art 2d isometric, male sprite base, 4 directions, idle + walk, 32x32 per frame

### Lojas
pixel art 2d isometric, small shop interior, tools, potions, weapons on walls, 32x32 tiles  

---

# 10. Fluxo do Usuário

1. Registrar conta  
2. Criar personagem  
3. Entrar na cidade  
4. Movimentação  
5. Entrar na casa  
6. Entrar na fazenda  
7. Entrar na floresta  
8. Comprar e vender itens  
9. Usar inventário  
10. Plantar  
11. Colher  
12. Matar criatura simples  
13. Usar chat global  
14. Ver lista de online  

---

# 11. Regras Operacionais (Obrigatórias)
- Nenhum dado crítico salvo no cliente  
- Todas as ações passam pelo servidor  
- Validação obrigatória de tempo e propriedade  
- Polling leve para chat e online  
- Assets armazenados em `/public`  
- Estrutura e rotas fixas (não alterar)  

---

# 12. Objetivo do MVP
Criar a versão mínima jogável do Mundo 2D Spinazzi, composta por:  
- Personagem  
- Cidade  
- Casa  
- Fazenda  
- Floresta  
- 3 lojas  
- Inventário  
- Chat Global  
- Lista de Online  
- Rotas /api/check funcionando  



Nunca altere formato, nunca invente rotas, nunca remova nada. Sempre siga exatamente esta estrutura.

Gere a documentação agora seguindo integralmente este padrão.
