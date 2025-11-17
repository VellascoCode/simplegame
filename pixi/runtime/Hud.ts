import { Container, Graphics, Text } from "pixi.js";

export class Hud {
  readonly view: Container = new Container();
  private readonly coordsText: Text;
  private readonly title: Text;

  constructor(mapName: string) {
    const panel = new Graphics();
    panel.roundRect(0, 0, 220, 110, 20).fill({ color: 0xffffff, alpha: 0.12 });
    panel.roundRect(0, 0, 220, 110, 20).stroke({ color: 0xffffff, alpha: 0.2, width: 1 });
    this.view.addChild(panel);

    this.title = new Text({ text: mapName, style: { fill: 0xffffff, fontSize: 16, fontWeight: "600" } });
    this.title.position.set(16, 12);
    this.view.addChild(this.title);

    this.coordsText = new Text({ text: "X: 0\nY: 0", style: { fill: 0xffffff, fontSize: 14 } });
    this.coordsText.position.set(16, 48);
    this.view.addChild(this.coordsText);
  }

  update(tile: { x: number; y: number }): void {
    this.coordsText.text = `X: ${tile.x}\nY: ${tile.y}`;
  }

  resize(viewportWidth: number): void {
    this.view.position.set(Math.max(16, viewportWidth - 236), 16);
  }
}
