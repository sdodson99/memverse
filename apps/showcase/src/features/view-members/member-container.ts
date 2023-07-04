import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { generateRandom } from '@/shared/math';
import { Member } from './member';

const MEMBER_SPRITE_LENGTH = 50;
export const MEMBER_SPRITE_LENGTH_HALF = MEMBER_SPRITE_LENGTH / 2;
const MEMBER_TEXT_OFFET = -35;
const MEMBER_TEXT_SPACING = 15;
const MEMBER_SPEED_PIXELS_PER_MILLISECOND = 0.75;
const CENTER_ANCHOR = { x: 0.5, y: 0.5 };

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

    this.x = generateRandom(
      left + MEMBER_SPRITE_LENGTH_HALF,
      right - MEMBER_SPRITE_LENGTH_HALF
    );
    this.y = generateRandom(
      top + MEMBER_SPRITE_LENGTH_HALF,
      bottom - MEMBER_SPRITE_LENGTH_HALF
    );
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

  update(delta: number) {
    const pixelsTravelled = MEMBER_SPEED_PIXELS_PER_MILLISECOND * delta;

    const xPixelsTravelled = Math.cos(this.directionRadians) * pixelsTravelled;
    const yPixelsTravelled = Math.sin(this.directionRadians) * pixelsTravelled;

    let nextX = this.x + xPixelsTravelled;
    let nextY = this.y + yPixelsTravelled;
    let nextDirectionRadians = this.directionRadians;

    const { top, bottom, left, right } = this.bounds;

    if (nextX > right - MEMBER_SPRITE_LENGTH_HALF) {
      nextDirectionRadians = Math.PI - nextDirectionRadians;
      nextX = right - MEMBER_SPRITE_LENGTH_HALF;
    }

    if (nextX < left + MEMBER_SPRITE_LENGTH_HALF) {
      nextDirectionRadians = Math.PI - nextDirectionRadians;
      nextX = left + MEMBER_SPRITE_LENGTH_HALF;
    }

    if (nextY > bottom - MEMBER_SPRITE_LENGTH_HALF) {
      nextDirectionRadians = 2 * Math.PI - nextDirectionRadians;
      nextY = bottom - MEMBER_SPRITE_LENGTH_HALF;
    }

    if (nextY < top + MEMBER_SPRITE_LENGTH_HALF) {
      nextDirectionRadians = 2 * Math.PI - nextDirectionRadians;
      nextY = top + MEMBER_SPRITE_LENGTH_HALF;
    }

    this.x = nextX;
    this.y = nextY;
    this.directionRadians = nextDirectionRadians;
  }

  private raiseToTop() {
    this.container.zIndex = MemberContainer.topZIndex++;
  }
}
