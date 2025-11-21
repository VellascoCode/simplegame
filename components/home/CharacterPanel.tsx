import type { CSSProperties, FormEvent } from "react";

import Image from "next/image";

import type { Character } from "@/lib/models";

import {
  type CharacterSpiritId,
  characterSpirits,
  getCharacterSpirit
} from "@/lib/characterSpirits";
import {
  getSpriteColorFilter,
  spriteColorOptions,
  type SpriteColorValue,
  spriteOptions,
  type SpriteOptionValue
} from "@/lib/characterSpriteOptions";
import { getCharacterSpriteConfig } from "@/lib/characterSprites";

type CharacterFormState = {
  name: string;
  sprite: SpriteOptionValue;
  spriteColor: SpriteColorValue;
  spiritId: CharacterSpiritId;
};

interface CharacterPanelProps {
  userEmail: string;
  characters: Character[];
  selectedCharacter: string;
  onSelectCharacter: (id: string) => void;
  onEnterCity: () => Promise<void> | void;
  refreshing: boolean;
  characterFeedback: string | null;
  characterForm: CharacterFormState;
  onChangeCharacterForm: (patch: Partial<CharacterFormState>) => void;
  onCreateCharacter: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
  characterLimitReached: boolean;
  lastRoute: string | null;
  onContinueLastRoute: (route: string) => void;
}

