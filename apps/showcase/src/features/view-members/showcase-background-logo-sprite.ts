import { Rectangle, Sprite } from 'pixi.js';

const LOGO_PADDING = 50;

export class ShowcaseBackgroundLogoSprite {
  private _sprite: Sprite;

  constructor(logoUrl: string, private bounds: Rectangle) {
    const logoImgElement = document.createElement('img');
    logoImgElement.src = logoUrl;

    this._sprite = Sprite.from(logoImgElement);

    this._sprite.zIndex = 1;
    this._sprite.alpha = 0.05;
    this._sprite.anchor.x = 0.5;
    this._sprite.anchor.y = 0.5;

    this.update();
  }

  get sprite() {
    return this._sprite;
  }

  update() {
    this.updatePosition();
    this.updateSize();
  }

  private updatePosition() {
    this._sprite.x = this.bounds.width / 2;
    this._sprite.y = this.bounds.height / 2;
  }

  private updateSize() {
    const shortestBoundsLength = Math.min(
      this.bounds.width,
      this.bounds.height
    );

    const length = shortestBoundsLength - LOGO_PADDING;

    this._sprite.width = length;
    this._sprite.height = length;
  }
}
