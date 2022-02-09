import { generateRandom } from '../utilities/generate-random';
import { Member } from './member';
import { SpaceMember } from './space-member';

const DEFAULT_SPEED_PIXELS_PER_SECOND = 50;

export const createSpaceMember = (member: Member) => {
  const spaceMember = new SpaceMember(
    member.id,
    member.username,
    member.photoUrl,
    member.message
  );

  spaceMember.speedPixelsPerSecond = DEFAULT_SPEED_PIXELS_PER_SECOND;
  spaceMember.directionRadians = generateRandom(0, 2 * Math.PI);

  return spaceMember;
};
