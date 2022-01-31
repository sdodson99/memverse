import paper from 'paper';
import { MemberRaster } from '../../../models/member-raster';
import { renderHook } from '@testing-library/react-hooks';
import { useUpdateMemberRasters } from '../useUpdateMemberRasters';

describe('useUpdateMemberRasters', () => {
  let memberRasters: MemberRaster[];
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
    ] as unknown as MemberRaster[];

    paperScope = {
      view: {},
    } as paper.PaperScope;
  });

  it('should attach member raster update handler when paper view provided', () => {
    renderHook(() => useUpdateMemberRasters(memberRasters, paperScope));

    paperScope.view.onFrame?.({ delta: 5 });

    expect(mockMemberRasterUpdate).toBeCalledTimes(3);
    expect(mockMemberRasterUpdate).toHaveBeenNthCalledWith(1, 5);
    expect(mockMemberRasterUpdate).toHaveBeenNthCalledWith(2, 5);
    expect(mockMemberRasterUpdate).toHaveBeenNthCalledWith(3, 5);
  });

  it('should not attach member raster update handler when paper view not provided', () => {
    renderHook(() => useUpdateMemberRasters(memberRasters, null));

    paperScope.view.onFrame?.({ delta: 5 });

    expect(mockMemberRasterUpdate).not.toBeCalled();
  });
});
