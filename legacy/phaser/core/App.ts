import { Application, type ApplicationOptions, Container, type Ticker } from "pixi.js";

export interface GameScene {
  container: Container;
  init(): Promise<void> | void;
  update(deltaSeconds: number): void;
  destroy(): void;
}

export abstract class BaseScene implements GameScene {
  public readonly container = new Container();
  protected constructor(protected readonly game: GameApp) {}

  abstract init(): Promise<void> | void;
  abstract update(deltaSeconds: number): void;

  destroy(): void {
    this.container.destroy({ children: true });
  }
}

export type SceneFactory = (game: GameApp) => GameScene;

export class GameApp {
  private app: Application | null = null;
  private currentScene: GameScene | null = null;
  private container: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private readonly tick = (ticker: Ticker): void => {
    if (!this.currentScene) return;
    // ticker.deltaMS is time elapsed in ms. Convert to seconds.
    this.currentScene.update(ticker.deltaMS / 1000);
  };

  constructor(private readonly options: Partial<ApplicationOptions> = {}) {}

  async start(target: HTMLElement, initialSceneFactory: SceneFactory): Promise<void> {
    this.container = target;
    const app = new Application();
    this.app = app;
    await app.init({
      backgroundAlpha: 0,
      antialias: true,
      resolution: (typeof window !== "undefined" && window.devicePixelRatio) || 1,
      resizeTo: target,
      ...this.options
    });
    target.appendChild(app.canvas);
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.container) return;
      const width = this.container.clientWidth || 800;
      const height = this.container.clientHeight || 600;
      app.renderer.resize(width, height);
    });
    this.resizeObserver.observe(target);
    await this.changeScene(initialSceneFactory(this));
    app.ticker.add(this.tick);
  }

  async changeScene(nextScene: GameScene): Promise<void> {
    const app = this.app;
    if (!app) return;
    if (this.currentScene) {
      app.stage.removeChild(this.currentScene.container);
      this.currentScene.destroy();
    }
    this.currentScene = nextScene;
    app.stage.addChild(nextScene.container);
    await nextScene.init();
  }

  get width(): number {
    if (this.app) return this.app.renderer.width;
    return this.container?.clientWidth ?? 0;
  }

  get height(): number {
    if (this.app) return this.app.renderer.height;
    return this.container?.clientHeight ?? 0;
  }

  get stage(): Container {
    return this.ensureApp().stage;
  }

  destroy(): void {
    const app = this.app;
    this.app = null;
    app?.ticker?.remove(this.tick);
    this.currentScene?.destroy();
    this.currentScene = null;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (app) {
      const canvas = this.safeGetCanvas(app);
      if (this.container && canvas && canvas.parentElement === this.container) {
        this.container.removeChild(canvas);
      }
      const renderer = (app as Application & { renderer?: { destroy?: () => void } }).renderer;
      if (renderer && typeof renderer.destroy === "function") {
        app.destroy(true);
      } else {
        app.stage.destroy(true);
      }
    }
    this.container = null;
  }

  private ensureApp(): Application {
    if (!this.app) {
      throw new Error("GameApp not initialized");
    }
    return this.app;
  }

  private safeGetCanvas(app: Application): HTMLCanvasElement | null {
    try {
      return (app.canvas ?? null) as HTMLCanvasElement | null;
    } catch {
      return null;
    }
  }
}
