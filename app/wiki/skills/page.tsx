import { WoodPanel, WoodenButton, MedievalSection, MedievalIconFrame, MedievalCard } from "@/components/wiki/WoodenUi";
import Image from "next/image";

export const runtime = "nodejs";
export const preferredRegion = "home";

export default function SkillsWikiPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-950 via-stone-950 to-orange-900 p-2 text-amber-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-2 md:px-4">
        <header className="space-y-5 p-4">
          <p className="text-4xl font-semibold uppercase tracking-widest text-amber-200">
            Wiki
          </p>
          <WoodPanel className="w-full rounded-md">
            <div className="flex w-full items-center justify-between gap-1 rounded-md bg-yellow-700 p-4">
              <WoodenButton label="Visão geral" variant="amber" className="w-full" />
              <WoodenButton label="Categorias" variant="vermelha" className="w-full" />
              <WoodenButton label="Bônus técnicos" variant="madeira" className="w-full" />
            </div>
          </WoodPanel>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Image src="/icons/skills.png" alt="Ícone de skills" width={56} height={56} className="h-12 w-12" />
              <h1 className="text-5xl font-bold text-amber-50 drop-shadow-md">
                Guia de Skills
              </h1>
            </div>
            <p className="max-w-2xl text-sm text-amber-200">
              Todas as habilidades do jogo e como evoluí-las. Use esta página como referência rápida enquanto joga.
            </p>
          </div>
          <div className="mt-3 w-full overflow-hidden rounded-md border-4 border-amber-900 bg-amber-900 shadow-lg">
            <Image
              src="/tilesets/wiki/skills/1.webp"
              alt="Banner GUI de Skills"
              width={2556}
              height={594}
              className="h-48 w-full object-cover md:h-60"
              priority
            />
          </div>
        </header>

        <section className="space-y-4">
          <MedievalSection title="O que são skills?" className=" border-4">
            <p className="text-sm ">
              Skills representam o quanto o seu personagem domina uma atividade específica (coleta, produção ou
              combate).
            </p>
            <ul className="mt-2 space-y-1 text-sm ">
              <li>• Skills sobem de nível pelo uso direto (colher, minerar, lutar, cozinhar etc.).</li>
              <li>
                • Toda ação relevante concede entre <span className="font-semibold text-red-800">1 e 2 pontos de EXP</span> para a
                skill correspondente.
              </li>
              <li>
                • Cada nível exige sempre <span className="font-semibold text-red-800">300 pontos de EXP</span>.
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
            items={["Harvesting", "Woodcutting", "Mining", "Fishing"]}
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
              "Fletching"
            ]}
          />
          <SkillCategory
            title="Combate"
            items={[
              "Swordsmanship",
              "Archery",
              "Sorcery",
              "Dark Arts",
              "Fire Arts",
              "Air Arts",
              "Nature Arts",
              "Heavy Weapons",
              "Defense",
              "Agility"
            ]}
          />
        </section>

        <section className="space-y-4">
          <MedievalSection title="Como as skills evoluem" className=" border-4">
            <ul className="space-y-2 text-sm text-amber-100">
              <li>• Cada ação válida executada pelo personagem gera 1–2 EXP para a skill associada.</li>
              <li>
                • Ao acumular <span className="font-semibold text-red-800">300 EXP</span>, a skill sobe{" "}
                <span className="font-semibold text-red-800">1 nível</span> e o excedente é mantido para o próximo nível.
              </li>
              <li>
                • Compatibilidade com classe: um personagem de classe Tier <span className="font-semibold text-red-800">X</span> só
                ganha EXP de uma skill quando{" "}
                <span className="font-semibold text-red-800">skill.level ≤ classLevel × X</span>. Skills muito acima do nível da
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
          <MedievalSection title="Bônus de skills (exemplos técnicos)" className=" border-4">
            <div className="grid gap-3 md:grid-cols-2 text-amber-100">
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
          <MedievalSection title="Fluxo de progressão" className=" border-4">
            <p className="text-sm text-amber-100">
              De forma simplificada, o jogador coleta recursos, transforma em itens úteis e, por fim, utiliza esses
              recursos em combate.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 text-sm font-semibold uppercase tracking-widest text-amber-100">
              <DiagramStep label="Coleta" />
              <DiagramArrow />
              <DiagramStep label="Produção" />
              <DiagramArrow />
              <DiagramStep label="Combate" />
            </div>
          </MedievalSection>
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
  return (
    <MedievalSection title={title} className=" border-4">
      <div className="flex items-center gap-4 p-3">
        <div className="flex flex-col items-center gap-1">
          {iconSrc ? (
            <div className="h-16 w-16 overflow-hidden rounded-md border-2 border-stone-800 bg-gray-700 shadow-inner">
              <Image src={iconSrc} alt={title} width={64} height={64} className="h-full w-full object-contain" />
            </div>
          ) : (
            <MedievalIconFrame />
          )}
          {/* IMAGE NEEDED: category-icon.png (64×64) */}
        </div>
        <p className="text-sm ">
          Agrupa skills relacionadas ao tema de <span className="font-semibold lowercase">{title}</span>.
        </p>
      </div>
      <SkillsGrid items={items} category={title} iconSrc={iconSrc} />
    </MedievalSection>
  );
}

