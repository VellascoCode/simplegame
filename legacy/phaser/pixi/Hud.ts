import { BlurFilter, Container, Graphics, Text } from "pixi.js";

const PANEL_WIDTH = 220;
const PANEL_HEIGHT = 110;

export class Hud {
  readonly view: Container;
  private readonly coordsText: Text;
  private readonly mapText: Text;

  constructor(mapName: string) {
    this.view = new Container();
    const panel = new Graphics();
    panel.roundRect(0, 0, PANEL_WIDTH, PANEL_HEIGHT, 18).fill(0xffffff, 0.12).stroke({ width: 1, color: 0xffffff, alpha: 0.2 });
    panel.filters = [new BlurFilter(4)];
    this.view.addChild(panel);

    this.mapText = new Text({ text: mapName, style: { fill: 0xffffff, fontSize: 16, fontWeight: "600" } });
    this.mapText.position.set(16, 12);
    this.view.addChild(this.mapText);

    this.coordsText = new Text({ text: "X: 0\nY: 0", style: { fill: 0xffffff, fontSize: 14 } });
    this.coordsText.position.set(16, 48);
    this.view.addChild(this.coordsText);
  }

  update(tile: { x: number; y: number }): void {
    this.coordsText.text = `X: ${tile.x}\nY: ${tile.y}`;
  }

  resize(viewportWidth: number): void {
    this.view.position.set(Math.max(16, viewportWidth - PANEL_WIDTH - 16), 16);
  }
}
