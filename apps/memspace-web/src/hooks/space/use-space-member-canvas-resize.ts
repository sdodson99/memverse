import { PaperContainer } from '@psychobolt/react-paperjs';
import { useEffect } from 'react';
import { useSpaceMembersContext } from './use-space-members-context';

const SPACE_MEMBER_SIZE_TO_CANVAS_SIZE_PROPORTION = 0.1;
const MIN_SPACE_MEMBER_SIZE = 25;
const MAX_SPACE_MEMBER_SIZE = 50;

export const useSpaceMemberCanvasResize = (
  paperContainerRef: React.MutableRefObject<PaperContainer | null>
) => {
  const { spaceMembers: members, setSpaceMembersSize } =
    useSpaceMembersContext();

  useEffect(() => {
    const paperCanvas = paperContainerRef?.current?.canvas?.current;

    if (!paperCanvas) {
      return;
    }

    const { clientWidth, clientHeight } = paperCanvas;

    const smallestViewDiameter = Math.min(clientWidth, clientHeight);
    let spaceMemberDiameter =
      smallestViewDiameter * SPACE_MEMBER_SIZE_TO_CANVAS_SIZE_PROPORTION;

    if (spaceMemberDiameter < MIN_SPACE_MEMBER_SIZE) {
      spaceMemberDiameter = MIN_SPACE_MEMBER_SIZE;
    }

    if (spaceMemberDiameter > MAX_SPACE_MEMBER_SIZE) {
      spaceMemberDiameter = MAX_SPACE_MEMBER_SIZE;
    }

    const diameterChanged = members.some(
      (m) => m.height !== spaceMemberDiameter || m.width !== spaceMemberDiameter
    );

    if (!diameterChanged) {
      return;
    }

    setSpaceMembersSize(spaceMemberDiameter);
  }, [paperContainerRef, members, setSpaceMembersSize]);
};
