import { Raster } from '@psychobolt/react-paperjs';
import { useEffect } from 'react';

export type RasterSize = {
  width: number;
  height: number;
};

type Options = {
  skipScaling?: boolean;
};

export const useSpaceMemberScaling = (
  rasterRef: React.RefObject<Raster | null>,
  desiredSize: RasterSize,
  options?: Options
) => {
  const { width, height } = desiredSize;
  const { skipScaling } = options ?? {};

  useEffect(() => {
    if (!width || !height || skipScaling) {
      return;
    }

    const raster = rasterRef.current;

    if (!raster) return;

    // Use bounds to get the raster size after other scaling
    const rasterWidth = raster.bounds.width;
    const rasterHeight = raster.bounds.height;

    if (!rasterWidth || !rasterHeight) return;

    const horizontalScale = width / rasterWidth;
    const verticalScale = height / rasterHeight;

    // Use scaling instead of resizing to preserve image precision
    raster.scale(horizontalScale, verticalScale);
  }, [rasterRef, width, height, skipScaling]);
};
