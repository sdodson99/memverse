import paper from 'paper';
import { SpaceMember } from './space-member';

export class SpaceMemberRaster {
  private _rootLayer: paper.Layer;
  private _avatarRaster: paper.Raster;
  private _usernamePointText: paper.PointText;
  private _messagePointText: paper.PointText;

  constructor(private _id: string) {
    this._rootLayer = new paper.Layer();
    this._avatarRaster = new paper.Raster();
    this._usernamePointText = new paper.PointText(new paper.Point(0, 0));
    this._messagePointText = new paper.PointText(new paper.Point(0, 0));

    this._rootLayer.addChild(this._avatarRaster);
    this._rootLayer.addChild(this._usernamePointText);
    this._rootLayer.addChild(this._messagePointText);

    this._usernamePointText.fontSize = 14;
    this._usernamePointText.strokeColor = new paper.Color('white');
    this._usernamePointText.fillColor = new paper.Color('white');
    this._usernamePointText.justification = 'center';

    this._messagePointText.fontSize = 14;
    this._messagePointText.strokeColor = new paper.Color('white');
    this._messagePointText.fillColor = new paper.Color('white');
    this._messagePointText.justification = 'center';
  }

  get id() {
    return this._id;
  }

  set loaded(value: boolean) {
    this._rootLayer.opacity = value ? 1 : 0;
  }

  set onLoad(value: Function) {
    this._avatarRaster.onLoad = value;
  }

  set onClick(value: Function) {
    this._rootLayer.onClick = value;
  }

  set onMouseEnter(value: Function) {
    this._rootLayer.onMouseEnter = value;
  }

  set onMouseLeave(value: Function) {
    this._rootLayer.onMouseLeave = value;
  }

  set photoUrl(value: string) {
    const avatarElement = document.createElement('img');
    avatarElement.src = value;
    avatarElement.referrerPolicy = 'no-referrer';

    this._avatarRaster.image = avatarElement;
  }

  update(member: SpaceMember) {
    const { width, height, loaded, x, y } = member;

    this.loaded = loaded;

    this.setPosition(x, y);
    this.setSize(width, height);
    this.updateDetails(member);
  }

  setPosition(x: number, y: number) {
    this._avatarRaster.position = new paper.Point(x, y);
  }

  setSize(width: number, height: number) {
    if (!width || !height) {
      return;
    }

    if (!this._avatarRaster.bounds.width || !this._avatarRaster.bounds.height) {
      this._avatarRaster.size.width = width;
      this._avatarRaster.size.height = height;
      return;
    }

    const horizontalScale = width / this._avatarRaster.bounds.width;
    const verticalScale = height / this._avatarRaster.bounds.height;

    this._avatarRaster.scale(horizontalScale, verticalScale);
  }

  private updateDetails(member: SpaceMember) {
    const rasterTop = member.height / 2;
    const spacing = 15;
    const getLineOffset = (linesAboveRaster: number) =>
      rasterTop + linesAboveRaster * spacing;

    const renderMessage = member.message && member.showMessage;
    const messageOffset = getLineOffset(1);
    this._messagePointText.position = new paper.Point(
      member.x,
      member.y - messageOffset
    );
    this._messagePointText.content = member.message;
    this._messagePointText.opacity = renderMessage ? 1 : 0;

    const usernameOffset = renderMessage ? getLineOffset(2) : getLineOffset(1);
    this._usernamePointText.position = new paper.Point(
      member.x,
      member.y - usernameOffset
    );
    this._usernamePointText.content = member.username;
    this._usernamePointText.opacity = member.showUsername ? 1 : 0;
  }

  bringToFront() {
    this._rootLayer.bringToFront();
  }

  remove() {
    this._rootLayer.remove();
  }
}
