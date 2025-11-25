import { FACTION_IDS, type FactionName, type FactionWarState, pickFactionTeams } from "./factions";

type TimerHandle = ReturnType<typeof setTimeout>;

type WarContainer = {
  state: FactionWarState;
  timer?: TimerHandle;
  resetTimer?: TimerHandle;
};

type GlobalWithWarState = typeof globalThis & {
  __FACTION_WAR_STATE__?: WarContainer;
};

const globalWar = globalThis as GlobalWithWarState;
const WAR_MEMBERS_PER_FACTION = 10;
const WAR_REFRESH_MS = 10 * 60 * 1000;
const WAR_FORCE_RESET_MS = 5 * 60 * 1000;

function createWarState(): FactionWarState {
  const { teamA, teamB } = pickFactionTeams();
  const remaining: Record<FactionName, number> = Object.fromEntries(
    FACTION_IDS.map((faction) => [
      faction,
      teamA.includes(faction) || teamB.includes(faction) ? WAR_MEMBERS_PER_FACTION : 0
    ])
  ) as Record<FactionName, number>;
  return {
    teamA,
    teamB,
    startedAt: new Date().toISOString(),
    remaining
  };
}

function ensureWarState(): WarContainer {
  if (!globalWar.__FACTION_WAR_STATE__) {
    globalWar.__FACTION_WAR_STATE__ = {
      state: createWarState()
    };
    scheduleWarTimers();
  }
  return globalWar.__FACTION_WAR_STATE__;
}

function scheduleWarTimers() {
  const war = globalWar.__FACTION_WAR_STATE__;
  if (!war) return;
  if (war.timer) {
    clearInterval(war.timer);
  }
  if (war.resetTimer) {
    clearTimeout(war.resetTimer);
  }
  war.timer = setInterval(() => {
    resetWarState();
  }, WAR_REFRESH_MS);
  war.resetTimer = setTimeout(() => {
    resetWarState();
  }, WAR_FORCE_RESET_MS);
}

function resetWarState() {
  if (!globalWar.__FACTION_WAR_STATE__) {
    globalWar.__FACTION_WAR_STATE__ = { state: createWarState() };
  } else {
    globalWar.__FACTION_WAR_STATE__.state = createWarState();
  }
  scheduleWarTimers();
}

export function getFactionWarState(): FactionWarState {
  return ensureWarState().state;
}

export function registerFactionDeath(faction: FactionName) {
  const war = ensureWarState();
  const { state } = war;
  if (!(state.teamA.includes(faction) || state.teamB.includes(faction))) return;
  state.remaining[faction] = Math.max(0, (state.remaining[faction] ?? 0) - 1);
  const teamZero = (team: readonly FactionName[]) =>
    team.every((entry) => (state.remaining[entry] ?? 0) <= 0);
  if (teamZero(state.teamA) || teamZero(state.teamB)) {
    resetWarState();
  }
}
