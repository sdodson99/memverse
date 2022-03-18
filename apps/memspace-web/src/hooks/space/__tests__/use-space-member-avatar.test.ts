import React from 'react';
import { Raster } from '@psychobolt/react-paperjs';
import { renderHook } from '@testing-library/react-hooks';
import { useSpaceMemberAvatar } from '../use-space-member-avatar';

describe('useSpaceMemberAvatar', () => {
  let mockRaster: Raster;

  let rasterRef: React.MutableRefObject<Raster | null>;

  beforeEach(() => {
    mockRaster = {} as unknown as Raster;
    rasterRef = {
      current: mockRaster,
    };
  });

  it('should initialize raster image with no referrer policy', () => {
    const avatarUrl = 'https://localhost:8080/avatarUrl';

    renderHook(() => useSpaceMemberAvatar(rasterRef, avatarUrl));

    expect(mockRaster.image).toBeDefined();
    expect(mockRaster.image.src).toBe(avatarUrl);
    expect(mockRaster.image.referrerPolicy).toBe('no-referrer');
  });
});
