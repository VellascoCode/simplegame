import { Container, Graphics, Text } from "pixi.js";

type BarConfig = {
  label: string;
  color: number;
  value: number;
  max: number;
};

type VitalsState = {
  hp: BarConfig;
  mana: BarConfig;
  xp: BarConfig;
};

export class Hud {
  readonly view: Container = new Container();
  private readonly title: Text;
  private readonly coords: Text;
  private readonly hpBar: BarDisplay;
  private readonly manaBar: BarDisplay;
  private readonly xpBar: BarDisplay;

  constructor(mapName: string) {
    const panel = new Graphics();
    panel.roundRect(0, 0, 260, 150, 16).fill({ color: 0x05070c, alpha: 0.9 });
    panel.roundRect(0, 0, 260, 150, 16).stroke({ color: 0xffffff, alpha: 0.15, width: 1 });
    this.view.addChild(panel);

    this.title = new Text({ text: mapName, style: { fill: 0xffffff, fontSize: 15, fontWeight: "600" } });
    this.title.position.set(16, 12);
    this.view.addChild(this.title);

    this.coords = new Text({ text: "X: 0  Y: 0", style: { fill: 0xffffff, fontSize: 13 } });
    this.coords.anchor.set(1, 0);
    this.coords.position.set(244, 12);
    this.view.addChild(this.coords);

    this.hpBar = new BarDisplay();
    this.hpBar.view.position.set(16, 48);
    this.view.addChild(this.hpBar.view);

    this.manaBar = new BarDisplay();
    this.manaBar.view.position.set(16, 82);
    this.view.addChild(this.manaBar.view);

    this.xpBar = new BarDisplay();
    this.xpBar.view.position.set(16, 116);
    this.view.addChild(this.xpBar.view);

    this.updateVitals({
      hp: { label: "Vida", color: 0xe74c3c, value: 100, max: 100 },
      mana: { label: "Mana", color: 0x3fa7d6, value: 100, max: 100 },
      xp: { label: "XP", color: 0xfacb5a, value: 0, max: 100 }
    });
  }

  setMapName(name: string): void {
    this.title.text = name;
  }

  updatePosition(tile: { x: number; y: number }): void {
    this.coords.text = `X: ${tile.x}  Y: ${tile.y}`;
  }

  updateVitals(state: VitalsState): void {
    this.hpBar.setProgress(state.hp);
    this.manaBar.setProgress(state.mana);
    this.xpBar.setProgress(state.xp);
  }

  resize(): void {
    this.view.position.set(16, 16);
  }
}

class BarDisplay {
  readonly view: Container = new Container();
  private readonly background: Graphics;
  private readonly fill: Graphics;
  private readonly label: Text;
  private readonly valueText: Text;

  constructor() {
    this.background = new Graphics();
    this.background.roundRect(0, 0, 228, 22, 10).fill({ color: 0xffffff, alpha: 0.08 });
    this.view.addChild(this.background);

    this.fill = new Graphics();
    this.view.addChild(this.fill);

    this.label = new Text({ text: "", style: { fill: 0xffffff, fontSize: 12, fontWeight: "600" } });
    this.label.position.set(4, -14);
    this.view.addChild(this.label);

    this.valueText = new Text({ text: "", style: { fill: 0xffffff, fontSize: 11 } });
    this.valueText.anchor.set(1, 0.5);
    this.valueText.position.set(224, 11);
    this.view.addChild(this.valueText);
  }

  setProgress(config: BarConfig): void {
    const safeMax = Math.max(1, config.max);
    const ratio = Math.max(0, Math.min(1, config.value / safeMax));
    this.label.text = config.label;
    this.fill.clear();
    this.fill.roundRect(2, 2, 224 * ratio, 18, 8).fill({ color: config.color, alpha: 0.95 });
    this.valueText.text = `${config.value}/${safeMax}`;
  }
}
