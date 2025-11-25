import { MedievalCard, MedievalSection } from "@/components/wiki/WoodenUi";

export const runtime = "nodejs";
export const preferredRegion = "home";

type BaseClass = {
  name: string;
  skills: string[];
};

type AdvancedClass = {
  base: string;
  name: string;
  skills: string[];
};

type EliteClass = {
  name: string;
  origin: string;
  role: string;
};

const BASE_CLASSES: BaseClass[] = [
  { name: "Warrior", skills: ["Swordsmanship", "Defense", "Heavy Weapons"] },
  { name: "Archer", skills: ["Archery", "Agility", "Fletching"] },
  { name: "Mage", skills: ["Sorcery", "Fire Arts", "Air Arts", "Nature Arts"] },
  { name: "Dark Acolyte", skills: ["Dark Arts", "Sorcery"] },
  { name: "Monk", skills: ["Agility", "Defense"] },
  { name: "Ranger", skills: ["Archery", "Nature Arts", "Agility"] },
  { name: "Berserker", skills: ["Heavy Weapons", "Defense"] },
  { name: "Artisan", skills: ["Tailoring", "Smithing", "Armoring"] },
  { name: "Hunter", skills: ["Archery", "Agility", "Cooking"] },
  { name: "Alchemist", skills: ["Alchemy", "Nature Arts"] }
];

const ADVANCED_CLASSES: AdvancedClass[] = [
  { base: "Warrior", name: "Knight", skills: ["Swordsmanship", "Defense"] },
  { base: "Warrior", name: "Blade Master", skills: ["Swordsmanship", "Agility"] },
  { base: "Archer", name: "Sniper", skills: ["Archery", "Fletching"] },
  { base: "Archer", name: "Windrunner", skills: ["Archery", "Air Arts"] },
  { base: "Mage", name: "Elementalist", skills: ["Fire Arts", "Air Arts", "Nature Arts"] },
  { base: "Mage", name: "Arcanist", skills: ["Sorcery", "Defense"] },
  { base: "Dark Acolyte", name: "Warlock", skills: ["Dark Arts", "Sorcery"] },
  { base: "Dark Acolyte", name: "Occult Priest", skills: ["Dark Arts", "Defense"] },
  { base: "Monk", name: "Chi Guardian", skills: ["Agility", "Defense"] },
  { base: "Monk", name: "Shadow Fist", skills: ["Agility", "Swordsmanship"] },
  { base: "Ranger", name: "Beast Caller", skills: ["Nature Arts", "Agility"] },
  { base: "Ranger", name: "Forest Warden", skills: ["Nature Arts", "Defense"] },
  { base: "Berserker", name: "Blood Reaver", skills: ["Heavy Weapons", "Agility"] },
  { base: "Berserker", name: "Titan Brute", skills: ["Heavy Weapons", "Defense"] },
  { base: "Artisan", name: "Grand Smith", skills: ["Smithing", "Armoring"] },
  { base: "Artisan", name: "Master Tailor", skills: ["Tailoring", "Fletching"] },
  { base: "Hunter", name: "Tracker", skills: ["Archery", "Agility"] },
  { base: "Hunter", name: "Beast Slayer", skills: ["Archery", "Heavy Weapons"] },
  { base: "Alchemist", name: "Transmuter", skills: ["Alchemy", "Smithing"] },
  { base: "Alchemist", name: "Poisonwright", skills: ["Alchemy", "Dark Arts"] }
];

