import paper from 'paper';
import { useEffect } from 'react';
import { useSpaceMembersContext } from './use-space-members-context';

const SPACE_MEMBER_SIZE_TO_CANVAS_SIZE_PROPORTION = 0.1;
const MIN_SPACE_MEMBER_SIZE = 25;
const MAX_SPACE_MEMBER_SIZE = 50;

export const useSpaceMemberCanvasResize = (
  paperScope: paper.PaperScope | null
) => {
  const { spaceMembersStateRef, setSpaceMembersSize } =
    useSpaceMembersContext();

  useEffect(() => {
    if (!paperScope) {
      return;
    }

    const handler = () => {
      const { width, height } = paperScope.view.size;

      const smallestViewDiameter = Math.min(width, height);
      let spaceMemberDiameter =
        smallestViewDiameter * SPACE_MEMBER_SIZE_TO_CANVAS_SIZE_PROPORTION;

      if (spaceMemberDiameter < MIN_SPACE_MEMBER_SIZE) {
        spaceMemberDiameter = MIN_SPACE_MEMBER_SIZE;
      }

      if (spaceMemberDiameter > MAX_SPACE_MEMBER_SIZE) {
        spaceMemberDiameter = MAX_SPACE_MEMBER_SIZE;
      }

      const members = spaceMembersStateRef.current;

      const diameterChanged = members.some(
        (m) =>
          m.height !== spaceMemberDiameter || m.width !== spaceMemberDiameter
      );

      if (!diameterChanged) {
        return;
      }

      setSpaceMembersSize(spaceMemberDiameter);
    };

    paperScope.view.onResize = () => {
      handler();
    };
  }, [paperScope, spaceMembersStateRef, setSpaceMembersSize]);
};
