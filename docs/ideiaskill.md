# Ideias de Skills — Modelo Conceitual

Documento para guiar a modelagem de 15 skills com XP/nível próprios. Nada implementado ainda.

## Objetivo
- Permitir múltiplos perfis (aventureiro, ferreiro, lenhador, cozinheiro, lutador, ladino) a partir de ações repetidas.
- Cada skill armazena XP e nível independentes; perks/receitas/desbloqueios ficam atrelados ao nível da skill.

## Estrutura sugerida (conceito de schema)
- `skillId`: string estável (kebab-case).
- `name`: exibição.
- `category`: `gathering | crafting | support | combat`.
- `description`: texto curto.
- `xp`: número acumulado (por personagem).
- `level`: derivado do XP (curva compartilhada ou própria).
- `tags?`: lista opcional para filtros (ex.: `["farm", "melee", "ranged"]`).
- Armazenar em cada personagem: `skills: Record<skillId, { xp: number; level: number }>`; criar entradas on-demand quando ganhar XP.

## Lista de 15 skills
1) `harvesting` — colher ervas, grãos, feno, palha (foice/faca).
2) `woodcutting` — cortar lenha/árvores, rachar toras (machado).
3) `mining` — extrair minério, pedra, gemas (picareta).
4) `fishing` — pesca em rio/mar, itens aquáticos (vara/rede).
5) `taming` — domar/treinar animais, mascotes.
6) `survival` — acampamento, fogo, clima, primeiros socorros.
7) `tracking` — rastrear pegadas/alvos/recursos (bonus de encontro).
8) `forging` — forjar armas/armaduras, reparos (martelo de forja).
9) `engineering` — estruturas, armadilhas, mecanismos.
10) `cooking` — comidas/buffs, conserva.
11) `alchemy` — poções, tintas, catalisadores.
12) `dagger_combat` — combate furtivo/leve, backstab.
13) `axe_combat` — combate pesado, quebra de armadura.
14) `hammer_combat` — combate com martelo/maça, atordoar.
15) `bowmanship` — arco/besta, precisão e alcance.

## Curva de XP → nível
- Opção A: reutilizar `lib/data/leveling.json` (50 XP por nível base) aplicada por skill.
- Opção B: curva própria por skill (ex.: gathering: 30/60/90..., combat: 60/120/180..., crafting: 80/140/220...).
- Sempre recalcular nível a partir do XP armazenado; não persistir cache de nível.

## Ganho de XP (exemplos)
- `harvesting`: colher planta → +xp proporcional à raridade.
- `woodcutting`: cortar árvore/lenha → +xp por árvore; árvores raras dão bônus.
- `mining`: minerar veia → +xp por nó; gemas dão bônus.
- `fishing`: captura → +xp por peixe/tamanho.
- `taming`: domar/treinar → +xp por sucesso; bônus por rareza.
- `survival`: montar acampamento, resistir clima, curar status → +xp por evento.
- `tracking`: identificar pegada/recurso, localizar alvo → +xp por sucesso.
- `forging`: criar ou reparar item → +xp por item/tier.
- `engineering`: construir/armadilhar/reparar estrutura → +xp por peça/tier.
- `cooking`: receita concluída → +xp por receita/tier.
- `alchemy`: poção/consumível produzido → +xp por tier/raridade.
- Combate (`dagger_combat`, `axe_combat`, `hammer_combat`, `bowmanship`): XP apenas ao abater (kill), ajustado pelo nível do alvo.

## Desbloqueios por nível (ideias)
- Gathering: mais rendimento por ação; chance de drop raro; redução de tempo.
- Crafting: novas receitas; chance de “craft aprimorado”; menos durabilidade consumida em reparos.
- Suporte: buff de acampamento melhor; chance de evitar status; encontros facilitados.
- Combate: novos golpes/passivas por arma; chance de crit/bleed/stun; redução de recuo/gasto.

## Interação com o personagem
- Persistir no doc do personagem; API de ganhos deve aceitar `{ skillId, xpDelta }` e recalcular nível.
- UI: mostrar grade de skills com barra de XP e nível; habilitar tooltip com perks por tier.
- Telemetria: registrar data do último ganho por skill para dashboards futuros.

## Classes e evoluções (3 fases, sempre 2 escolhas por fase)
- Fase inicial (escolher 1 entre 6): Arcanista, Discípulo da Luz, Selvagem, Guerreiro, Ladino, Artífice.
- Fase 2 (cada base ramifica em 2):
  - Arcanista → Arquimago | Necromante
  - Discípulo da Luz → Paladino | Clérigo de Batalha
  - Selvagem → Druida | Patrulheiro (arqueiro focado em natureza)
  - Guerreiro → Espadachim | Lanceiro
  - Ladino → Assassino | Batedor Sombrio
  - Artífice → Alquimista | Engenheiro de Campo
- Fase 3 (cada ramo tem 2 especializações finais):
  - Arquimago → Elementalista Supremo | Cronomante
  - Necromante → Invocador de Mortos | Senhor das Pragas
  - Paladino → Guardião Radiante | Juiz Inflexível
  - Clérigo de Batalha → Sumo Sacerdote | Inquisidor
  - Druida → Guardião do Bosque | Mestre das Feras
  - Patrulheiro → Atirador Élfico | Caçador de Bichos Grandes
  - Espadachim → Duelista Lendário | Gladiador
  - Lanceiro → Dragoon | Sentinela Pesada
  - Assassino → Lâmina Sombria | Cortador de Alvos
  - Batedor Sombrio → Espião de Elite | Sabotador
  - Alquimista → Destilador de Buffs | Toxicologista
  - Engenheiro de Campo → Arquiteto de Armadilhas | Mecânico Bélico