const ELITE_CLASSES: EliteClass[] = [
  { name: "Paladin", origin: "Knight → Paladin", role: "Mitiga dano físico e oferece suporte defensivo." },
  { name: "Royal Defender", origin: "Knight → Royal Defender", role: "Proteção de grupo e controle de ameaça." },
  { name: "Duelist", origin: "Blade Master → Duelist", role: "Especialista em 1x1 e dano de alvo único." },
  { name: "Soul Blade", origin: "Blade Master → Soul Blade", role: "Converte dano em efeitos de drenagem." },
  { name: "Eagle Eye", origin: "Sniper → Eagle Eye", role: "Maior alcance e precisão extrema em alvos distantes." },
  { name: "Phantom Arrow", origin: "Sniper → Phantom Arrow", role: "Tiros que ignoram parte de defesa e cobertura." },
  { name: "Tempest Strider", origin: "Windrunner → Tempest Strider", role: "Mobilidade alta e dano em área baseado em vento." },
  { name: "Storm Whisperer", origin: "Windrunner → Storm Whisperer", role: "Controle de campo com lentidão e deslocamento." },
  { name: "Avatar of Flame", origin: "Elementalist → Avatar of Flame", role: "Dano em área de fogo e efeitos de queimadura." },
  { name: "Avatar of Frost", origin: "Elementalist → Avatar of Frost", role: "Controle e redução de velocidade por gelo." },
  { name: "Void Scholar", origin: "Arcanist → Void Scholar", role: "Manipula recursos mágicos e debuffs de mana." },
  { name: "Reality Shaper", origin: "Arcanist → Reality Shaper", role: "Buffs táticos e modificação de terreno temporária." },
  { name: "Hellbinder", origin: "Warlock → Hellbinder", role: "Foco em dano periódico e invocações agressivas." },
  { name: "Curse Sovereign", origin: "Warlock → Curse Sovereign", role: "Especialista em penalidades de status." },
  { name: "Abyss Speaker", origin: "Occult Priest → Abyss Speaker", role: "Debuffs em área e manipulação de medo." },
  { name: "Blood Prophet", origin: "Occult Priest → Blood Prophet", role: "Troca vida por poder em buffs fortes." },
  { name: "Spiritual Titan", origin: "Chi Guardian → Spiritual Titan", role: "Alta resistência a controle e mitigação." },
  { name: "Iron Veins Monk", origin: "Chi Guardian → Iron Veins Monk", role: "Regeneração aumentada e defesa sustentada." },
  { name: "Night Reaper", origin: "Shadow Fist → Night Reaper", role: "Explosões de dano em janelas curtas." },
  { name: "Silent Executioner", origin: "Shadow Fist → Silent Executioner", role: "Execução de alvos com pouca vida." },
  { name: "Alpha Tamer", origin: "Beast Caller → Alpha Tamer", role: "Mascotes fortes com controle preciso." },
  { name: "Prime Beastlord", origin: "Beast Caller → Prime Beastlord", role: "Mais mascotes simultâneos e buffs globais." },
  { name: "Emerald Herald", origin: "Forest Warden → Emerald Herald", role: "Suporte de área ligado à natureza." },
  { name: "Nature Sentinel", origin: "Forest Warden → Nature Sentinel", role: "Defesa regional e proteção de pontos." },
  { name: "Rage Incarnate", origin: "Blood Reaver → Rage Incarnate", role: "Dano crescente em combates longos." },
  { name: "Crimson Tyrant", origin: "Blood Reaver → Crimson Tyrant", role: "Bônus de dano contra múltiplos alvos." },
  { name: "Mountain King", origin: "Titan Brute → Mountain King", role: "Alta robustez e empurrões." },
  { name: "Juggernaut", origin: "Titan Brute → Juggernaut", role: "Avanço contínuo com redução de controle." },
  { name: "Forgemaster", origin: "Grand Smith → Forgemaster", role: "Cria equipamentos com valores otimizados." },
  { name: "Runesmith", origin: "Grand Smith → Runesmith", role: "Melhorias via runas e sockets." },
  { name: "Mythweaver", origin: "Master Tailor → Mythweaver", role: "Vestuário leve com foco em magia." },
  { name: "Threadmancer", origin: "Master Tailor → Threadmancer", role: "Encantamentos têxteis em armaduras." },
  { name: "Nightstalker", origin: "Tracker → Nightstalker", role: "Rastreamento furtivo e emboscadas." },
  { name: "High Huntsman", origin: "Tracker → High Huntsman", role: "Caça de elites e criaturas raras." },
  { name: "Dragon Bane", origin: "Beast Slayer → Dragon Bane", role: "Especializado em alvos de grande porte." },
  { name: "Primeval Killer", origin: "Beast Slayer → Primeval Killer", role: "Dano bruto contra monstros selvagens." },
  { name: "Goldmaker", origin: "Transmuter → Goldmaker", role: "Conversão eficiente de recursos em ouro." },
  { name: "Matter Architect", origin: "Transmuter → Matter Architect", role: "Criação de materiais avançados." },
  { name: "Toxin Emperor", origin: "Poisonwright → Toxin Emperor", role: "Maximiza dano e duração de venenos." },
  { name: "Venom Apostle", origin: "Poisonwright → Venom Apostle", role: "Combina venenos com suporte tático." }
];

