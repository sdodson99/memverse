import { Member } from '../member';
import { createSpaceMember } from '../space-member-factory';
import { generateRandom } from '../../utilities/generate-random';

jest.mock('../../utilities/generate-random');
const mockGenerateRandom = generateRandom as jest.Mock;

describe('createSpaceMember', () => {
  let member: Member;

  beforeEach(() => {
    member = {
      id: 'id',
      username: 'username',
      photoUrl: 'photoUrl',
      message: 'message',
    };
  });

  afterEach(() => {
    mockGenerateRandom.mockReset();
  });

  it('should return space member with default speed', () => {
    const spaceMember = createSpaceMember(member);

    expect(spaceMember.speedPixelsPerSecond).toBe(50);
  });

  it('should return space member with random direction', () => {
    mockGenerateRandom.mockReturnValue(2);

    const spaceMember = createSpaceMember(member);

    expect(spaceMember.directionRadians).toBe(2);
  });
});
