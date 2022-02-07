import { MemberRaster } from '../member-raster';
import paper from 'paper';

describe('MemberRaster', () => {
  let member: MemberRaster;

  let mockRaster: paper.Raster;

  beforeEach(() => {
    mockRaster = {
      view: {
        bounds: {
          top: 0,
          left: 0,
          bottom: 100,
          right: 100,
        },
      },
      size: {
        height: 4,
        width: 4,
      },
    } as unknown as paper.Raster;

    member = new MemberRaster(mockRaster, new paper.Point(50, 50));
    member.speedPixelsPerSecond = 5;
    member.directionRadians = 0;
  });

  describe('set direction', () => {
    it('should normalize radians when negative angle provided', () => {
      member.directionRadians = -(7 * Math.PI) / 3; // -420 degree angle

      expect(member.directionRadians).toBeCloseTo((5 * Math.PI) / 3); // 300 degree angle
    });

    it('should normalize radians when excessive angle provided', () => {
      member.directionRadians = (13 * Math.PI) / 6; // 750 degree angle

      expect(member.directionRadians).toBeCloseTo(Math.PI / 6); // 30 degree angle
    });
  });

  describe('update', () => {
    it('should move raster', () => {
      member.update(1);

      expect(mockRaster.position.x).toBe(55);
      expect(mockRaster.position.y).toBe(50);
    });

    it('should bounce raster off left wall on collision', () => {
      member.speedPixelsPerSecond = 80;
      member.directionRadians = (5 * Math.PI) / 6; // 150 degree angle

      member.update(1);

      expect(mockRaster.position.x).toBe(2); // Left wall and half width of raster
      expect(member.directionRadians).toBeCloseTo(Math.PI / 6); // 30 degree angle
    });

    it('should bounce raster off right wall on collision', () => {
      member.speedPixelsPerSecond = 80;
      member.directionRadians = Math.PI / 6; // 30 degree angle

      member.update(1);

      expect(mockRaster.position.x).toBe(98); // Right wall and half width of raster
      expect(member.directionRadians).toBeCloseTo((5 * Math.PI) / 6); // 150 degree angle
    });

    it('should bounce raster off top wall on collision', () => {
      member.speedPixelsPerSecond = 80;
      member.directionRadians = Math.PI / 3; // 60 degree angle

      member.update(1);

      expect(mockRaster.position.y).toBe(98); // Top wall and half height of raster
      expect(member.directionRadians).toBeCloseTo((5 * Math.PI) / 3); // 300 degree angle
    });

    it('should bounce raster off bottom wall on collision', () => {
      member.speedPixelsPerSecond = 80;
      member.directionRadians = (4 * Math.PI) / 3; // 240 degree angle

      member.update(1);

      expect(mockRaster.position.y).toBe(2); // Bottom wall and half height of raster
      expect(member.directionRadians).toBeCloseTo((2 * Math.PI) / 3); // 120 degree angle
    });
  });
});
