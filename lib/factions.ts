export enum FactionId {
  GoldenEagle = 0,
  BlackSerpent = 1,
  IronWolf = 2,
  ScarletRaven = 3
}

export const FACTION_IDS: FactionId[] = [
  FactionId.GoldenEagle,
  FactionId.BlackSerpent,
  FactionId.IronWolf,
  FactionId.ScarletRaven
];

export const FACTION_NAMES: Record<FactionId, string> = {
  [FactionId.GoldenEagle]: "ÁGUIA DOURADA",
  [FactionId.BlackSerpent]: "SERPENTE NEGRA",
  [FactionId.IronWolf]: "LOBO DE FERRO",
  [FactionId.ScarletRaven]: "CORVO ESCARLATE"
};

export type FactionName = FactionId;
export type FactionWarTeams = { teamA: FactionId[]; teamB: FactionId[] };
export type FactionWarState = FactionWarTeams & {
  startedAt: string;
  remaining: Record<FactionId, number>;
};

const FACTION_CHANTS: Record<FactionId, readonly string[]> = {
  [FactionId.GoldenEagle]: ["Por Águia Dourada!", "Voe alto!", "Guardem a cidade!"],
  [FactionId.BlackSerpent]: ["Deslizem!", "As sombras vencem!", "Mordida certeira!"],
  [FactionId.IronWolf]: ["Uivem!", "Aço e coragem!", "Protejam o clã!"],
  [FactionId.ScarletRaven]: ["Escarlate eterno!", "Corvos no céu!", "Ninguém passa!"]
};

export function getFactionChants(faction: FactionId) {
  return FACTION_CHANTS[faction] ?? [];
}

export function getRandomFaction(): FactionId {
  const index = Math.floor(Math.random() * FACTION_IDS.length);
  return FACTION_IDS[index];
}

export function pickFactionTeams(): FactionWarTeams {
  const shuffled = [...FACTION_IDS].sort(() => Math.random() - 0.5);
  return {
    teamA: shuffled.slice(0, 2),
    teamB: shuffled.slice(2, 4)
  };
}

export function isOpposingFaction(
  targetFaction: FactionId | undefined,
  sourceFaction: FactionId | undefined,
  warState?: FactionWarTeams | null
) {
  if (targetFaction === undefined || sourceFaction === undefined || !warState) return false;
  const { teamA, teamB } = warState;
  const sourceTeam = teamA.includes(sourceFaction) ? "A" : teamB.includes(sourceFaction) ? "B" : null;
  const targetTeam = teamA.includes(targetFaction) ? "A" : teamB.includes(targetFaction) ? "B" : null;
  if (!sourceTeam || !targetTeam) return false;
  return sourceTeam !== targetTeam;
}
