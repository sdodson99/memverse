import paper from 'paper';

export class MemberRaster {
  private _raster: paper.Raster;
  private _speedPixelsPerSecond: number;
  private _directionRadians: number;

  constructor(raster: paper.Raster, position: paper.Point) {
    this._raster = raster;
    this._raster.position = position;

    this._speedPixelsPerSecond = 0;
    this._directionRadians = 0;
  }

  get source() {
    return this._raster.source;
  }

  set source(value: string | HTMLImageElement | HTMLCanvasElement) {
    this._raster.source = value;
  }

  get speedPixelsPerSecond() {
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

  get width() {
    return this._raster.size.width;
  }

  set width(value: number) {
    this._raster.size.width = value;
  }

  get height() {
    return this._raster.size.height;
  }

  set height(value: number) {
    this._raster.size.height = value;
  }

  get onLoad() {
    return this._raster.onLoad;
  }

  set onLoad(value: Function | null) {
    this._raster.onLoad = value;
  }

  get onMouseEnter() {
    return this._raster.onMouseEnter;
  }

  set onMouseEnter(value: Function | null) {
    this._raster.onMouseEnter = value;
  }

  get onMouseLeave() {
    return this._raster.onMouseLeave;
  }

  set onMouseLeave(value: Function | null) {
    this._raster.onMouseLeave = value;
  }

  private get position() {
    return this._raster.position;
  }

  private set position(value: paper.Point) {
    this._raster.position = value;
  }

  update(timeElapsedSeconds: number) {
    const pixelsTravelled = this.speedPixelsPerSecond * timeElapsedSeconds;

    const xPixelsTravelled = Math.cos(this.directionRadians) * pixelsTravelled;
    const yPixelsTravelled = Math.sin(this.directionRadians) * pixelsTravelled;

    this.move(xPixelsTravelled, yPixelsTravelled);
  }

  private move(xPixels: number, yPixels: number) {
    this.position = this.position.add(new paper.Point(xPixels, yPixels));

    const { top, left, bottom, right } = this._raster.view.bounds;

    if (this.position.x > right) {
      this.directionRadians = Math.PI - this.directionRadians;
      this.position.x = right;
    }

    if (this.position.x < left) {
      this.directionRadians = Math.PI - this.directionRadians;
      this.position.x = left;
    }

    if (this.position.y > bottom) {
      this.directionRadians = 2 * Math.PI - this.directionRadians;
      this.position.y = bottom;
    }

    if (this.position.y < top) {
      this.directionRadians = 2 * Math.PI - this.directionRadians;
      this.position.y = top;
    }
  }

  remove() {
    this._raster.remove();
  }
}
