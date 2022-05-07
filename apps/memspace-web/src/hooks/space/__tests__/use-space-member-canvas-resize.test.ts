import paper from 'paper';
import { renderHook } from '@testing-library/react-hooks';
import { SpaceMember } from '../../../models/space-member';
import { useSpaceMemberCanvasResize } from '../use-space-member-canvas-resize';
import { useSpaceMembersContext } from '../use-space-members-context';

jest.mock('../use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('useSpaceMemberCanvasResize', () => {
  let mockSetSpaceMembersSize: jest.Mock;
  let spaceMembers: SpaceMember[];

  let paperScope: paper.PaperScope;

  beforeEach(() => {
    paperScope = {
      view: {
        size: {
          width: 1000,
          height: 300,
        },
      },
    } as paper.PaperScope;

    spaceMembers = [new SpaceMember('1', 'username', 'photoUrl', 'message')];
    mockSetSpaceMembersSize = jest.fn();
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembersStateRef: { current: spaceMembers },
      setSpaceMembersSize: mockSetSpaceMembersSize,
    });
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
  });

  it('should update space member size when canvas size changes', () => {
    renderHook(() => useSpaceMemberCanvasResize(paperScope));

    paperScope.view.onResize?.();

    expect(mockSetSpaceMembersSize).toBeCalledWith(30);
  });

  it('should not set space member size if desired size has not changed', () => {
    spaceMembers[0].height = 30;
    spaceMembers[0].width = 30;
    renderHook(() => useSpaceMemberCanvasResize(paperScope));

    paperScope.view.onResize?.();

    expect(mockSetSpaceMembersSize).not.toBeCalled();
  });

  it('should coerce space member size to a minimum value', () => {
    paperScope.view.size.width = 50;
    renderHook(() => useSpaceMemberCanvasResize(paperScope));

    paperScope.view.onResize?.();

    expect(mockSetSpaceMembersSize).toBeCalledWith(25);
  });

  it('should coerce space member size to a maximum value', () => {
    paperScope.view.size.width = 500000;
    paperScope.view.size.height = 500000;
    renderHook(() => useSpaceMemberCanvasResize(paperScope));

    paperScope.view.onResize?.();

    expect(mockSetSpaceMembersSize).toBeCalledWith(50);
  });

  it('should not set space member size if no canvas provided', () => {
    renderHook(() => useSpaceMemberCanvasResize(null));

    paperScope.view.onResize?.();

    expect(mockSetSpaceMembersSize).not.toBeCalled();
  });
});
