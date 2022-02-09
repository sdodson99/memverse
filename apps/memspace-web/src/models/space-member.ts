import paper from 'paper';

const DEFAULT_SIZE_PIXELS = 50;

export class SpaceMember {
  private _id: string;
  private _username: string;
  private _photoUrl: string;
  private _message: string;

  private _directionRadians: number;
  private _speedPixelsPerSecond: number;
  private _paused: boolean;
  private _selected: boolean;
  private _height: number;
  private _width: number;
  private _x: number;
  private _y: number;

  private _loaded: boolean;
  private _positionInitialized: boolean;

  constructor(id: string, username: string, photoUrl: string, message: string) {
    this._id = id;
    this._username = username;
    this._photoUrl = photoUrl;
    this._message = message;

    this._directionRadians = 0;
    this._speedPixelsPerSecond = 0;
    this._paused = false;
    this._selected = false;
    this._height = 0;
    this._width = 0;
    this._x = 0;
    this._y = 0;
    this._loaded = false;
    this._positionInitialized = false;
  }

  get id() {
    return this._id;
  }

  get height() {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get photoUrl() {
    return this._photoUrl;
  }

  get loaded() {
    return this._loaded;
  }

  get positionInitialized() {
    return this._positionInitialized;
  }

  get speedPixelsPerSecond() {
    if (this._paused) {
      return 0;
    }

    return this._speedPixelsPerSecond;
  }

  set speedPixelsPerSecond(value: number) {
    this._speedPixelsPerSecond = value;
  }

  get directionRadians() {
    return this._directionRadians;
  }

  set directionRadians(value: number) {
    let coercedValue = value;

    while (coercedValue < 0) {
      coercedValue += 2 * Math.PI;
    }

    while (coercedValue > 2 * Math.PI) {
      coercedValue -= 2 * Math.PI;
    }

    this._directionRadians = coercedValue;
  }

  load() {
    this._height = DEFAULT_SIZE_PIXELS;
    this._width = DEFAULT_SIZE_PIXELS;

    this._loaded = true;
  }

  initializePosition(x: number, y: number) {
    if (this._positionInitialized) {
      return;
    }

    this._x = x;
    this._y = y;

    this._positionInitialized = true;
  }

  pause() {
    this._paused = true;
  }

  unpause() {
    this._paused = false;
  }

  update(timeElapsedSeconds: number, bounds: paper.Rectangle) {
    // TODO: Currently, this does not support large amounts of elapsed time.
    // Members get pushed to the edges when a large amount of time has elapsed.
    // Instead, we should calculate all boundary collisions before moving member.
    if (timeElapsedSeconds > 1) return;

    const pixelsTravelled = this.speedPixelsPerSecond * timeElapsedSeconds;

    const xPixelsTravelled = Math.cos(this.directionRadians) * pixelsTravelled;
    const yPixelsTravelled = Math.sin(this.directionRadians) * pixelsTravelled;

    this.move(xPixelsTravelled, yPixelsTravelled, bounds);
  }

  private move(xPixels: number, yPixels: number, bounds: paper.Rectangle) {
    this._x += xPixels;
    this._y += yPixels;

    const { top, left, bottom, right } = bounds;
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    if (this._x > right - halfWidth) {
      this.directionRadians = Math.PI - this.directionRadians;
      this._x = right - halfWidth;
    }

    if (this._x < left + halfWidth) {
      this.directionRadians = Math.PI - this.directionRadians;
      this._x = left + halfWidth;
    }

    if (this._y > bottom - halfHeight) {
      this.directionRadians = 2 * Math.PI - this.directionRadians;
      this._y = bottom - halfHeight;
    }

    if (this._y < top + halfHeight) {
      this.directionRadians = 2 * Math.PI - this.directionRadians;
      this._y = top + halfHeight;
    }
  }

  clone() {
    const clonedSpaceMember = new SpaceMember(
      this._id,
      this._username,
      this._photoUrl,
      this._message
    );

    clonedSpaceMember._directionRadians = this._directionRadians;
    clonedSpaceMember._speedPixelsPerSecond = this._speedPixelsPerSecond;
    clonedSpaceMember._paused = this._paused;
    clonedSpaceMember._selected = this._selected;
    clonedSpaceMember._height = this._height;
    clonedSpaceMember._width = this._width;
    clonedSpaceMember._x = this._x;
    clonedSpaceMember._y = this._y;
    clonedSpaceMember._loaded = this._loaded;
    clonedSpaceMember._positionInitialized = this._positionInitialized;

    return clonedSpaceMember;
  }
}
