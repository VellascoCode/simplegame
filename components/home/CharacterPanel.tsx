import type { FormEvent } from "react";
import type { Character } from "@/lib/models";
import { getCharacterSpriteConfig } from "@/lib/characterSprites";

type CharacterFormState = { name: string; sprite: string };

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
  spriteOptions: readonly string[];
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
  spriteOptions,
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
        {lastRoute && (
          <button className="button" type="button" onClick={() => onContinueLastRoute(lastRoute)}>
            Continuar em {lastRoute}
          </button>
        )}
      </header>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-[#a1652c] bg-[#2d160b]/80 p-5 shadow-inner">
          <h3 className="text-lg font-semibold text-amber-100">Dados do jogador</h3>
          <p>E-mail: {userEmail || "—"}</p>
          <p>Personagens: {characters.length} / 4</p>
          {refreshing && <p>Atualizando lista…</p>}
        </article>

        <article className="rounded-2xl border border-[#a1652c] bg-[#2d160b]/80 p-5 shadow-inner">
          <h3 className="text-lg font-semibold text-amber-100">Selecione quem vai jogar</h3>
          {characterFeedback && <p className="text-amber-200">{characterFeedback}</p>}
          <div className="grid gap-4 md:grid-cols-1">
            {characters.map((character) => {
              const characterId = character._id ?? "";
              const isSelected = selectedCharacter === characterId;
              return (
                <button
                  key={character._id ?? character.name}
                  type="button"
                  className={`rounded-2xl border border-[#9c5f29] bg-[#1d0d06]/70 p-4 text-left text-sm transition ${isSelected ? "ring-2 ring-amber-400" : ""}`}
                  onClick={() => characterId && onSelectCharacter(characterId)}
                  disabled={!characterId}
                >
                  <div className="flex items-center gap-4">
                    <div className={`character-display ${getSpriteVariant(character.sprite)}`} style={getPreviewStyle(character.sprite)} />
                    <div className="flex flex-col gap-1">
                      <strong className="text-amber-50 text-lg">{character.name}</strong>
                      <span className="text-amber-100/75">
                        sprite {character.sprite} — nível {character.stats.level}
                      </span>
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
            <label htmlFor="character-name">Nome</label>
            <input
              id="character-name"
              required
              minLength={3}
              value={characterForm.name}
              onChange={(event) => onChangeCharacterForm({ name: event.target.value })}
              disabled={characterLimitReached}
            />
            <label htmlFor="character-sprite">Sprite</label>
            <select
              id="character-sprite"
              value={characterForm.sprite}
              onChange={(event) => onChangeCharacterForm({ sprite: event.target.value })}
              disabled={characterLimitReached}
            >
              {spriteOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <button className="button" disabled={characterLimitReached}>
              {characterLimitReached ? "Limite atingido" : "Criar personagem"}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}

function getSpriteVariant(sprite: string) {
  if (sprite === "guerreiro") return "variant-guerreiro";
  if (sprite === "arqueira") return "variant-arqueira";
  if (sprite === "mago") return "variant-mago";
  return "";
}

function getPreviewStyle(sprite: string) {
  const config = getCharacterSpriteConfig(sprite);
  const idle = config.idle;
  const duration = idle.frames / idle.frameRate;
  return {
    backgroundImage: `url(${idle.sheet})`,
    backgroundSize: `${idle.frames * 100}% 100%`,
    animation: `character-walk ${duration}s steps(${idle.frames}) infinite`
  };
}
