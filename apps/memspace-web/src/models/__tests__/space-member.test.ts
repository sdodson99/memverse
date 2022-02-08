import { SpaceMember } from '../space-member';

describe('SpaceMember', () => {
  let member: SpaceMember;

  beforeEach(() => {
    member = new SpaceMember('1', 'username', 'photoUrl', 'message');
  });

  describe('get calculatedSpeedPixelsPerSecond', () => {
    beforeEach(() => {
      member.speedPixelsPerSecond = 5;
    });

    it('should return desired speed when not paused', () => {
      expect(member.calculatedSpeedPixelsPerSecond).toBe(5);
    });

    it('should return 0 speed when paused', () => {
      member.paused = true;

      expect(member.calculatedSpeedPixelsPerSecond).toBe(0);
    });
  });

  describe('set direction radians', () => {
    it('should normalize radians when negative angle provided', () => {
      member.directionRadians = -(7 * Math.PI) / 3; // -420 degree angle

      expect(member.directionRadians).toBeCloseTo((5 * Math.PI) / 3); // 300 degree angle
    });

    it('should normalize radians when excessive angle provided', () => {
      member.directionRadians = (13 * Math.PI) / 6; // 750 degree angle

      expect(member.directionRadians).toBeCloseTo(Math.PI / 6); // 30 degree angle
    });
  });
});
