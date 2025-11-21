import type { FC } from "react";

import Image from "next/image";

import {
  assetHighlights,
  featureHighlights,
  loreSections,
  roadmapSteps,
  roadmapTiles,
  showcaseClasses
} from "./constants";

interface LandingSectionsProps {
  onRequestRegister: () => void;
  onRequestLogin: () => void;
  feedback: string | null;
}

export const LandingSections: FC<LandingSectionsProps> = ({ onRequestLogin, onRequestRegister, feedback }) => {
  return (
    <>
      <HeroSection onRegister={onRequestRegister} onLogin={onRequestLogin} feedback={feedback} />
      <FeatureGrid />
      <LoreSection />
      <TechChecklist onRequestLogin={onRequestLogin} />
      <AssetShowcase />
      <NpcShowcase />
      <FlowSection />
    </>
  );
};

const HeroSection = ({ onRegister, onLogin, feedback }: { onRegister: () => void; onLogin: () => void; feedback: string | null }) => (
  <section className="rounded-[32px] border border-[#7a4b1a] bg-gradient-to-br from-[#4a2c19] to-[#2b160b] p-10 text-amber-100 shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">MVP — Mundo 2D Spinazzi</p>
        <h1 className="font-display text-3xl text-amber-50">Landing oficial do projeto</h1>
        <p className="text-amber-100/80">
          Siga o README sem atalhos: registre-se, crie até quatro personagens e entre direto no mapa da cidade (Phaser + inventário + online + chat).
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#f7c681] to-[#c16a27] px-8 py-3 font-bold uppercase tracking-wider text-[#341507] shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition hover:brightness-110"
            type="button"
            onClick={() => onRegister()}
          >
            Registrar
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full border border-amber-300/60 px-8 py-3 font-bold uppercase tracking-wider text-amber-100 transition hover:bg-amber-200/10"
            type="button"
            onClick={() => onLogin()}
          >
            Login
          </button>
        </div>
        {feedback && <p className="text-amber-200">{feedback}</p>}
      </div>
      <div className="rounded-3xl border border-[#c6853e] bg-[#2a150a]/80 p-6">
        <h3 className="text-lg font-semibold text-amber-100">Roadmap obrigatório</h3>
        <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
          {roadmapSteps.map((step) => (
            <li key={step} className="flex items-center gap-3">
              <span className="inline-flex h-3 w-3 rounded-full bg-amber-400" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const FeatureGrid = () => (
  <section className="card">
    <h3 className="text-xl font-semibold text-amber-100">Por que seguir este layout?</h3>
    <div className="mt-6 grid gap-6 md:grid-cols-3">
      {featureHighlights.map((feature) => (
        <article key={feature.title} className="rounded-2xl border border-[#a1652c] bg-[#311909]/70 p-5 text-sm text-amber-100/85 shadow-inner">
          <h4 className="text-lg font-semibold text-amber-100">{feature.title}</h4>
          <p className="mt-2">{feature.description}</p>
        </article>
      ))}
    </div>
  </section>
);

const LoreSection = () => (
  <section className="card">
    <h3 className="text-xl font-semibold text-amber-100">Seções obrigatórias do MVP</h3>
    <p className="text-amber-100/80">As regras abaixo resumem o README e devem ser respeitadas em qualquer implementação.</p>
    <div className="mt-6 grid gap-6 md:grid-cols-3">
      {loreSections.map((section) => (
        <article key={section.title} className="rounded-2xl border border-[#a1652c] bg-[#2e170c] p-5 text-sm text-amber-100/85 shadow-inner">
          <h4 className="text-lg font-semibold text-amber-100">{section.title}</h4>
          <p className="mt-2">{section.content}</p>
        </article>
      ))}
    </div>
  </section>
);

const TechChecklist = ({ onRequestLogin }: { onRequestLogin: () => void }) => (
  <section className="card">
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">Tech + Stack</p>
        <h3 className="text-2xl font-bold text-amber-50">Mongo, Next.js e Phaser sincronizados</h3>
        <p className="text-amber-100/80">
          Sessões seguras, personagens persistentes e HUD 100% ligado às APIs descritas no README. Ideal para continuar o MVP sem improvisos.
        </p>
        <button className="button" type="button" onClick={() => onRequestLogin()}>
          Entrar após login
        </button>
      </div>
      <div className="rounded-[28px] border border-[#8b4f1f] bg-[#1d0d05]/80 p-6 text-sm text-amber-100/80">
        <p>Checklist rápido:</p>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          <li>Login usa NextAuth (Credentials) para definir o owner via JWT seguro.</li>
          <li>Seleção de personagem chama `/api/session/select`.</li>
          <li>Mapa lê `/api/session/state` antes de renderizar o Phaser.</li>
          <li>Posição salva via `/api/session/position`.</li>
          <li>Slots rápidos persistem em `/api/quickslots`.</li>
        </ul>
      </div>
    </div>
  </section>
);

const AssetShowcase = () => (
  <section className="card">
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">Assets e mapas</p>
        <h3 className="text-2xl font-bold text-amber-50">Tudo controlado pelo repositório</h3>
        <p className="text-amber-100/80">
          Os mapas (JSON) e os sprites vivem em `/public`. O editor `/editor` usa o mesmo arquivo que o Phaser, então qualquer ajuste em `map_city.json` é
          refletido imediatamente no jogo.
        </p>
        <ul className="space-y-2 text-sm text-amber-100/80">
          {assetHighlights.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
              <span className="font-semibold text-amber-50">{item.label}:</span> {item.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[28px] border border-[#8b4f1f] bg-gradient-to-b from-[#3a1c0e] to-[#1a0a05] p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Image src="/tilesets/tile1.png" alt="Tile 1" width={256} height={256} className="h-full w-full rounded-2xl border border-[#653816] bg-[#120703] object-contain p-3" />
          <Image src="/sprites/warriorblue/walk.png" alt="Warrior" width={256} height={256} className="h-full w-full rounded-2xl border border-[#653816] bg-[#120703] object-contain p-3" />
          <Image src="/sprites/lancer/attack.png" alt="Lanceiro" width={256} height={256} className="h-full w-full rounded-2xl border border-[#653816] bg-[#120703] object-contain p-3" />
          <Image src="/gui/Banner_Orange.svg" alt="GUI" width={256} height={256} className="h-full w-full rounded-2xl border border-[#653816] bg-[#120703] object-contain p-3" />
        </div>
      </div>
    </div>
  </section>
);

const NpcShowcase = () => (
  <section className="card">
    <h3 className="text-xl font-semibold text-amber-100">Personagens e NPCs em teste</h3>
    <div className="mt-6 grid gap-6 md:grid-cols-3">
      {showcaseClasses.map((hero) => (
        <article key={hero.name} className="rounded-2xl border border-[#8b4f1f] bg-[#1f0d05]/80 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-[#2b150b] p-2">
              <Image src={hero.sprite} alt={hero.name} width={80} height={80} className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">{hero.role}</p>
              <h4 className="text-lg font-semibold text-amber-50">{hero.name}</h4>
            </div>
          </div>
          <p className="mt-4 text-sm text-amber-100/80">{hero.description}</p>
        </article>
      ))}
    </div>
  </section>
);

const FlowSection = () => (
  <section className="card">
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1 space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">Owner vs Character</p>
        <h3 className="text-2xl font-bold text-amber-50">Conta segura, personagens independentes</h3>
        <p className="text-amber-100/80">
          Owner = a conta logada via email/senha (Mongo + NextAuth JWT). Character = cada avatar jogável com XP, HP, inventário e posição próprios. A
          landing obriga escolher um character para habilitar o botão “Jogar”.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {roadmapTiles.map((tile) => (
            <article key={tile.title} className="rounded-2xl border border-[#8b4f1f] bg-[#1f0d05]/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/60">{tile.subtitle}</p>
              <h4 className="text-lg font-semibold text-amber-50">{tile.title}</h4>
              <p className="text-sm text-amber-100/80">{tile.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="flex-1 rounded-[32px] border border-[#70421a] bg-gradient-to-b from-[#3a1d0c] to-[#1a0a05] p-6 text-sm text-amber-100/80 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Fluxo resumido</p>
        <ol className="mt-4 space-y-3 list-decimal list-inside">
          <li>Owner faz login → NextAuth define a sessão e libera `/api/session/*`.</li>
          <li>Seleciona um character → `/api/session/select` salva ownerId + characterId + mapa.</li>
          <li>`/api/session/state` alimenta `/city` antes do Phaser inicializar.</li>
          <li>Posição e quick slots persistem via `/api/session/position` e `/api/quickslots`.</li>
        </ol>
      </div>
    </div>
  </section>
);
