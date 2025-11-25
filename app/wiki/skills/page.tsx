import { WoodPanel, WoodenButton, MedievalSection, MedievalCard, RoyalCard, RoyalSection } from "@/components/wiki/WoodenUi";
import Image from "next/image";

export const runtime = "nodejs";
export const preferredRegion = "home";

export default function SkillsWikiPage() {
  return (
    <section className="min-h-screen bg-amber-950 p-2">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-2 md:px-4">
        <header className="space-y-4">
          <p className="text-5xl font-semibold uppercase tracking-widest text-amber-300 pt-4">
            Wiki
          </p>
        <hr className="my-4 h-1 w-full border-0 bg-gradient-to-r from-red-700 via-amber-400 to-amber-700" />
          <div className="">
            <div className="flex items-center gap-2">
              <Image src="/icons/skills.png" alt="Ícone de skills" width={56} height={56} className="h-20 w-20" />
              <h1 className="text-3xl font-bold text-amber-300 drop-shadow-md">
                Guia de Skills
              </h1>
            </div>
            <p className="max-w-2xl text-sm text-amber-400/80">
              Todas as habilidades do jogo e como evoluí-las. Use esta página como referência rápida enquanto joga.
            </p>
          </div>
          <div className="mt-3 w-full overflow-hidden rounded-sm border-4 border-sky-950 bg-stone-900 shadow-2xl shadow-black">
            <Image
              src="/tilesets/wiki/skills/1.webp"
              alt="Banner GUI de Skills"
              width={2556}
              height={594}
              className="h-48 w-full object-cover"
              priority
            />
          </div>
        </header>

        <section className="space-y-4">
          <MedievalSection title="O que são skills?">
            <p className="text-sm">
              Skills representam o quanto o seu personagem domina uma atividade específica (coleta, produção ou
              combate).
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Skills sobem de nível pelo uso direto (colher, minerar, lutar, cozinhar etc.).</li>
              <li>
                • Toda ação relevante concede entre <span className="font-semibold text-amber-400">1 e 2 pontos de EXP</span> para a
                skill correspondente.
              </li>
              <li>
                • Cada nível exige sempre <span className="font-semibold text-amber-400">300 pontos de EXP</span>.
              </li>
              <li>
                • Skills concedem bônus passivos que afetam dano, precisão, defesa ou eficiência de
                coleta/produção.
              </li>
            </ul>
          </MedievalSection>
        </section>

        <section className="space-y-4">
          <SkillCategory
            title="Coleta"
            items={["Harvesting", "Woodcutting", "Mining", "Fishing", "Herbalism", "Gem Collecting"]}
            iconSrc="/icons/skills/harvesting.png"
          />
          <SkillCategory
            title="Produção"
            items={[
              "Cooking",
              "Alchemy",
              "Smithing",
              "Armoring",
              "Tailoring",
              "Fletching",
              "Herbcrafting",
              "Gemcutting",
              "Scrapcrafting"
            ]}
          />
          <SkillCategory
            title="Combate"
            items={[
              "Swordsmanship",
              "Archery",
              "Sorcery",
              "Dark Arts",
              "Nature Arts",
              "Heavy Weapons",
              "Defense",
              "Agility"
            ]}
          />
        </section>

        <section className="space-y-4">
          <MedievalSection title="Como as skills evoluem">
            <ul className="space-y-2 text-sm">
              <li>• Cada ação válida executada pelo personagem gera 1–2 EXP para a skill associada.</li>
              <li>
                • Ao acumular <span className="font-semibold text-amber-400">300 EXP</span>, a skill sobe{" "}
                <span className="font-semibold text-amber-400">1 nível</span> e o excedente é mantido para o próximo nível.
              </li>
              <li>
                • Compatibilidade com classe: um personagem de classe Tier <span className="font-semibold text-amber-400">X</span> só
                ganha EXP de uma skill quando{" "}
                <span className="font-semibold text-amber-400">skill.level ≤ classLevel × X</span>. Skills muito acima do nível da
                classe não recebem EXP.
              </li>
              <li>
                • A cada nível de skill, os buffs passivos associados são recalculados (placeholder técnico para
                futuros ajustes de balanceamento).
              </li>
            </ul>
          </MedievalSection>
        </section>

        <section className="space-y-4">
          <MedievalSection title="Bônus de skills (exemplos técnicos)">
            <div className="grid gap-3 md:grid-cols-2">
              <BonusCard
                skill="Swordsmanship"
                bullets={[
                  "+dano com armas de espada",
                  "+chance de acerto crítico corpo a corpo"
                ]}
              />
              <BonusCard
                skill="Archery"
                bullets={[
                  "+precisão com arcos/bestas",
                  "-desvio de trajetória em longa distância"
                ]}
              />
              <BonusCard
                skill="Defense"
                bullets={[
                  "+chance de bloqueio com escudo",
                  "-dano recebido em bloqueios bem-sucedidos"
                ]}
              />
              <BonusCard
                skill="Heavy Weapons"
                bullets={[
                  "+dano com machados/martelos pesados",
                  "+penetração contra alvos blindados"
                ]}
              />
              <BonusCard
                skill="Alchemy"
                bullets={[
                  "+efetividade de poções produzidas",
                  "-chance de falha na criação de consumíveis"
                ]}
              />
              <BonusCard
                skill="Cooking"
                bullets={[
                  "+duração de buffs de comida",
                  "+rendimento de porções por receita"
                ]}
              />
            </div>
          </MedievalSection>
        </section>

        <section className="space-y-4">
          <MedievalSection title="Fluxo de progressão">
            <p className="text-sm">
              De forma simplificada, o jogador coleta recursos, transforma em itens úteis e, por fim, utiliza esses
              recursos em combate.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 text-sm font-semibold uppercase tracking-widest">
              <DiagramStep label="Coleta" />
              <DiagramArrow />
              <DiagramStep label="Produção" />
              <DiagramArrow />
              <DiagramStep label="Combate" />
            </div>
          </MedievalSection>
        </section>

        <section className="space-y-4">
          <RoyalSection title="Teste de gamificação (protótipo)" variant="redRoyal">
            <div className="grid gap-3 md:grid-cols-3">
              <RoyalCard title="Conquistas por categoria" variant="redRoyal">
                <div className="flex flex-wrap gap-2">
                  <WoodenButton label="Coleta — Selo dourado" variant="wood" className="px-2 text-xs shadow-black/60" />
                  <WoodenButton label="Produção — Selo de runas" variant="wood" className="px-2 text-xs shadow-black/60" />
                  <WoodenButton label="Combate — Selo de batalha" variant="redRoyal" className="px-2 text-xs shadow-black/60" />
                </div>
              </RoyalCard>

              <RoyalCard title="Builds sugeridas" variant="blueRoyal">
                <ul className="space-y-1 text-sm text-stone-900">
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    Herbalist → Herbal Sage (Herbalism 25 / Herbcrafting 20 / Nature Arts 20)
                  </li>
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    Gemwright → Runeforger (Gemcutting 20 / Smithing 20 / Sorcery 20)
                  </li>
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    Scrapper → Saboteur (Scrapcrafting 20 / Agility 20 / Dark Arts 15)
                  </li>
                </ul>
              </RoyalCard>

              <RoyalCard title="Compatibilidade de classe" variant="blueRoyal">
                <ul className="space-y-1 text-sm text-stone-900">
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    Herbalism → Base: Herbalist | Avançada: Herbal Sage / Venom Crafter
                  </li>
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    Gemcutting → Base: Gemwright | Avançada: Runeforger / Crystal Binder
                  </li>
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    Scrapcrafting → Base: Scrapper | Avançada: Tinker / Saboteur
                  </li>
                </ul>
              </RoyalCard>

              <RoyalCard title="Rota de progressão (exemplo)" variant="redRoyal">
                <ol className="space-y-1 text-sm text-stone-900">
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    1) Skill gate: Herbalism 10 + Herbcrafting 10
                  </li>
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    2) Classe Base: Herbalist (Nível 10)
                  </li>
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    3) Classe Avançada: Herbal Sage (Base 25 + Herbalism 25 + Nature Arts 20)
                  </li>
                  <li className="rounded-sm border-2 border-black bg-amber-400 px-2 py-1">
                    4) Elite: Verdant Hierophant (Avançada 50 + Herbalism 30)
                  </li>
                </ol>
              </RoyalCard>

              <RoyalCard title="Modelos de botões" variant="blueRoyal">
                <div className="flex flex-wrap gap-2 text-xs">
                  <WoodenButton label="Wood" variant="wood" className="px-2 text-[11px]" />
                  <WoodenButton label="Sand" variant="sand" className="px-2 text-[11px]" />
                  <WoodenButton label="Red Royal" variant="redRoyal" className="px-2 text-[11px]" />
                  <WoodenButton label="Blue Royal" variant="blueRoyal" className="px-2 text-[11px]" />
                  <WoodenButton label="Danger" variant="danger" className="px-2 text-[11px]" />
                  <WoodenButton label="Secondary" variant="secondary" className="px-2 text-[11px]" />
                </div>
              </RoyalCard>
            </div>
          </RoyalSection>
        </section>
      </div>
    </section>
  );
}

