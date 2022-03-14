import { Raster } from '@psychobolt/react-paperjs';
import { renderHook } from '@testing-library/react-hooks';
import { RasterSize, useSpaceMemberScaling } from '../use-space-member-scaling';

describe('useSpaceMemberScaling', () => {
  let mockRaster: Raster;
  let mockScale: jest.Mock;

  let rasterRef: React.MutableRefObject<Raster | null>;
  let desiredSize: RasterSize;

  beforeEach(() => {
    mockScale = jest.fn();
    mockRaster = {
      scale: mockScale,
      bounds: {
        width: 100,
        height: 100,
      },
    } as unknown as Raster;
    rasterRef = {
      current: mockRaster,
    };

    desiredSize = {
      height: 50,
      width: 50,
    };
  });

  it('should not scale if no width', () => {
    desiredSize.width = 0;

    renderHook(() => useSpaceMemberScaling(rasterRef, desiredSize));

    expect(mockScale).not.toBeCalled();
  });

  it('should not scale if no height', () => {
    desiredSize.height = 0;

    renderHook(() => useSpaceMemberScaling(rasterRef, desiredSize));

    expect(mockScale).not.toBeCalled();
  });

  it('should not scale if skip scaling desired', () => {
    renderHook(() =>
      useSpaceMemberScaling(rasterRef, desiredSize, {
        skipScaling: true,
      })
    );

    expect(mockScale).not.toBeCalled();
  });

  it('should not scale if raster not initialized', () => {
    renderHook(() => useSpaceMemberScaling({ current: null }, desiredSize));

    expect(mockScale).not.toBeCalled();
  });

  it('should not scale if no raster width', () => {
    mockRaster.bounds.width = 0;

    renderHook(() => useSpaceMemberScaling(rasterRef, desiredSize));

    expect(mockScale).not.toBeCalled();
  });

  it('should not scale if no raster height', () => {
    mockRaster.bounds.height = 0;

    renderHook(() => useSpaceMemberScaling(rasterRef, desiredSize));

    expect(mockScale).not.toBeCalled();
  });

  it('should scale to new width and height when width and height available', () => {
    renderHook(() => useSpaceMemberScaling(rasterRef, desiredSize));

    expect(mockScale).toBeCalledWith(0.5, 0.5);
  });
});
