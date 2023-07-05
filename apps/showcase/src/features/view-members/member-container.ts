import { Container, IPointData, Rectangle, Sprite, Text } from 'pixi.js';
import { generateRandom } from '@/shared/math';
import { Member } from './member';

const MEMBER_SPRITE_LENGTH = 50;
export const MEMBER_SPRITE_LENGTH_HALF = MEMBER_SPRITE_LENGTH / 2;
const MEMBER_TEXT_OFFET = -35;
const MEMBER_TEXT_SPACING = 15;
const MEMBER_SPEED_PIXELS_PER_MILLISECOND = 0.75;
const CENTER_ANCHOR = { x: 0.5, y: 0.5 };

const BASE_SCALE_SCREEN_LENGTH = 500;
const MIN_SCALE = 0.8;
const MAX_SCALE = 1.2;

export class MemberContainer {
  private static topZIndex: number = 2;

  private avatarSprite: Sprite;
  private usernameText: Text;
  private messageText?: Text;
  private _container: Container;
  private directionRadians: number;
  private textCount: number;

  constructor(member: Member, private bounds: Rectangle) {
    this._container = new Container();

    this.avatarSprite = Sprite.from(member.photoUrl);
    this.avatarSprite.height = MEMBER_SPRITE_LENGTH;
    this.avatarSprite.width = MEMBER_SPRITE_LENGTH;
    this.avatarSprite.anchor.x = CENTER_ANCHOR.x;
    this.avatarSprite.anchor.y = CENTER_ANCHOR.y;
    this._container.addChild(this.avatarSprite);

    this.textCount = 0;

    if (member.message) {
      this.messageText = this.createText(member.message);
      this.messageText.alpha = 1;
      this._container.addChild(this.messageText);
      this.textCount++;
    }

    this.usernameText = this.createText(member.username);
    this.usernameText.alpha = 1;
    this._container.addChild(this.usernameText);
    this.textCount++;

    const { top, bottom, left, right } = this.bounds;

    this.x = generateRandom(left + this.width / 2, right - this.width / 2);
    this.y = generateRandom(top + this.height / 2, bottom - this.height / 2);
    this.directionRadians = generateRandom(0, 2 * Math.PI);

    this._container.interactive = true;
    this._container.on('pointerdown', () => {
      this.raiseToTop();
    });
  }

  private createText(value: string) {
    const text = new Text(value);

    text.style.fill = 'white';
    text.y = MEMBER_TEXT_OFFET - MEMBER_TEXT_SPACING * this.textCount;
    text.anchor.x = CENTER_ANCHOR.x;
    text.anchor.y = CENTER_ANCHOR.y;
    text.scale.set(0.5, 0.5);

    return text;
  }

  get container() {
    return this._container;
  }

  private get x() {
    return this._container.x;
  }

  private set x(value) {
    this._container.x = value;
  }

  private get y() {
    return this._container.y;
  }

  private set y(value) {
    this._container.y = value;
  }

  private set scale(value: IPointData) {
    this.container.scale = value;
  }

  private get width() {
    return this.avatarSprite.width * this.container.scale.x;
  }

  private get height() {
    return this.avatarSprite.height * this.container.scale.y;
  }

  update(delta: number) {
    const pixelsTravelled = MEMBER_SPEED_PIXELS_PER_MILLISECOND * delta;

    const xPixelsTravelled = Math.cos(this.directionRadians) * pixelsTravelled;
    const yPixelsTravelled = Math.sin(this.directionRadians) * pixelsTravelled;

    let nextX = this.x + xPixelsTravelled;
    let nextY = this.y + yPixelsTravelled;
    let nextDirectionRadians = this.directionRadians;

    const { top, bottom, left, right } = this.bounds;
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    if (nextX > right - halfWidth) {
      nextDirectionRadians = Math.PI - nextDirectionRadians;
      nextX = right - halfWidth;
    }

    if (nextX < left + halfWidth) {
      nextDirectionRadians = Math.PI - nextDirectionRadians;
      nextX = left + halfWidth;
    }

    if (nextY > bottom - halfHeight) {
      nextDirectionRadians = 2 * Math.PI - nextDirectionRadians;
      nextY = bottom - halfHeight;
    }

    if (nextY < top + halfHeight) {
      nextDirectionRadians = 2 * Math.PI - nextDirectionRadians;
      nextY = top + halfHeight;
    }

    this.x = nextX;
    this.y = nextY;
    this.directionRadians = nextDirectionRadians;

    this.updateScale();
  }

  private updateScale() {
    const smallestScreenLength = Math.min(
      this.bounds.height,
      this.bounds.width
    );

    let scale = smallestScreenLength / BASE_SCALE_SCREEN_LENGTH;

    if (scale < MIN_SCALE) {
      scale = MIN_SCALE;
    }

    if (scale > MAX_SCALE) {
      scale = MAX_SCALE;
    }

    this.scale = {
      x: scale,
      y: scale,
    };
  }

  private raiseToTop() {
    this.container.zIndex = MemberContainer.topZIndex++;
  }
}