type SkillCategoryProps = {
  title: string;
  items: string[];
  iconSrc?: string;
};

function SkillCategory({ title, items, iconSrc }: SkillCategoryProps) {
  const categoryIcon = title === "Coleta" ? "/icons/gathering.png" : iconSrc;
  return (
    <MedievalSection
      title={
        <span className="flex items-center gap-2">
          {categoryIcon && (
            <Image src={categoryIcon} alt={title} width={24} height={24} className="h-6 w-6 rounded-md border border-amber-900 bg-stone-900 shadow-md shadow-black/50" />
          )}
          <span>{title}</span>
        </span>
      }
    >
      <SkillsGrid items={items} category={title} />
    </MedievalSection>
  );
}

const skillMeta: Record<string, { icon: string; desc: string }> = {
  Harvesting: { icon: "/icons/skills/harvesting.png", desc: "Coleta plantas e cultivos básicos." },
  Woodcutting: { icon: "/icons/skills/woodcutting.png", desc: "Corte de troncos e madeira densa." },
  Mining: { icon: "/icons/skills/mining.png", desc: "Extração de minérios e pedras raras." },
  Fishing: { icon: "/icons/skills/fishing.png", desc: "Pesca em rios e lagos para recursos." },
  Herbalism: { icon: "/icons/skills/herbalism.png", desc: "Ervas, venenos e reagentes naturais." },
  "Gem Collecting": { icon: "/icons/skills/gemcollecting.png", desc: "Gemas brutas, cristais e catalisadores." },
  Cooking: { icon: "/icons/skills/cooking.png", desc: "Buffs e consumíveis de cozinha." },
  Alchemy: { icon: "/icons/skills/alchemy.png", desc: "Poções avançadas e catalisadores." },
  Smithing: { icon: "/icons/skills/smithing.png", desc: "Forja de armas e componentes metálicos." },
  Armoring: { icon: "/icons/skills/armoring.png", desc: "Placas, cota e proteção reforçada." },
  Tailoring: { icon: "/icons/skills/tailoring.png", desc: "Tecidos, mantos e reforços leves." },
  Fletching: { icon: "/icons/skills/fletching.png", desc: "Arcos, flechas e munição especializada." },
  Herbcrafting: { icon: "/icons/skills/herbcrafting.png", desc: "Emplastros, óleos e curativos de ervas." },
  Gemcutting: { icon: "/icons/skills/gemcutting.png", desc: "Lapidação e polimento de gemas." },
  Scrapcrafting: { icon: "/icons/skills/scrapcrafting.png", desc: "Engenhocas improvisadas e bombas." },
  Swordsmanship: { icon: "/icons/skills/swordsmanship.png", desc: "Maestria com espadas e cortes precisos." },
  Archery: { icon: "/icons/skills/archery.png", desc: "Precisão com arcos e bestas." },
  Sorcery: { icon: "/icons/skills/sorcery.png", desc: "Canalização arcana e feitiços." },
  "Dark Arts": { icon: "/icons/skills/dark arts.png", desc: "Magia sombria e maldições." },
  "Nature Arts": { icon: "/icons/skills/nature arts.png", desc: "Forças naturais e controle ambiental." },
  "Heavy Weapons": { icon: "/icons/skills/heavy weapons.png", desc: "Armas pesadas e impacto bruto." },
  Defense: { icon: "/icons/skills/defense.png", desc: "Bloqueio, parry e mitigação." },
  Agility: { icon: "/icons/skills/agility.png", desc: "Mobilidade, esquiva e velocidade." }
};

