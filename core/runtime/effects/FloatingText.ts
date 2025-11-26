import { type Container, Text } from "pixi.js";

export type FloatingTextOptions = {
  text: string;
  x: number;
  y: number;
  color?: number;
  duration?: number;
  rise?: number;
  fontSize?: number;
};

type FloatingEntry = {
  label: Text;
  elapsed: number;
  duration: number;
  startY: number;
  rise: number;
};

export class FloatingTextManager {
  private readonly layer: Container;
  private readonly entries: FloatingEntry[] = [];

  constructor(layer: Container) {
    this.layer = layer;
  }

  spawn(options: FloatingTextOptions): void {
    const color = options.color ?? 0xffffff;
    const fontSize = options.fontSize ?? 14;
    const duration = Math.max(0.2, options.duration ?? 1);
    const rise = options.rise ?? 24;
    const label = new Text({
      text: options.text,
      style: {
        fill: color,
        fontSize,
        fontWeight: "700",
        stroke: { color: 0x000000, width: 3 }
      }
    });
    label.anchor.set(0.5, 1);
    label.position.set(options.x, options.y);
    label.alpha = 1;
    label.roundPixels = true;
    this.layer.addChild(label);
    this.entries.push({
      label,
      elapsed: 0,
      duration,
      startY: options.y,
      rise
    });
  }

  update(deltaSeconds: number): void {
    for (let index = this.entries.length - 1; index >= 0; index -= 1) {
      const entry = this.entries[index];
      entry.elapsed += deltaSeconds;
      const progress = Math.min(1, entry.elapsed / entry.duration);
      entry.label.alpha = 1 - progress;
      entry.label.position.y = entry.startY - entry.rise * progress;
      if (entry.elapsed >= entry.duration) {
        this.layer.removeChild(entry.label);
        entry.label.destroy();
        this.entries.splice(index, 1);
      }
    }
  }

  clear(): void {
    this.entries.forEach((entry) => {
      this.layer.removeChild(entry.label);
      entry.label.destroy();
    });
    this.entries.length = 0;
  }
}
