export class SpaceMember {
  private _directionRadians: number;

  speedPixelsPerSecond: number;
  paused: boolean;
  selected: boolean;

  constructor(
    public id: string,
    public username: string,
    public photoUrl: string,
    public message: string
  ) {
    this._directionRadians = 0;

    this.speedPixelsPerSecond = 0;
    this.paused = false;
    this.selected = false;
  }

  get calculatedSpeedPixelsPerSecond() {
    if (this.paused) {
      return 0;
    }

    return this.speedPixelsPerSecond;
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
}