function SkillsGrid({ items, category }: { items: string[]; category: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MedievalCard key={item} className="p-3 shadow-none">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              {skillMeta[item]?.icon ? (
                <div className="h-16 w-16 overflow-hidden rounded-md border-2 border-amber-900 bg-stone-900 shadow-md shadow-black/50">
                  <Image src={skillMeta[item].icon} alt={item} width={64} height={64} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-md border-2 border-amber-900 bg-stone-800 shadow-md shadow-black/50" />
              )}
            </div>
            <div>
              <p className="text-base font-semibold text-amber-50">{item}</p>
              <p className="text-xs text-amber-200">{skillMeta[item]?.desc ?? ""}</p>
            </div>
          </div>
        </MedievalCard>
      ))}
    </div>
  );
}

type BonusCardProps = {
  skill: string;
  bullets: string[];
};

function BonusCard({ skill, bullets }: BonusCardProps) {
  return (
    <MedievalCard title={skill} subtitle="Exemplo de bônus">
      <div className="relative flex items-start gap-4 rounded-md border-2 border-amber-900/30 bg-gradient-to-br from-stone-900 to-black p-3 shadow-inner">
        <span className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 rounded-md bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 shadow-md" />
        <span className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-md bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 shadow-md" />
        <span className="pointer-events-none absolute left-2 bottom-2 h-1.5 w-1.5 rounded-md bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 shadow-md" />
        <span className="pointer-events-none absolute right-2 bottom-2 h-1.5 w-1.5 rounded-md bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-950 shadow-md" />
        
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 border-2 border-amber-950 text-xs font-semibold uppercase tracking-wide text-amber-100 shadow-lg">
          Ícone
        </div>
        
        <div className="flex-1 space-y-1">
          {bullets.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-sm bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-900 shadow-sm" />
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-amber-600/80">
        Imagem sugerida: ícone técnico representando a skill "{skill}" (64×64px).
      </p>
    </MedievalCard>
  );
}

function DiagramStep({ label }: { label: string }) {
  return (
    <div className="relative inline-flex w-40 items-center justify-center rounded-sm border-4 border-stone-950 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 p-3 text-amber-100 shadow-xl">
      <span className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md" />
      <span className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md" />
      <span className="pointer-events-none absolute left-2 bottom-2 h-1.5 w-1.5 rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md" />
      <span className="pointer-events-none absolute right-2 bottom-2 h-1.5 w-1.5 rounded-sm bg-gradient-to-br from-cyan-600 to-cyan-800 border border-cyan-950 shadow-md" />
      {label}
    </div>
  );
}

function DiagramArrow() {
  return <div className="h-6 w-6 text-center text-2xl text-amber-400">↓</div>;
}
