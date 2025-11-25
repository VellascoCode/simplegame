Versão: 1.0
Estrutura: Skills Core → Classes Base → Classes Avançadas → Classes Elite/SS
Objetivo: Definir árvore completa de progressão jogável para ser integrada ao sistema do jogo antes da exploração/caminhada.

1. SKILLS CORE (20)

Todas evoluem por uso direto.
Cada skill tem XP, nível, velocidade de progressão e desbloqueia bônus específicos.

1. Coleta

1.1 Harvesting (plantas)
1.2 Woodcutting (madeira)
1.3 Mining (minério)
1.4 Fishing (pesca)

2. Produção

2.1 Cooking
2.2 Alchemy
2.3 Smithing (armas)
2.4 Armoring (armaduras)
2.5 Tailoring
2.6 Fletching (arcos/flechas)

3. Combate

3.1 Swordsmanship
3.2 Archery
3.3 Sorcery
3.4 Dark Arts
3.5 Fire Arts
3.6 Air Arts
3.7 Nature Arts
3.8 Heavy Weapons
3.9 Defense (escudo/parry)
3.10 Agility (movimento/esquiva)

2. CLASSES BASE (10)

Obtidas quando o jogador alcança Nível 10 em pelo menos 2 skills relevantes.

Cada classe tem duas ramificações possíveis na etapa avançada.

Classe Base	Skills Relevantes
Warrior	Swordsmanship, Defense, Heavy Weapons
Archer	Archery, Agility, Fletching
Mage	Sorcery, Fire/Air/Nature Arts
Dark Acolyte	Dark Arts, Sorcery
Monk	Agility, Defense
Ranger	Archery, Nature Arts
Berserker	Heavy Weapons, Defense
Artisan	Tailoring, Smithing, Armoring
Hunter	Tracking (embutido em Agility), Archery, Cooking
Alchemist	Alchemy, Nature Arts
3. CLASSES AVANÇADAS (20 — 2 por classe base)

Desbloqueadas ao atingir Nível 25 na Classe Base + Nível 20 em 1 skill principal adicional.

Classe Base	Avançada A	Avançada B
Warrior	Knight	Blade Master
Archer	Sniper	Windrunner
Mage	Elementalist	Arcanist
Dark Acolyte	Warlock	Occult Priest
Monk	Chi Guardian	Shadow Fist
Ranger	Beast Caller	Forest Warden
Berserker	Blood Reaver	Titan Brute
Artisan	Grand Smith	Master Tailor
Hunter	Tracker	Beast Slayer
Alchemist	Transmuter	Poisonwright
4. CLASSES ELITE / SS (40 — 2 por avançada)

O jogador escolhe uma das duas rotas.
Cada rota exige níveis altos de skills específicas.

Classe Avançada	Elite A	Elite B
Knight	Paladin	Royal Defender
Blade Master	Duelist	Soul Blade
Sniper	Eagle Eye	Phantom Arrow
Windrunner	Tempest Strider	Storm Whisperer
Elementalist	Avatar of Flame	Avatar of Frost
Arcanist	Void Scholar	Reality Shaper
Warlock	Hellbinder	Curse Sovereign
Occult Priest	Abyss Speaker	Blood Prophet
Chi Guardian	Spiritual Titan	Iron Veins Monk
Shadow Fist	Night Reaper	Silent Executioner
Beast Caller	Alpha Tamer	Prime Beastlord
Forest Warden	Emerald Herald	Nature Sentinel
Blood Reaver	Rage Incarnate	Crimson Tyrant
Titan Brute	Mountain King	Juggernaut
Grand Smith	Forgemaster	Runesmith
Master Tailor	Mythweaver	Threadmancer
Tracker	Nightstalker	High Huntsman
Beast Slayer	Dragon Bane	Primeval Killer
Transmuter	Goldmaker	Matter Architect
Poisonwright	Toxin Emperor	Venom Apostle
5. PROGRESSÃO (LÓGICA TÉCNICA)
Iniciante (Nível 1–10)
   ↓
Classe Base (10–25)
   ↓
Classe Avançada (25–50)
   ↓
Classe Elite SS (50–100)

Requisitos (resumo técnico)

Classe Base → 2 skills ≥ 10

Avançada → Classe Base ≥ 25 + skill principal ≥ 20

Elite SS → Classe Avançada ≥ 50 + skill especializada ≥ 30

6. BÔNUS TÉCNICOS (sem flavor)
Ao subir skill:

Pequenos bônus incrementais (ex: +2% dano espada por nível de Swordsmanship)

Ao subir classe:

5% a 10% multiplicadores específicos

desbloqueio de habilidades ativas ou passivas

acesso a crafting ou equipamentos exclusivos

7. IMPLEMENTAÇÃO (BACKEND)
Tabelas mínimas:
skills: { id, name, level, xp, xpToNext }
class_current: { base, advanced, elite }
class_progress: { classId, level, xp }
requirements: { classId, requiredSkills, requiredLevels }
bonuses: { classId, effectType, effectValue }

8. ENTREGA PARA O MVP

Este documento é suficiente para começar a implementar:

criação de personagem

cálculo de XP por uso

bloqueio/desbloqueio de classes

requisitos para ascensão

tabela estável para futuras skills e perks