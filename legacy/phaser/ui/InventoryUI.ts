import { Container, Graphics, Text } from "pixi.js";

const MOCK_ITEMS = ["Potion", "Crystal", "Sword", "Shield", "Key"];

export class InventoryUI extends Container {
  private readonly closeButton: Container;

  constructor() {
    super();
    this.visible = false;
    const background = new Graphics();
    background.roundRect(0, 0, 220, 260, 12).fill(0x263238).stroke({ width: 2, color: 0x90a4ae });
    this.addChild(background);

    const title = new Text({ text: "Inventory", style: { fill: 0xffffff, fontSize: 18 } });
    title.position.set(16, 12);
    this.addChild(title);

    MOCK_ITEMS.forEach((item, index) => {
      const label = new Text({ text: `- ${item}`, style: { fill: 0xcfd8dc, fontSize: 14 } });
      label.position.set(24, 48 + index * 24);
      this.addChild(label);
    });

    this.closeButton = new Container();
    const closeBackground = new Graphics();
    closeBackground.roundRect(0, 0, 80, 28, 6).fill(0x455a64);
    this.closeButton.addChild(closeBackground);
    this.closeButton.position.set(120, 210);
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
