import { PaperContainer } from '@psychobolt/react-paperjs';
import { renderHook } from '@testing-library/react-hooks';
import { SpaceMember } from '../../../models/space-member';
import { useSpaceMemberCanvasResize } from '../use-space-member-canvas-resize';
import { useSpaceMembersContext } from '../use-space-members-context';

jest.mock('../use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('useSpaceMemberCanvasResize', () => {
  let mockSetSpaceMembersSize: jest.Mock;
  let mockPaperContainerCanvas: HTMLCanvasElement;
  let mockSpaceMembers: SpaceMember[];

  let paperContainerRef: React.MutableRefObject<PaperContainer | null>;

  beforeEach(() => {
    mockPaperContainerCanvas = {
      clientHeight: 300,
      clientWidth: 1000,
    } as HTMLCanvasElement;
    paperContainerRef = {
      current: {
        canvas: {
          current: mockPaperContainerCanvas,
        },
      },
    } as React.MutableRefObject<PaperContainer | null>;

    mockSpaceMembers = [{} as SpaceMember];
    mockSetSpaceMembersSize = jest.fn();
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers: mockSpaceMembers,
      setSpaceMembersSize: mockSetSpaceMembersSize,
    });
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
  });

  it('should update space member size when canvas size changes', () => {
    renderHook(() => useSpaceMemberCanvasResize(paperContainerRef));

    expect(mockSetSpaceMembersSize).toBeCalledWith(30);
  });

  it('should not set space member size if desired size has not changed', () => {
    mockSpaceMembers[0].height = 30;
    mockSpaceMembers[0].width = 30;

    renderHook(() => useSpaceMemberCanvasResize(paperContainerRef));

    expect(mockSetSpaceMembersSize).not.toBeCalled();
  });

  it('should coerce space member size to a minimum value', () => {
    // @ts-expect-error
    mockPaperContainerCanvas.clientWidth = 50;

    renderHook(() => useSpaceMemberCanvasResize(paperContainerRef));

    expect(mockSetSpaceMembersSize).toBeCalledWith(25);
  });

  it('should coerce space member size to a maximum value', () => {
    // @ts-expect-error
    mockPaperContainerCanvas.clientWidth = 500000;
    // @ts-expect-error
    mockPaperContainerCanvas.clientHeight = 500000;

    renderHook(() => useSpaceMemberCanvasResize(paperContainerRef));

    expect(mockSetSpaceMembersSize).toBeCalledWith(50);
  });

  it('should not set space member size if no canvas provided', () => {
    renderHook(() =>
      useSpaceMemberCanvasResize({
        current: null,
      } as React.MutableRefObject<PaperContainer | null>)
    );

    expect(mockSetSpaceMembersSize).not.toBeCalled();
  });
});
