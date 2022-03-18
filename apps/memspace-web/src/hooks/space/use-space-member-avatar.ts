import { Raster } from '@psychobolt/react-paperjs';
import { useEffect } from 'react';

export const useSpaceMemberAvatar = (
  rasterRef: React.RefObject<Raster | null>,
  avatarUrl: string
) => {
  useEffect(() => {
    const raster = rasterRef.current;

    if (raster) {
      const avatarElement = document.createElement('img');

      avatarElement.src = avatarUrl;

      // Use no-referrer to dodge YouTube API batch request limiting.
      avatarElement.referrerPolicy = 'no-referrer';

      raster.image = avatarElement;
    }
  }, [rasterRef, avatarUrl]);
};
