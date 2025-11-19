export type WanderArea = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type NpcDefinition = {
  id: string;
  map: string;
  name: string;
  role?: string;
  initialTile: { x: number; y: number };
  sprite?: string;
  frames?: number;
  frameWidth?: number;
  frameHeight?: number;
  frameSpacing?: number;
  framePaths?: string[];
  anchor?: { x: number; y: number };
  size?: { width?: number; height?: number };
  tint?: number;
  hue?: number;
  speechTextColor?: number;
  speechBalloonColor?: number;
  nameColor?: number;
  speed?: number;
  quotes?: string[];
  wanderArea?: WanderArea;
  talkInterval?: { min: number; max: number };
  tileOffset?: { x?: number; y?: number };
};
