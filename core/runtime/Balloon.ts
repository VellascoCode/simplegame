import { Container, Graphics, Text } from "pixi.js";

type BalloonStyle = {
  textColor?: number;
  fillColor?: number;
  borderColor?: number;
  borderAlpha?: number;
  fillAlpha?: number;
  fontSize?: number;
};

export class Balloon {
  readonly view: Container = new Container();
  private readonly background: Graphics;
  private readonly text: Text;
  private hideTimeout: number | null = null;

  constructor() {
    this.background = new Graphics();
    this.view.addChild(this.background);
    this.text = new Text({
      text: "",
      style: {
        fill: 0xffffff,
        fontFamily: "Rubik, Inter, sans-serif",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.4,
        align: "center",
        lineHeight: 22,
        wordWrap: true,
        wordWrapWidth: 220,
        breakWords: true,
        stroke: {
          color: 0x000000,
          width: 4,
          alpha: 0.8
        },
        dropShadow: {
          color: 0x000000,
          alpha: 0.35,
          blur: 0,
          angle: Math.PI / 2,
          distance: 0
        }
      }
    });
    this.text.resolution = 2;
    this.text.roundPixels = true;
    this.view.addChild(this.text);
    this.view.visible = false;
  }

  show(message: string, style: BalloonStyle = {}): void {
    const textColor = style.textColor ?? 0xffffff;
    const fillColor = style.fillColor ?? 0x05070c;
    const borderColor = style.borderColor ?? 0xffffff;
    const borderAlpha = typeof style.borderAlpha === "number" ? style.borderAlpha : 0.35;
    const fillAlpha = style.fillAlpha ?? 0.68;
    const fontSize = style.fontSize ?? 16;
    this.text.text = message;
    this.text.style.fill = textColor;
    this.text.style.fontSize = fontSize;
    this.text.style.stroke = {
      color: borderColor,
      width: 4,
      alpha: borderAlpha
    };
    this.text.style.wordWrapWidth = 280;
    const paddingX = 40;
    const paddingY = 32;
    const baseWidth = this.text.width + paddingX;
    const baseHeight = this.text.height + paddingY;
    const width = Math.max(160, baseWidth * 1.15);
    const height = Math.max(60, baseHeight * 1.2);
    this.text.style.wordWrapWidth = width - paddingX / 2;
    this.background.clear();
    this.background
      .roundRect(0, 0, width, height, 14)
      .fill({ color: fillColor, alpha: fillAlpha })
      .roundRect(0, 0, width, height, 14)
      .stroke({ color: borderColor, alpha: 0.25, width: 1 });
    this.text.position.set((width - this.text.width) / 2, (height - this.text.height) / 2);
    this.view.visible = true;
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
    }
    this.hideTimeout = window.setTimeout(() => {
      this.view.visible = false;
      this.hideTimeout = null;
    }, 3000);
  }

  destroy(): void {
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.view.destroy({ children: true });
  }
}
