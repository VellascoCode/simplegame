import { Container, Graphics, Text, Rectangle } from "pixi.js";
import type { Direction } from "@/pixi/runtime/Player";

const KEY_TO_DIR: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right"
};

export class InputController {
  private readonly overlay: Container;
  private readonly onDirection: (dir: Direction) => void;
  private readonly onDirectionHoldChange?: (direction: Direction, held: boolean) => void;
  private joystickVisible = false;
  private readonly joystick: Container;
  private readonly toggleButton: Container;
  private readonly heldDirections = new Set<Direction>();

  constructor(
    overlay: Container,
    onDirection: (dir: Direction) => void,
    onDirectionHoldChange?: (direction: Direction, held: boolean) => void
  ) {
    this.overlay = overlay;
    this.onDirection = onDirection;
    this.onDirectionHoldChange = onDirectionHoldChange;
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    this.joystick = this.createJoystick();
    this.toggleButton = this.createToggleButton();
    this.overlay.addChild(this.toggleButton, this.joystick);
    this.updateLayout(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", this.handleResize);
  }

  dispose(): void {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("resize", this.handleResize);
    this.joystick.destroy({ children: true });
    this.toggleButton.destroy({ children: true });
  }

  updateLayout(width: number, height: number): void {
    this.toggleButton.position.set(16, height - 72 - 16);
    this.joystick.position.set(16, height - 200);
  }

  private handleResize = (): void => {
    this.updateLayout(window.innerWidth, window.innerHeight);
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    const direction = KEY_TO_DIR[event.code];
    if (!direction) return;
    event.preventDefault();
    if (this.heldDirections.has(direction)) return;
    this.heldDirections.add(direction);
    this.onDirection(direction);
    this.onDirectionHoldChange?.(direction, true);
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    const direction = KEY_TO_DIR[event.code];
    if (!direction) return;
    if (!this.heldDirections.has(direction)) return;
    this.heldDirections.delete(direction);
    this.onDirectionHoldChange?.(direction, false);
  };

  private createToggleButton(): Container {
    const container = new Container();
    container.eventMode = "static";
    container.interactiveChildren = false;
    container.hitArea = new Rectangle(0, 0, 56, 56);
    const bg = new Graphics();
    bg.roundRect(0, 0, 56, 56, 16).fill({ color: 0x0f0f0f, alpha: 0.8 });
    container.addChild(bg);
    const icon = new Text({ text: "🎮", style: { fontSize: 28 } });
    icon.anchor.set(0.5);
    icon.position.set(28, 28);
    container.addChild(icon);
    container.eventMode = "static";
    container.cursor = "pointer";
    container.on("pointertap", (event) => {
      event.stopPropagation();
      this.joystickVisible = !this.joystickVisible;
      this.joystick.visible = this.joystickVisible;
    });
    container.on("pointerdown", (event) => {
      event.stopPropagation();
    });
    return container;
  }

  private createJoystick(): Container {
    const container = new Container();
    container.eventMode = "static";
    container.interactiveChildren = true;
    const bg = new Graphics();
    bg.roundRect(0, 0, 180, 180, 24).fill({ color: 0x1a1a1a, alpha: 0.85 });
    container.addChild(bg);
    const arrows = [
      { label: "↑", dir: "up" as Direction, x: 62, y: 12 },
      { label: "↓", dir: "down" as Direction, x: 62, y: 112 },
      { label: "←", dir: "left" as Direction, x: 12, y: 62 },
      { label: "→", dir: "right" as Direction, x: 112, y: 62 }
    ];
    arrows.forEach((arrow) => {
      const button = this.createArrowButton(arrow.label, arrow.dir);
      button.position.set(arrow.x, arrow.y);
      container.addChild(button);
    });
    container.on("pointerdown", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    container.cursor = "pointer";
    container.on("pointertap", (event) => {
      event.stopPropagation();
      const local = event.getLocalPosition(container);
      const center = 90;
      const dx = local.x - center;
      const dy = local.y - center;
      if (Math.abs(dx) > Math.abs(dy)) {
        this.onDirection(dx > 0 ? "right" : "left");
      } else {
        this.onDirection(dy > 0 ? "down" : "up");
      }
    });
    container.visible = false;
    return container;
  }

  private createArrowButton(label: string, direction: Direction): Container {
    const container = new Container();
    container.eventMode = "static";
    const bg = new Graphics();
    bg.roundRect(0, 0, 56, 56, 16).fill({ color: 0x313131 });
    container.addChild(bg);
    const text = new Text({ text: label, style: { fontSize: 22, fill: 0xffffff } });
    text.anchor.set(0.5);
    text.position.set(28, 28);
    container.addChild(text);
    container.on("pointerdown", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      this.onDirection(direction);
    });
    return container;
  }
}