function SkillsGrid({ items, category, iconSrc }: { items: string[]; category: string; iconSrc?: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MedievalCard key={item} className="text-sm p-3  border-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              {item === "Harvesting" && iconSrc ? (
                <div className="h-16 w-16 overflow-hidden rounded-md border-2 border-stone-800 bg-gray-700 shadow-inner">
                  <Image src={iconSrc} alt={item} width={64} height={64} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-md border-2 border-stone-800 bg-gray-700 shadow-inner" />
              )}
              {/* IMAGE NEEDED: skill-icon.png (64×64) */}
            </div>
            <div>
              <p className="text-base font-semibold ">{item}</p>
              <p className="text-xs uppercase tracking-wide ">{category}</p>
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
    <MedievalCard title={skill} subtitle="Exemplo de bônus" className="text-sm">
      <div className="relative flex items-start gap-4 rounded-md border border-amber-900 bg-gradient-to-r from-amber-950 via-stone-900 to-slate-950 p-3 shadow-inner">
        <span className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
        <span className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
        <span className="pointer-events-none absolute left-2 bottom-2 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
        <span className="pointer-events-none absolute right-2 bottom-2 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-b from-red-700 via-red-600 to-red-700 text-xs font-semibold uppercase tracking-wide text-amber-100 shadow-lg">
          Ícone {skill} (64×64)
        </div>
        <div className="flex-1 space-y-1 text-amber-900">
          {bullets.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-amber-500 to-amber-700 shadow" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-amber-200">
        Imagem sugerida: ícone técnico representando a skill "{skill}" (64×64px) com borda de madeira.
      </p>
    </MedievalCard>
  );
}

function DiagramStep({ label }: { label: string }) {
  return (
    <div className="relative inline-flex w-40 items-center justify-center rounded-md border-2 border-amber-900 bg-gradient-to-b from-amber-900 to-amber-950 p-3 text-amber-100 shadow-xl">
      <span className="pointer-events-none absolute left-2 top-1.5 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
      <span className="pointer-events-none absolute right-2 top-1.5 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
      <span className="pointer-events-none absolute left-2 bottom-1.5 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
      <span className="pointer-events-none absolute right-2 bottom-1.5 h-1.5 w-1.5 rounded-md bg-gradient-to-b from-red-700 to-red-800 shadow" />
      {label}
    </div>
  );
}

function DiagramArrow() {
  return <div className="h-6 w-6 text-center text-lg text-amber-300">→</div>;
}
