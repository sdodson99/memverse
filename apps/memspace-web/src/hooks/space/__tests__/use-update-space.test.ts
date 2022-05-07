import paper from 'paper';
import { renderHook } from '@testing-library/react-hooks';
import { useUpdateSpace } from '../use-update-space';
import { useSpaceMembersContext } from '../use-space-members-context';

jest.mock('../use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('useUpdateSpace', () => {
  let mockUpdate: jest.Mock;

  let paperScope: paper.PaperScope;
  let bounds: paper.Rectangle;

  beforeEach(() => {
    mockUpdate = jest.fn();
    mockUseSpaceMembersContext.mockReturnValue({
      updateSpaceMembers: mockUpdate,
    });

    bounds = {} as paper.Rectangle;
    paperScope = {
      view: {
        bounds,
      },
    } as paper.PaperScope;
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
  });

  it('should attach member raster update handler when paper view provided', () => {
    renderHook(() => useUpdateSpace(paperScope));

    paperScope.view.onFrame?.({ delta: 5 });

    expect(mockUpdate).toBeCalledWith(5, bounds);
  });

  it('should not attach member raster update handler when paper view not provided', () => {
    renderHook(() => useUpdateSpace(null));

    paperScope.view.onFrame?.({ delta: 5 });

    expect(mockUpdate).not.toBeCalled();
  });
});
