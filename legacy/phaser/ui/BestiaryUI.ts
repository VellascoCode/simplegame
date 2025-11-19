import { Container, Graphics, Text } from "pixi.js";

export class BestiaryUI extends Container {
  private readonly closeButton: Container;

  constructor() {
    super();
    this.visible = false;

    const background = new Graphics();
    background.roundRect(0, 0, 220, 240, 12).fill(0x311b92).stroke({ width: 2, color: 0xb39ddb });
    this.addChild(background);

    const title = new Text({ text: "Bestiary", style: { fill: 0xffffff, fontSize: 18 } });
    title.position.set(16, 12);
    this.addChild(title);

    const placeholder = new Text({
      text: "No entries yet",
      style: { fill: 0xd1c4e9, fontSize: 14 }
    });
    placeholder.position.set(16, 64);
    this.addChild(placeholder);

    this.closeButton = new Container();
    const closeBackground = new Graphics();
    closeBackground.roundRect(0, 0, 80, 28, 6).fill(0x4527a0);
    this.closeButton.addChild(closeBackground);
    this.closeButton.position.set(120, 190);
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
