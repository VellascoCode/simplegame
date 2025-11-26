import type { Dispatch, SetStateAction } from "react";
import type { SpriteColorValue, SpriteOptionValue } from "@/lib/characterSpriteOptions";

export type CharacterStatsSnapshot = {
  hp: number;
  energy: number;
  xp: number;
  level: number;
};

export type SessionState = {
  ownerId?: string;
  characterId?: string;
  map?: string;
  position?: { x: number; y: number };
  characterName?: string;
  characterSprite?: SpriteOptionValue;
  spriteColor?: SpriteColorValue;
  stats?: CharacterStatsSnapshot;
};

export type ConnectionStatus =
  | "connecting"
  | "online"
  | "offline"
  | "reconnecting"
  | "error"
  | "unreachable";

export async function loadSessionState(setConnectionStatus: Dispatch<SetStateAction<ConnectionStatus>>): Promise<SessionState | null> {
  try {
    const response = await fetch("/api/session/state");
    if (!response.ok) {
      if (response.status === 401) {
        setConnectionStatus("unreachable");
        return null;
      }
      setConnectionStatus("error");
      return null;
    }
    const sessionState = (await response.json()) as SessionState;
    if (!sessionState.ownerId) {
      setConnectionStatus("unreachable");
      return null;
    }
    return sessionState;
  } catch (error: unknown) {
    console.warn("Failed to load session state", error);
    setConnectionStatus("unreachable");
    return null;
  }
}

export function createPositionPersistence(
  mapNameRef: React.MutableRefObject<string>,
  positionTrackerRef: React.MutableRefObject<{ steps: number; pending: boolean }>
) {
  const persistPositionRequest = async (mapName: string, tileX: number, tileY: number) => {
    try {
      await fetch("/api/session/position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ map: mapName, x: tileX, y: tileY })
      });
    } catch (error: unknown) {
      console.warn("Failed to persist position", error);
    }
  };

  const handleStepPersistence = (tileX: number, tileY: number) => {
    const tracker = positionTrackerRef.current;
    tracker.steps += 1;
    if (tracker.steps < 2 || tracker.pending) return;
    tracker.steps = 0;
    tracker.pending = true;
    void persistPositionRequest(mapNameRef.current, tileX, tileY).finally(() => {
      tracker.pending = false;
    });
  };

  return { persistPositionRequest, handleStepPersistence };
}
