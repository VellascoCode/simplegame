import { Container, Graphics, Text } from "pixi.js";

export class MapUI extends Container {
  private readonly closeButton: Container;

  constructor() {
    super();
    this.visible = false;

    const background = new Graphics();
    background.roundRect(0, 0, 200, 200, 12).fill(0x1b5e20).stroke({ width: 2, color: 0xa5d6a7 });
    this.addChild(background);

    const title = new Text({ text: "Mini Map", style: { fill: 0xffffff, fontSize: 18 } });
    title.position.set(16, 12);
    this.addChild(title);

    const minimap = new Graphics();
    minimap.roundRect(16, 48, 168, 120, 8).stroke({ width: 2, color: 0xc8e6c9 }).fill(0x2e7d32);
    minimap.moveTo(16, 108).lineTo(184, 108).stroke({ width: 1, color: 0xffffff, alpha: 0.3 });
    minimap.moveTo(100, 48).lineTo(100, 168).stroke({ width: 1, color: 0xffffff, alpha: 0.3 });
    this.addChild(minimap);

    this.closeButton = new Container();
    const closeBackground = new Graphics();
    closeBackground.roundRect(0, 0, 80, 28, 6).fill(0x33691e);
    this.closeButton.addChild(closeBackground);
    this.closeButton.position.set(108, 160);
    this.closeButton.eventMode = "static";
    this.closeButton.cursor = "pointer";
    this.closeButton.on("pointertap", () => this.close());

    const closeText = new Text({ text: "Close", style: { fill: 0xffffff, fontSize: 14 } });
    closeText.anchor.set(0.5);
    closeText.position.set(40, 14);
    this.closeButton.addChild(closeText);

    this.addChild(this.closeButton);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  toggle(): void {
    this.visible = !this.visible;
  }
}
