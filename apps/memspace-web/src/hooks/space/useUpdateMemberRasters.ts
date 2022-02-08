import { useEffect } from 'react';
import paper from 'paper';
import { SpaceMemberRaster } from '../../models/space-member-raster';

type OnFrameEvent = {
  delta: number;
};

export const useUpdateMemberRasters = (
  memberRasters: SpaceMemberRaster[],
  paperScope: paper.PaperScope | null
) => {
  useEffect(() => {
    if (!paperScope) {
      return;
    }

    paperScope.view.onFrame = ({ delta: timeElapsedSeconds }: OnFrameEvent) => {
      memberRasters.forEach((m) => {
        m.update(timeElapsedSeconds);
      });
    };
  }, [paperScope, memberRasters]);
};
