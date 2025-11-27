import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
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
import { useTheme } from "@/components/ThemeProvider";
import { WoodenButton, WoodenInput, MedievalCard, MedievalSection } from "@/components/UniversalUi";

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
  onCreateCharacter: (event: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  characterLimitReached: boolean;
  lastRoute: string | null;
  onContinueLastRoute: (route: string) => void;
}

// Skeleton animado para personagens
const CharacterSkeleton = () => {
  const { theme } = useTheme();
  
  const getBgClass = () => {
    if (theme === "kawaii") return "bg-pink-200/30";
    if (theme === "royal-medieval") return "bg-amber-800/30";
    return "bg-stone-800/50";
  };

  return (
    <div className={`w-full rounded-xl border p-4 animate-pulse ${getBgClass()}`}>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-md bg-current/20" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-5 bg-current/20 rounded w-3/4" />
          <div className="h-4 bg-current/10 rounded w-1/2" />
          <div className="h-3 bg-current/10 rounded w-2/3" />
          <div className="h-3 bg-current/10 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

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
  const { theme } = useTheme();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const getCardClass = () => {
    if (theme === "kawaii") return "bg-white/90 border-pink-300";
    if (theme === "royal-medieval") return "bg-amber-900/80 border-amber-600";
    return "bg-stone-950/90 border-amber-800/30";
  };

  const getHeaderClass = () => {
    if (theme === "kawaii") return "text-pink-700";
    if (theme === "royal-medieval") return "text-amber-100";
    return "text-amber-300";
  };

  const getSubtextClass = () => {
    if (theme === "kawaii") return "text-pink-600";
    if (theme === "royal-medieval") return "text-amber-200";
    return "text-stone-400";
  };

  const getButtonVariant = () => {
    if (theme === "kawaii") return "wood";
    if (theme === "royal-medieval") return "sand";
    return "wood";
  };

  const getSelectedRingClass = () => {
    if (theme === "kawaii") return "ring-pink-400";
    if (theme === "royal-medieval") return "ring-amber-400";
    return "ring-amber-400";
  };

  const getModalOverlayClass = () => {
    if (theme === "kawaii") return "bg-pink-900/40";
    if (theme === "royal-medieval") return "bg-red-900/50";
    return "bg-black/60";
  };

  const openModal = () => {
    if (characterLimitReached) return;
    setIsAnimating(true);
    setIsCreateModalOpen(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsCreateModalOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  // Função de submissão SEM parâmetros (compatível com WoodenButton)
  const handleCreateSubmit = () => {
    const form = document.createElement('form');
    const event = { 
      preventDefault: () => {}, 
      currentTarget: form 
    } as unknown as React.FormEvent<HTMLFormElement>;
    void onCreateCharacter(event);
    closeModal();
  };

  // Auto-focus no nome quando modal abre
  useEffect(() => {
    if (isCreateModalOpen) {
      const timer = setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>('input[placeholder="Máximo 16 caracteres"]');
        input?.focus();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isCreateModalOpen]);

  return (
    <MedievalSection title="Minha Conta">
      <div className="mt-6 grid gap-6 md:grid-cols-[2fr_3fr]">
        {/* Lista de Personagens */}
        <MedievalCard className={getCardClass()}>
          <h3 className={`text-lg font-semibold ${getHeaderClass()}`}>Selecione quem vai jogar</h3>
          {characterFeedback && <p className={getSubtextClass()}>{characterFeedback}</p>}
          
          <div className="grid gap-4 md:grid-cols-1 mt-4">
            {refreshing ? (
              <>
                <CharacterSkeleton />
                <CharacterSkeleton />
                <CharacterSkeleton />
              </>
            ) : characters.length > 0 ? (
              characters.map((character) => {
                const characterId = character._id ?? "";
                const isSelected = selectedCharacter === characterId;
                const spirit = getCharacterSpirit(character.spiritId);
                return (
                  <button
                    key={character._id ?? character.name}
                    type="button"
                    className={`w-full rounded-xl border p-4 text-left text-sm transition-all duration-200 hover:scale-[1.02] ${isSelected ? `ring-2 ${getSelectedRingClass()}` : ""}`}
                    onClick={() => characterId && onSelectCharacter(characterId)}
                    disabled={!characterId}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="character-display"
                        style={getPreviewStyle(character.sprite, character.spriteColor)}
                      />
                      <div className="flex flex-col gap-1">
                        <strong className={`text-lg ${getHeaderClass()}`}>{character.name}</strong>
                        <span className={getSubtextClass()}>
                          sprite {character.sprite} — nível {character.stats.level}
                        </span>
                        <span className={`${getSubtextClass()} opacity-70`}>
                          Espírito: {spirit.nome} ({spirit.mundo})
                        </span>
                        <span className={`${getSubtextClass()} opacity-70`}>Cor: {formatColorLabel(character.spriteColor)}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <p className={`${getSubtextClass()} text-center py-8`}>Nenhum personagem criado.</p>
            )}
          </div>
          
          <WoodenButton
            label="Jogar (ir para a cidade)"
            variant={getButtonVariant()}
            onClick={() => void onEnterCity()}
            disabled={!selectedCharacter}
            fullWidth
            className="mt-6"
          />
        </MedievalCard>

        {/* Botão único para criar personagem */}
        <MedievalCard className={getCardClass()}>
          <h3 className={`text-lg font-semibold ${getHeaderClass()}`}>Criar personagem</h3>
          <p className={`${getSubtextClass()} opacity-80 mt-2 mb-4`}>
            Escolha o espírito controlador, a forma base (todos iniciantes) e as cores.
          </p>
          <WoodenButton
            label={characterLimitReached ? "Limite atingido (4/4)" : "Abrir criador"}
            variant={getButtonVariant()}
            onClick={openModal}
            disabled={characterLimitReached}
            fullWidth
          />
        </MedievalCard>
      </div>

      {/* Modal de Criação de Personagem */}
      {isCreateModalOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center ${getModalOverlayClass()} backdrop-blur-sm transition-opacity duration-300`}
          onClick={closeModal}
        >
          <div 
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${getCardClass()} transform transition-all duration-300 ${
              isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl font-bold hover:scale-110 transition-transform duration-200"
              onClick={closeModal}
              aria-label="Fechar"
            >
              ×
            </button>
            
            <h3 className={`text-xl font-semibold mb-2 ${getHeaderClass()}`}>Criar Novo Personagem</h3>
            <p className={`${getSubtextClass()} opacity-80 mb-6 text-sm`}>
              Personalize seu herói antes de entrar no mundo.
            </p>
            
            <div className="space-y-5">
              <div>
                <h4 className={`text-sm font-semibold uppercase tracking-wide ${getHeaderClass()} mb-2`}>
                  Espírito ancestral
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {characterSpirits.map((spirit) => {
                    const isSelected = characterForm.spiritId === spirit.id;
                    return (
                      <button
                        key={spirit.id}
                        type="button"
                        className={`rounded-lg border p-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                          isSelected ? `ring-2 ${getSelectedRingClass()}` : ""
                        }`}
                        onClick={() => onChangeCharacterForm({ spiritId: spirit.id })}
                      >
                        <div className="flex flex-col items-center">
                          <Image 
                            src={spirit.image} 
                            alt={spirit.nome} 
                            width={80} 
                            height={80} 
                            className="w-20 h-20 rounded object-cover" 
                          />
                          <span className={`text-xs mt-1 font-medium ${getHeaderClass()}`}>
                            {spirit.nome}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-semibold uppercase tracking-wide ${getHeaderClass()} mb-2`}>
                  Aparência inicial
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {spriteOptions.map((option) => {
                    const isSelected = characterForm.sprite === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={`rounded-lg border p-2 transition-all duration-200 hover:scale-[1.02] ${
                          isSelected ? `ring-2 ${getSelectedRingClass()}` : ""
                        }`}
                        onClick={() => onChangeCharacterForm({ sprite: option.value })}
                      >
                        <div
                          className="character-display mx-auto w-12 h-12"
                          style={getPreviewStyle(option.value, characterForm.spriteColor)}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-semibold uppercase tracking-wide ${getHeaderClass()} mb-2`}>Paleta de cores</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {spriteColorOptions.map((option) => {
                    const isActive = characterForm.spriteColor === option.value;
                    return (
                      <WoodenButton
                        key={option.value}
                        label={option.label}
                        variant={getButtonVariant()}
                        size="sm"
                        onClick={() => onChangeCharacterForm({ spriteColor: option.value })}
                        className={isActive ? (theme === "kawaii" ? "ring-2 ring-pink-400" : "ring-2 ring-amber-400") : ""}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={`block mb-2 text-sm ${getHeaderClass()}`}>
                  Nome do personagem
                </label>
                <WoodenInput
                  value={characterForm.name}
                  onChange={(value) => onChangeCharacterForm({ name: value })}
                  placeholder="Máximo 16 caracteres"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <WoodenButton
                  label="Cancelar"
                  variant="secondary"
                  onClick={closeModal}
                  fullWidth
                />
                <WoodenButton
                  label="Confirmar criação"
                  variant={getButtonVariant()}
                  onClick={handleCreateSubmit}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </MedievalSection>
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
    filter: `${tint} drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))`,
    transform: `scale(${previewScale * 0.8})`,
    transformOrigin: "center"
  };
}

function formatColorLabel(color?: number) {
  const option = spriteColorOptions.find((item) => item.value === color);
  return option?.label ?? "Cor 1";
}