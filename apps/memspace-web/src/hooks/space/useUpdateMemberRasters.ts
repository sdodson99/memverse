import { useEffect } from 'react';
import paper from 'paper';
import { MemberRaster } from '../../models/member-raster';

type OnFrameEvent = {
  delta: number;
};

export const useUpdateMemberRasters = (
  memberRasters: MemberRaster[],
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
