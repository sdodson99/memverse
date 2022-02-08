import paper from 'paper';
import { SpaceMemberRaster } from '../../../models/space-member-raster';
import { renderHook } from '@testing-library/react-hooks';
import { useUpdateSpaceMemberRasters } from '../use-update-space-member-rasters';

describe('useUpdateMemberRasters', () => {
  let memberRasters: SpaceMemberRaster[];
  let paperScope: paper.PaperScope;

  let mockMemberRasterUpdate: jest.Mock;

  beforeEach(() => {
    mockMemberRasterUpdate = jest.fn();
    memberRasters = [
      {
        update: mockMemberRasterUpdate,
      },
      {
        update: mockMemberRasterUpdate,
      },
      {
        update: mockMemberRasterUpdate,
      },
    ] as unknown as SpaceMemberRaster[];

    paperScope = {
      view: {},
    } as paper.PaperScope;
  });

  it('should attach member raster update handler when paper view provided', () => {
    renderHook(() => useUpdateSpaceMemberRasters(memberRasters, paperScope));

    paperScope.view.onFrame?.({ delta: 5 });

    expect(mockMemberRasterUpdate).toBeCalledTimes(3);
    expect(mockMemberRasterUpdate).toHaveBeenNthCalledWith(1, 5);
    expect(mockMemberRasterUpdate).toHaveBeenNthCalledWith(2, 5);
    expect(mockMemberRasterUpdate).toHaveBeenNthCalledWith(3, 5);
  });

  it('should not attach member raster update handler when paper view not provided', () => {
    renderHook(() => useUpdateSpaceMemberRasters(memberRasters, null));

    paperScope.view.onFrame?.({ delta: 5 });

    expect(mockMemberRasterUpdate).not.toBeCalled();
  });
});
