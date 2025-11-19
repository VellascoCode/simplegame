import spiritsData from "@/lib/data/spirits.json";

export type CharacterSpirit = {
  id: string;
  image: string;
  nome: string;
  classe: string;
  elemento: string;
  mundo: string;
};

export const characterSpirits = spiritsData as CharacterSpirit[];

export const characterSpiritIds = characterSpirits.map((spirit) => spirit.id) as ReadonlyArray<
  CharacterSpirit["id"]
>;

export type CharacterSpiritId = (typeof characterSpiritIds)[number];

export const defaultSpiritId: CharacterSpiritId =
  characterSpiritIds[0] ?? ("spirit1" as CharacterSpiritId);

const spiritMap = new Map(characterSpirits.map((spirit) => [spirit.id, spirit]));

export function getCharacterSpirit(spiritId?: string): CharacterSpirit {
  if (!spiritId) return spiritMap.get(defaultSpiritId)!;
  return spiritMap.get(spiritId) ?? spiritMap.get(defaultSpiritId)!;
}
