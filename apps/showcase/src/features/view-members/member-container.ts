import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { generateRandom } from '@/shared/math';
import { YouTubeMember } from 'youtube-member-querier';

const MEMBER_SPRITE_LENGTH = 50;
export const MEMBER_SPRITE_LENGTH_HALF = MEMBER_SPRITE_LENGTH / 2;
const MEMBER_USERNAME_Y_OFFSET = -35;
const MEMBER_SPEED_PIXELS_PER_MILLISECOND = 0.75;
const CENTER_ANCHOR = { x: 0.5, y: 0.5 };

export class MemberContainer {
  private avatarSprite: Sprite;
  private usernameText: Text;
  private _container: Container;
  private directionRadians: number;

  constructor(member: YouTubeMember, private bounds: Rectangle) {
    this.avatarSprite = Sprite.from(member.photoUrl);
    this.avatarSprite.height = MEMBER_SPRITE_LENGTH;
    this.avatarSprite.width = MEMBER_SPRITE_LENGTH;
    this.avatarSprite.anchor.x = CENTER_ANCHOR.x;
    this.avatarSprite.anchor.y = CENTER_ANCHOR.y;

    this.usernameText = new Text(member.username);
    this.usernameText.style.fill = 'white';
    this.usernameText.y = MEMBER_USERNAME_Y_OFFSET;
    this.usernameText.anchor.x = CENTER_ANCHOR.x;
    this.usernameText.anchor.y = CENTER_ANCHOR.y;
    this.usernameText.scale.set(0.5, 0.5);

    this._container = new Container();
    this._container.addChild(this.avatarSprite);
    this._container.addChild(this.usernameText);

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
}
