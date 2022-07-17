import { SpaceMember } from '../space-member';
import paper from 'paper';

describe('SpaceMember', () => {
  let member: SpaceMember;

  beforeEach(() => {
    member = new SpaceMember('1', 'username', 'photoUrl', 'message');
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

  describe('get direction degrees', () => {
    it('should return direction in degrees when set in radians', () => {
      member.directionRadians = Math.PI / 6;

      expect(member.directionDegrees).toBeCloseTo(30);
    });

    it('should return direction in degrees when set in degrees', () => {
      member.directionDegrees = 150;

      expect(member.directionDegrees).toBeCloseTo(150);
    });
  });

  describe('load', () => {
    it('should initialize height and width', () => {
      member.load();

      expect(member.loaded).toBeTruthy();
      expect(member.height).toBe(50);
      expect(member.width).toBe(50);
    });
  });

  describe('initialize position', () => {
    it('should initialize position', () => {
      member.initializePosition(1, 1);

      expect(member.x).toBe(1);
      expect(member.y).toBe(1);
      expect(member.positionInitialized).toBeTruthy();
    });

    it('should only allow position to be initialized once', () => {
      member.initializePosition(1, 1);
      member.initializePosition(2, 2);

      expect(member.x).toBe(1);
      expect(member.y).toBe(1);
      expect(member.positionInitialized).toBeTruthy();
    });
  });

  describe('update', () => {
    let bounds: paper.Rectangle;

    beforeEach(() => {
      bounds = {
        top: 0,
        left: 0,
        bottom: 1000,
        right: 1000,
        width: 1000,
        height: 1000,
      } as paper.Rectangle;

      member.width = 50;
      member.height = 50;
      member.initializePosition(500, 500);
    });

    it('should move member', () => {
      member.speedPixelsPerSecond = 5;

      member.update(1, bounds);

      expect(member.x).toBe(505);
      expect(member.y).toBe(500);
    });

    it('should bounce raster off left wall on collision', () => {
      member.speedPixelsPerSecond = 600;
      member.directionDegrees = 150;

      member.update(1, bounds);

      expect(member.x).toBe(25); // Left wall and half width of raster
      expect(member.directionDegrees).toBeCloseTo(30);
    });

    it('should bounce raster off right wall on collision', () => {
      member.speedPixelsPerSecond = 600;
      member.directionDegrees = 30;

      member.update(1, bounds);

      expect(member.x).toBe(975); // Right wall and half width of raster
      expect(member.directionDegrees).toBeCloseTo(150);
    });

    it('should bounce raster off top wall on collision', () => {
      member.speedPixelsPerSecond = 600;
      member.directionDegrees = 60;

      member.update(1, bounds);

      expect(member.y).toBe(975); // Top wall and half height of raster
      expect(member.directionDegrees).toBeCloseTo(300);
    });

    it('should bounce raster off bottom wall on collision', () => {
      member.speedPixelsPerSecond = 600;
      member.directionDegrees = 240;

      member.update(1, bounds);

      expect(member.y).toBe(25); // Bottom wall and half height of raster
      expect(member.directionDegrees).toBeCloseTo(120);
    });
  });

  describe('moveTo', () => {
    let bounds: paper.Rectangle;

    beforeEach(() => {
      bounds = {
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
      } as paper.Rectangle;

      member.height = 4;
      member.width = 4;
    });

    it('should move member to position', () => {
      member.moveTo(10, 20, bounds);

      expect(member.x).toBe(10);
      expect(member.y).toBe(20);
    });

    it('should fit to bounds', () => {
      member.moveTo(1000, -1000, bounds);

      expect(member.x).toBe(98);
      expect(member.y).toBe(2);
    });
  });

  describe('clone', () => {
    it('should return new space member instance for member', () => {
      const clonedMember = member.clone();

      expect(clonedMember).not.toBe(member);
      expect(clonedMember.id).toBe(member.id);
    });
  });

  describe('paused', () => {
    it('should return true when paused', () => {
      member.pause();

      expect(member.paused).toBeTruthy();
    });

    it('should return false when not paused', () => {
      member.unpause();

      expect(member.paused).toBeFalsy();
    });
  });

  describe('fit size', () => {
    let bounds: paper.Rectangle;

    beforeEach(() => {
      bounds = { width: 1000, height: 300 } as paper.Rectangle;
    });

    it('should update space member size to relatively fit bounds', () => {
      member.fitSize(bounds);

      expect(member.width).toBe(30);
      expect(member.height).toBe(30);
    });

    it('should keep space member size the same when desired size has not changed', () => {
      member.width = 30;
      member.height = 30;

      member.fitSize(bounds);

      expect(member.width).toBe(30);
      expect(member.height).toBe(30);
    });

    it('should coerce space member size to a minimum value', () => {
      bounds.width = 50;

      member.fitSize(bounds);

      expect(member.width).toBe(25);
      expect(member.height).toBe(25);
    });

    it('should coerce space member size to a maximum value', () => {
      bounds.width = 500000;
      bounds.height = 500000;

      member.fitSize(bounds);

      expect(member.width).toBe(50);
      expect(member.height).toBe(50);
    });
  });
});
