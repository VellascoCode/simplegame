import { Text } from "pixi.js";
import { BaseScene, type GameApp } from "@/src/core/App";
import { Loader } from "@/src/core/Loader";
import { WorldScene } from "@/src/scenes/WorldScene";

export class BootScene extends BaseScene {
  private statusText!: Text;

  constructor(game: GameApp) {
    super(game);
  }

  async init(): Promise<void> {
    this.statusText = new Text({
      text: "Loading assets...",
      style: { fill: 0xffffff, fontSize: 18 }
    });
    this.statusText.anchor.set(0.5);
    this.statusText.position.set(this.game.width / 2, this.game.height / 2);
    this.container.addChild(this.statusText);
    await Loader.loadBaseAssets();
    await this.game.changeScene(new WorldScene(this.game));
  }

  update(): void {
    // Nothing to update during the boot scene.
  }
}