export function CharacterPanel({
  userEmail,
  characters,
  selectedCharacter,
  onSelectCharacter,
  onEnterCity,
  refreshing,
  characterFeedback,
  characterForm,
  onChangeCharacterForm,
  onCreateCharacter,
  characterLimitReached,
  lastRoute,
  onContinueLastRoute
}: CharacterPanelProps) {
  return (
    <section className="card">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-sm text-amber-100/70">Bem-vindo de volta</p>
          <h2 className="text-2xl font-bold text-amber-50">Minha Conta</h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-right text-sm leading-tight text-amber-100/80">
            <p>E-mail: {userEmail || "—"}</p>
            <p>Personagens: {characters.length} / 4</p>
          </div>
          {lastRoute && (
            <button className="button" type="button" onClick={() => onContinueLastRoute(lastRoute)}>
              Continuar em {lastRoute}
            </button>
          )}
        </div>
      </header>
      <div className="mt-6 grid gap-6 md:grid-cols-[2fr_3fr]">
        <article className="rounded-2xl border border-[#a1652c] bg-[#2d160b]/80 p-5 shadow-inner">
          <h3 className="text-lg font-semibold text-amber-100">Selecione quem vai jogar</h3>
          {characterFeedback && <p className="text-amber-200">{characterFeedback}</p>}
          {refreshing && <p className="text-amber-200/70">Atualizando lista…</p>}
          <div className="grid gap-4 md:grid-cols-1">
            {characters.map((character) => {
              const characterId = character._id ?? "";
              const isSelected = selectedCharacter === characterId;
              const spirit = getCharacterSpirit(character.spiritId);
              return (
                <button
                  key={character._id ?? character.name}
                  type="button"
                  className={`rounded-2xl border border-[#9c5f29] bg-[#1d0d06]/70 p-4 text-left text-sm transition ${isSelected ? "ring-2 ring-amber-400" : ""}`}
                  onClick={() => characterId && onSelectCharacter(characterId)}
                  disabled={!characterId}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="character-display"
                      style={getPreviewStyle(character.sprite, character.spriteColor)}
                    />
                    <div className="flex flex-col gap-1">
                      <strong className="text-amber-50 text-lg">{character.name}</strong>
                      <span className="text-amber-100/75">
                        sprite {character.sprite} — nível {character.stats.level}
                      </span>
                      <span className="text-amber-200/70">
                        Espírito: {spirit.nome} ({spirit.mundo})
                      </span>
                      <span className="text-amber-200/70">Cor: {formatColorLabel(character.spriteColor)}</span>
                    </div>
                  </div>
                </button>
              );
            })}
            {characters.length === 0 && <p>Nenhum personagem criado.</p>}
          </div>
          <button className="button mt-4 w-full" type="button" onClick={() => void onEnterCity()} disabled={!selectedCharacter}>
            Jogar (ir para a cidade)
          </button>
        </article>

        <article className="rounded-2xl border border-[#a1652c] bg-[#2d160b]/80 p-5 shadow-inner">
          <h3 className="text-lg font-semibold text-amber-100">Criar personagem</h3>
          <form
            onSubmit={(event) => {
              void onCreateCharacter(event);
            }}
          >
            <p className="text-amber-200/80">
              Escolha o espírito controlador, a forma base (todos iniciantes) e as cores.
            </p>
            <div className="mt-4 space-y-3">
              <h4 className="text-amber-50 text-sm font-semibold uppercase tracking-wide">
                Controlador vindo de outro mundo
              </h4>
              <div className="spirit-grid">
                {characterSpirits.map((spirit) => {
                  const isSelected = characterForm.spiritId === spirit.id;
                  return (
                    <button
                      key={spirit.id}
                      type="button"
                      className={`spirit-card ${isSelected ? "selected" : ""}`}
                      onClick={() => onChangeCharacterForm({ spiritId: spirit.id })}
                      disabled={characterLimitReached}
                    >
                      <Image src={spirit.image} alt={spirit.nome} width={120} height={120} />
                      <div className="mt-2 text-left text-xs text-amber-100">
                        <strong className="block text-base">{spirit.nome}</strong>
                        <span>Classe: {spirit.classe}</span>
                        <span>Elemento: {spirit.elemento}</span>
                        <span>Mundo: {spirit.mundo}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-amber-50 text-sm font-semibold uppercase tracking-wide">
                Escolha seu corpo iniciante
              </h4>
              <div className="sprite-grid">
                {spriteOptions.map((option) => {
                  const isSelected = characterForm.sprite === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`sprite-card ${isSelected ? "selected" : ""}`}
                      aria-label={option.label}
                      title={option.label}
                      onClick={() => onChangeCharacterForm({ sprite: option.value })}
                      disabled={characterLimitReached}
                    >
                      <div
                        className="character-display"
                        style={getPreviewStyle(option.value, characterForm.spriteColor)}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <h4 className="text-amber-50 text-sm font-semibold uppercase tracking-wide">Cores</h4>
              <div className="color-grid">
                {spriteColorOptions.map((option) => {
                  const isActive = characterForm.spriteColor === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`color-option ${isActive ? "active" : ""}`}
                      onClick={() => onChangeCharacterForm({ spriteColor: option.value })}
                      disabled={characterLimitReached}
                    >
                      <span>{option.label}</span>
                      <small>{option.description}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="mt-6 block" htmlFor="character-name">
              Nome
            </label>
            <input
              id="character-name"
              required
              minLength={3}
              value={characterForm.name}
              onChange={(event) => onChangeCharacterForm({ name: event.target.value })}
              disabled={characterLimitReached}
            />
            <button className="button" disabled={characterLimitReached}>
              {characterLimitReached ? "Limite atingido" : "Criar personagem"}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}

type SpritePreviewStyle = CSSProperties & {
  "--sprite-frame-count"?: number;
};

function getPreviewStyle(sprite: string, spriteColor?: number): SpritePreviewStyle {
  const config = getCharacterSpriteConfig(sprite);
  const idle = config.idle;
  const frameCount = Math.max(1, idle.frames);
  const frameRate = Math.max(1, idle.frameRate);
  const duration = frameCount / frameRate;
  const tint = getSpriteColorFilter(spriteColor as SpriteColorValue | undefined);
  const previewScale = config.previewScale ?? 1;
  return {
    backgroundImage: `url(${idle.sheet})`,
    backgroundSize: `${frameCount * 100}% 100%`,
    animation: `character-walk ${duration}s steps(${frameCount}) infinite`,
    "--sprite-frame-count": frameCount,
    filter: `${tint} drop-shadow(0 6px 12px rgba(0, 0, 0, 0.45))`,
    transform: `scale(${previewScale})`,
    transformOrigin: "center"
  };
}

function formatColorLabel(color?: number) {
  const option = spriteColorOptions.find((item) => item.value === color);
  return option?.label ?? "Cor 1";
}
