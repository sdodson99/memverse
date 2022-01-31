import { generateRandom } from '../utilities/generate-random';
import { Member } from './member';
import { MemberRaster } from './member-raster';
import paper from 'paper';

const DEFAULT_SPEED_PIXELS_PER_SECOND = 50;
const DEFAULT_SIZE_PIXELS = 50;

export const createMemberRaster = (member: Member, position: paper.Point) => {
  const memberRaster = new MemberRaster(new paper.Raster(), position);

  memberRaster.source = member.photoUrl;
  memberRaster.directionRadians = generateRandom(0, 2 * Math.PI);
  memberRaster.speedPixelsPerSecond = DEFAULT_SPEED_PIXELS_PER_SECOND;
  memberRaster.height = DEFAULT_SIZE_PIXELS;
  memberRaster.width = DEFAULT_SIZE_PIXELS;

  memberRaster.onLoad = () => {
    memberRaster.width = DEFAULT_SIZE_PIXELS;
    memberRaster.height = DEFAULT_SIZE_PIXELS;
  };

  memberRaster.onMouseEnter = () => {
    memberRaster.speedPixelsPerSecond = 0;
  };

  memberRaster.onMouseLeave = () => {
    memberRaster.speedPixelsPerSecond = DEFAULT_SPEED_PIXELS_PER_SECOND;
  };

  return memberRaster;
};
