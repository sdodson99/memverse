import { SpaceMemberRaster } from '../space-member-raster';
import paper from 'paper';
import { SpaceMember } from '../space-member';

jest.mock('paper', () => ({
  ...jest.requireActual('paper'),
  Layer: jest.fn(),
  Raster: jest.fn(),
  PointText: jest.fn(),
  Color: jest.fn(),
  Point: jest.fn(),
}));
const mockPaperLayer = paper.Layer as jest.Mock;
const mockPaperRaster = paper.Raster as jest.Mock;
const mockPaperPointText = paper.PointText as jest.Mock;
const mockPaperPoint = paper.Point as unknown as jest.Mock;

describe('SpaceMemberRaster', () => {
  let spaceMemberRaster: SpaceMemberRaster;

  let rootLayer: paper.Layer;
  let avatarRaster: paper.Raster;
  let usernamePointText: paper.PointText;
  let messagePointText: paper.PointText;

  beforeEach(() => {
    rootLayer = {
      addChild: jest.fn(),
      remove: jest.fn(),
    } as unknown as paper.Layer;
    mockPaperLayer.mockReturnValue(rootLayer);

    avatarRaster = {
      size: {},
      bounds: {},
      scale: jest.fn(),
    } as unknown as paper.Raster;
    mockPaperRaster.mockReturnValue(avatarRaster);

    usernamePointText = {} as unknown as paper.PointText;
    mockPaperPointText.mockReturnValueOnce(usernamePointText);

    messagePointText = {} as unknown as paper.PointText;
    mockPaperPointText.mockReturnValueOnce(messagePointText);

    mockPaperPoint.mockImplementation((x, y) => ({ x, y }));

    spaceMemberRaster = new SpaceMemberRaster('1');
  });

  afterEach(() => {
    mockPaperLayer.mockReset();
    mockPaperRaster.mockReset();
    mockPaperPointText.mockReset();
    mockPaperPoint.mockReset();
  });

  describe('get id', () => {
    it('should return id', () => {
      expect(spaceMemberRaster.id).toBe('1');
    });
  });

  describe('set loaded', () => {
    it('should show root layer when true', () => {
      spaceMemberRaster.loaded = true;

      expect(rootLayer.opacity).toBe(1);
    });
    it('should hide root layer when false', () => {
      spaceMemberRaster.loaded = false;

      expect(rootLayer.opacity).toBe(0);
    });
  });

  describe('set event handlers', () => {
    it('should apply event handlers to avatar raster', () => {
      spaceMemberRaster.onLoad = () => 'onLoad';
      spaceMemberRaster.onClick = () => 'onClick';
      spaceMemberRaster.onMouseEnter = () => 'onMouseEnter';
      spaceMemberRaster.onMouseLeave = () => 'onMouseLeave';

      expect(avatarRaster.onLoad).toBeDefined();
      expect(avatarRaster.onClick).toBeDefined();
      expect(avatarRaster.onMouseEnter).toBeDefined();
      expect(avatarRaster.onMouseLeave).toBeDefined();
    });
  });

  describe('set photo url', () => {
    beforeEach(() => {
      spaceMemberRaster.photoUrl = 'photoUrl';
    });

    it('should set avatar raster image', () => {
      expect(avatarRaster.image.getAttribute('src')).toBe('photoUrl');
    });

    it('should set fetch avatar raster image with no-referrer to avoid YouTube API rate limiting', () => {
      expect((avatarRaster.image as HTMLImageElement).referrerPolicy).toBe(
        'no-referrer'
      );
    });
  });

  describe('set position', () => {
    it('should set avatar position', () => {
      spaceMemberRaster.setPosition(1, 2);

      expect(avatarRaster.position).toEqual({ x: 1, y: 2 });
    });
  });

  describe('set size', () => {
    it('should abort when no width provided', () => {
      spaceMemberRaster.setSize(0, 1);

      expect(avatarRaster.scale).not.toBeCalled();
      expect(avatarRaster.size.width).not.toBeDefined();
      expect(avatarRaster.size.height).not.toBeDefined();
    });

    it('should abort when no height provided', () => {
      spaceMemberRaster.setSize(1, 0);

      expect(avatarRaster.scale).not.toBeCalled();
      expect(avatarRaster.size.width).not.toBeDefined();
      expect(avatarRaster.size.height).not.toBeDefined();
    });

    it('should initialize when width not already set', () => {
      avatarRaster.bounds.width = 0;
      avatarRaster.bounds.height = 100;

      spaceMemberRaster.setSize(1, 2);

      expect(avatarRaster.size.width).toBe(1);
      expect(avatarRaster.size.height).toBe(2);
    });

    it('should initialize when height not already set', () => {
      avatarRaster.bounds.width = 100;
      avatarRaster.bounds.height = 0;

      spaceMemberRaster.setSize(1, 2);

      expect(avatarRaster.size.width).toBe(1);
      expect(avatarRaster.size.height).toBe(2);
    });

    it('should scale when width and height are already set to preserve image precisoin', () => {
      avatarRaster.bounds.width = 100;
      avatarRaster.bounds.height = 100;

      spaceMemberRaster.setSize(50, 50);

      expect(avatarRaster.scale).toBeCalledWith(0.5, 0.5);
    });
  });

  describe('update', () => {
    let member: SpaceMember;

    beforeEach(() => {
      member = new SpaceMember('1', 'username1', 'photoUrl1', 'message1');
    });

    it('should update loaded state', () => {
      member.load();

      spaceMemberRaster.update(member);

      expect(rootLayer.opacity).toBe(1);
    });

    it('should update position', () => {
      member.speedPixelsPerSecond = 10;
      member.update(1, {
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
      } as paper.Rectangle);

      spaceMemberRaster.update(member);

      expect(avatarRaster.position.x).toBe(10);
    });

    it('should update size', () => {
      member.height = 50;
      member.width = 50;

      spaceMemberRaster.update(member);

      expect(avatarRaster.size.width).toBe(50);
      expect(avatarRaster.size.height).toBe(50);
    });

    describe('details', () => {
      it('should update username content', () => {
        spaceMemberRaster.update(member);

        expect(usernamePointText.content).toBe(member.username);
      });

      it('should update message content', () => {
        spaceMemberRaster.update(member);

        expect(messagePointText.content).toBe(member.message);
      });

      it('should render username when member requests to show username', () => {
        member.showUsername = true;

        spaceMemberRaster.update(member);

        expect(usernamePointText.opacity).toBe(1);
      });

      it('should hide username when member requests to hide username', () => {
        member.showUsername = false;

        spaceMemberRaster.update(member);

        expect(usernamePointText.opacity).toBe(0);
      });

      it('should render message when member requests to show message and has message', () => {
        member.showMessage = true;

        spaceMemberRaster.update(member);

        expect(messagePointText.opacity).toBe(1);
      });

      it('should hide message when member requests to hide message', () => {
        member.showMessage = false;

        spaceMemberRaster.update(member);

        expect(messagePointText.opacity).toBe(0);
      });

      it('should render username above avatar when message not shown', () => {
        member.showUsername = true;
        member.showMessage = false;
        member.height = 50;
        member.width = 50;

        spaceMemberRaster.update(member);

        expect(usernamePointText.position.y).toBe(-40);
      });

      it('should render username above message when message shown', () => {
        member.showUsername = true;
        member.showMessage = true;
        member.height = 50;
        member.width = 50;

        spaceMemberRaster.update(member);

        expect(usernamePointText.position.y).toBe(-55);
        expect(messagePointText.position.y).toBe(-40);
      });

      it('should render message above avatar', () => {
        member.showMessage = true;
        member.height = 50;
        member.width = 50;

        spaceMemberRaster.update(member);

        expect(messagePointText.position.y).toBe(-40);
      });
    });
  });

  describe('remove', () => {
    it('should remove root layer from paper scope', () => {
      spaceMemberRaster.remove();

      expect(rootLayer.remove).toBeCalled();
    });
  });
});
