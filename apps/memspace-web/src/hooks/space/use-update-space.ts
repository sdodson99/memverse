import { useEffect } from 'react';
import paper from 'paper';
import { useSpaceMembersContext } from './use-space-members-context';

type OnFrameEvent = {
  delta: number;
};

export const useUpdateSpace = (paperScope: paper.PaperScope | null) => {
  const { updateSpaceMembers } = useSpaceMembersContext();

  useEffect(() => {
    if (!paperScope) {
      return;
    }

    paperScope.view.onFrame = ({ delta: timeElapsedSeconds }: OnFrameEvent) => {
      updateSpaceMembers(timeElapsedSeconds, paperScope.view.bounds);
    };
  }, [paperScope, updateSpaceMembers]);
};