export default function ClassesWikiPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1a0e0a] via-[#120805] to-[#050308] py-16 text-[#E4D6BA]">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#E8C06D] drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]">
            Wiki
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#E4D6BA] drop-shadow-[0_2px_0_rgba(0,0,0,0.6)] sm:text-4xl">
                Guia de Classes
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#E4D6BA]/80">
                Entenda todas as classes, tiers e ramificações para planejar sua evolução até o nível Elite.
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center rounded-md border-[3px] border-[#3A1D13] bg-gradient-to-b from-[#3A1D13] via-[#2b140d] to-[#050308] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
            <div className="flex h-24 w-full max-w-xl items-center justify-center rounded-md bg-[#3d2110] text-xs font-semibold uppercase tracking-[0.25em] text-[#E4D6BA]">
              Placeholder — Banner GUI Classes (820×180)
            </div>
          </div>
          <p className="text-xs text-[#C7B291]">
            Imagem sugerida: banner horizontal em madeira com silhuetas de classes (guerreiro, arqueiro, mago) em
            820×180px.
          </p>
        </header>

        <section>
          <MedievalSection title="Como funciona a progressão">
            <p className="text-sm text-[#E4D6BA]">
              O personagem começa sem classe definida e, conforme avança de nível global, desbloqueia tiers de classe
              que dão acesso a rotas cada vez mais especializadas.
            </p>
            <ul className="mt-2 space-y-1 text-sm text-[#E4D6BA]">
              <li>• Você começa sem classe.</li>
              <li>• Nível 10 → Classe Base (Tier 1).</li>
              <li>• Nível 20 → Classe Tier 2 (Avançada).</li>
              <li>• Nível 45 → Classe Tier 3.</li>
              <li>• Nível 50 → Classe Tier 4.</li>
              <li>• Nível 100 na Tier 4 → Classe Elite.</li>
            </ul>
            <p className="mt-2 text-sm text-[#E4D6BA]">
              Ao trocar de classe (por exemplo, de Base para Avançada ou de Avançada para Elite), o{" "}
              <span className="font-semibold text-[#7B2F2F]">nível da classe é resetado para 1</span>, mas o progresso global do
              personagem e das skills é mantido.
            </p>
          </MedievalSection>
        </section>

        <section>
          <MedievalSection title="Classes base (Tier 1)">
            <p className="text-sm text-[#E4D6BA]">
              As classes base são o primeiro passo da especialização. Elas definem quais skills são mais eficientes
              para o seu personagem.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {BASE_CLASSES.map((baseClass) => (
                <MedievalCard key={baseClass.name} title={baseClass.name} subtitle="Classe base">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#E8C06D]/80">Skills associadas</p>
                  <ul className="mt-1 space-y-1 text-[#E4D6BA]">
                    {baseClass.skills.map((skill) => (
                      <li key={skill}>• {skill}</li>
                    ))}
                  </ul>
                </MedievalCard>
              ))}
            </div>
          </MedievalSection>
        </section>

        <section>
          <MedievalSection title="Classes avançadas (Tier 2–3)">
            <p className="text-sm text-[#E4D6BA]">
              As classes avançadas aprofundam o foco da classe base, exigindo níveis específicos em skills
              relacionadas.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ADVANCED_CLASSES.map((advanced) => (
                <MedievalCard key={`${advanced.base}-${advanced.name}`} title={advanced.name} subtitle="Classe avançada">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#E8C06D]">Classe base</p>
                  <p className="text-sm font-semibold text-[#2b1a12]">{advanced.base}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#E8C06D]/80">Skills exigidas</p>
                  <ul className="mt-1 space-y-1 text-[#E4D6BA]">
                    {advanced.skills.map((skill) => (
                      <li key={skill}>• {skill}</li>
                    ))}
                  </ul>
                </MedievalCard>
              ))}
            </div>
          </MedievalSection>
        </section>

        <section>
          <MedievalSection title="Classes Elite (Tier 4)">
            <p className="text-sm text-[#E4D6BA]">
              Classes Elite representam o ápice da progressão em cada rota. Exigem níveis altos de classe avançada e de
              skills específicas.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ELITE_CLASSES.map((elite) => (
                <MedievalCard key={elite.name} title={elite.name} subtitle="Classe elite">
                  <p className="mt-1 text-xs text-[#E4D6BA]/85">{elite.origin}</p>
                  <p className="mt-2 text-sm text-[#E4D6BA]">{elite.role}</p>
                </MedievalCard>
              ))}
            </div>
          </MedievalSection>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#E4D6BA] drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">Diagramas de progressão</h2>
          <p className="text-sm text-[#E4D6BA]/80">
            Cada classe base segue o mesmo padrão de ramificação: duas rotas avançadas, cada uma levando a duas
            opções Elite.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {BASE_CLASSES.map((base) => {
              const branches = ADVANCED_CLASSES.filter((adv) => adv.base === base.name);
              const branchA = branches[0];
              const branchB = branches[1];
              const elitesA = ELITE_CLASSES.filter((elite) =>
                elite.origin.startsWith(`${branchA?.name ?? ""} →`)
              );
              const elitesB = ELITE_CLASSES.filter((elite) =>
                elite.origin.startsWith(`${branchB?.name ?? ""} →`)
              );
              return (
                <div
                  key={base.name}
                  className="rounded-md border-[2px] border-[#5a3116] bg-gradient-to-b from-[#3a1d0b] via-[#221208] to-[#120904] p-4 text-xs text-[#E4D6BA]/85 shadow-[0_10px_0_rgba(0,0,0,0.65)]"
                >
                  <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[#E8C06D]">
                    {base.name}
                  </p>
                  <div className="space-y-1">
                    <DiagramLine label={`Base: ${base.name}`} />
                    {branchA && (
                      <>
                        <DiagramLine label={`├─ Avançada A: ${branchA.name}`} indent />
                        {elitesA.map((elite) => (
                          <DiagramLine
                            key={elite.name}
                            label={`│   ├─ Elite: ${elite.name}`}
                            indentDouble
                          />
                        ))}
                      </>
                    )}
                    {branchB && (
                      <>
                        <DiagramLine label={`└─ Avançada B: ${branchB.name}`} indent />
                        {elitesB.map((elite) => (
                          <DiagramLine
                            key={elite.name}
                            label={`    ├─ Elite: ${elite.name}`}
                            indentDouble
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

type DiagramLineProps = {
  label: string;
  indent?: boolean;
  indentDouble?: boolean;
};

function DiagramLine({ label, indent, indentDouble }: DiagramLineProps) {
  const paddingClass = indentDouble ? "pl-8" : indent ? "pl-4" : "";
  return <p className={paddingClass}>{label}</p>;
}
