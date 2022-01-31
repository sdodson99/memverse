import { Member } from '../member';
import { createMemberRaster } from '../member-raster-factory';
import paper from 'paper';
import { generateRandom } from '../../utilities/generate-random';
import { when } from 'jest-when';

jest.mock('paper');
const mockPaperRaster = paper.Raster as jest.Mock;

jest.mock('../../utilities/generate-random');
const mockGenerateRandom = generateRandom as jest.Mock;

describe('createMemberRaster', () => {
  let member: Member;
  let position: paper.Point;

  beforeEach(() => {
    member = {
      id: '1',
      username: 'username',
      photoUrl: 'photoUrl',
      message: 'message',
    };
    position = new paper.Point(0, 0);

    mockPaperRaster.mockReturnValue({ size: {} });
  });

  afterEach(() => {
    mockPaperRaster.mockReset();
    mockGenerateRandom.mockReset();
  });

  it('should return member with properties initialized', () => {
    const mockDirectionRadians = 1;
    when(mockGenerateRandom)
      .calledWith(0, 2 * Math.PI)
      .mockReturnValue(mockDirectionRadians);

    const memberRaster = createMemberRaster(member, position);

    expect(memberRaster.source).toBe(member.photoUrl);
    expect(memberRaster.directionRadians).toBe(mockDirectionRadians);
    expect(memberRaster.speedPixelsPerSecond).toBe(50);
    expect(memberRaster.height).toBe(50);
    expect(memberRaster.width).toBe(50);
  });

  it('should return member with onLoad handler', () => {
    const memberRaster = createMemberRaster(member, position);

    memberRaster.onLoad?.();

    expect(memberRaster.height).toBe(50);
    expect(memberRaster.width).toBe(50);
  });

  it('should return member with onMouseEnter handler', () => {
    const memberRaster = createMemberRaster(member, position);

    memberRaster.onMouseEnter?.();

    expect(memberRaster.speedPixelsPerSecond).toBe(0);
  });

  it('should return member with onMouseLeave handler', () => {
    const memberRaster = createMemberRaster(member, position);

    memberRaster.onMouseLeave?.();

    expect(memberRaster.speedPixelsPerSecond).toBe(50);
  });
});
