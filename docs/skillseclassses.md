Versão: 1.1
Estrutura: Skills Core → Classes Base → Classes Avançadas → Classes Elite/SS
Objetivo: Definir árvore completa de progressão jogável para integração no sistema.

1. SKILLS CORE (23)

Todas evoluem por uso direto; cada skill tem XP, nível e bônus específicos.

1. Coleta (6)
1.1 Harvesting
1.2 Woodcutting
1.3 Mining
1.4 Fishing
1.5 Herbalism
1.6 Gem Collecting

2. Produção (9)
2.1 Cooking
2.2 Alchemy
2.3 Smithing
2.4 Armoring
2.5 Tailoring
2.6 Fletching
2.7 Herbcrafting
2.8 Gemcutting
2.9 Scrapcrafting

3. Combate (8)
3.1 Swordsmanship
3.2 Archery
3.3 Sorcery
3.4 Dark Arts
3.5 Nature Arts
3.6 Heavy Weapons
3.7 Defense
3.8 Agility

2. CLASSES BASE (13)

Obtidas ao alcançar Nível 10 em pelo menos 2 skills relevantes; cada Base tem 2 ramificações avançadas.

Classe Base | Skills Relevantes
Warrior | Swordsmanship, Defense, Heavy Weapons
Archer | Archery, Agility, Fletching
Mage | Sorcery, Nature Arts
Dark Acolyte | Dark Arts, Sorcery
Monk | Agility, Defense
Ranger | Archery, Nature Arts
Berserker | Heavy Weapons, Defense
Artisan | Tailoring, Smithing, Armoring
Hunter | Agility (Tracking), Archery, Cooking
Alchemist | Alchemy, Nature Arts
Herbalist | Herbalism, Herbcrafting, Alchemy
Gemwright | Gem Collecting, Gemcutting, Smithing
Scrapper | Scrapcrafting, Agility, Cooking

3. CLASSES AVANÇADAS (26 — 2 por Base)

Desbloqueadas ao atingir Nível 25 na Classe Base + Nível 20 em 1 skill principal adicional.

Classe Base | Avançada A | Avançada B
Warrior | Knight | Blade Master
Archer | Sniper | Windrunner
Mage | Elementalist | Arcanist
Dark Acolyte | Warlock | Occult Priest
Monk | Chi Guardian | Shadow Fist
Ranger | Beast Caller | Forest Warden
Berserker | Blood Reaver | Titan Brute
Artisan | Grand Smith | Master Tailor
Hunter | Tracker | Beast Slayer
Alchemist | Transmuter | Poisonwright
Herbalist | Herbal Sage | Venom Crafter
Gemwright | Runeforger | Crystal Binder
Scrapper | Tinker | Saboteur

4. CLASSES ELITE / SS (52 — 2 por Avançada)

Escolha uma rota; exige Classe Avançada ≥ 50 + skill especializada ≥ 30.

Classe Avançada | Elite A | Elite B
Knight | Paladin | Royal Defender
Blade Master | Duelist | Soul Blade
Sniper | Eagle Eye | Phantom Arrow
Windrunner | Tempest Strider | Storm Whisperer
Elementalist | Avatar of Flame | Avatar of Frost
Arcanist | Void Scholar | Reality Shaper
Warlock | Hellbinder | Curse Sovereign
Occult Priest | Abyss Speaker | Blood Prophet
Chi Guardian | Spiritual Titan | Iron Veins Monk
Shadow Fist | Night Reaper | Silent Executioner
Beast Caller | Alpha Tamer | Prime Beastlord
Forest Warden | Emerald Herald | Nature Sentinel
Blood Reaver | Rage Incarnate | Crimson Tyrant
Titan Brute | Mountain King | Juggernaut
Grand Smith | Forgemaster | Runesmith
Master Tailor | Mythweaver | Threadmancer
Tracker | Nightstalker | High Huntsman
Beast Slayer | Dragon Bane | Primeval Killer
Transmuter | Goldmaker | Matter Architect
Poisonwright | Toxin Emperor | Venom Apostle
Herbal Sage | Verdant Hierophant | Life Weaver
Venom Crafter | Plague Tempest | Venom Sovereign
Runeforger | Runelord | Geomantic Judge
Crystal Binder | Arcane Channeler | Prismancer
Tinker | Steelwright | Dynamo Hacker
Saboteur | Shadow Trigger | Chemical Reaper

5. PROGRESSÃO (LÓGICA TÉCNICA)
Iniciante (Nível 1–10)
  ↓
Classe Base (10–25)
  ↓
Classe Avançada (25–50)
  ↓
Classe Elite SS (50–100)

Requisitos (resumo)
- Classe Base: 2 skills ≥ 10
- Classe Avançada: Classe Base ≥ 25 + skill principal ≥ 20
- Elite SS: Classe Avançada ≥ 50 + skill especializada ≥ 30

6. BÔNUS TÉCNICOS
- Skills: bônus incrementais por nível (ex.: +2% dano em Swordsmanship por nível).
- Classes: multiplicadores (5%–10%), desbloqueio de habilidades, crafting/equipamentos exclusivos.

7. IMPLEMENTAÇÃO (BACKEND)
Tabelas mínimas:
- skills: { id, name, level, xp, xpToNext }
- class_current: { base, advanced, elite }
- class_progress: { classId, level, xp }
- requirements: { classId, requiredSkills, requiredLevels }
- bonuses: { classId, effectType, effectValue }

8. ENTREGA PARA O MVP
- criação de personagem
- cálculo de XP por uso
- bloqueio/desbloqueio de classes
- requisitos para ascensão
- tabela estável para futuras skills e perks
