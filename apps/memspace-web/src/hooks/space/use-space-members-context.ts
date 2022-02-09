import constate from 'constate';
import { useEffect, useState } from 'react';
import { Member } from '../../models/member';
import { SpaceMember } from '../../models/space-member';
import paper from 'paper';
import { generateRandom } from '../../utilities/generate-random';
import { createSpaceMember } from '../../models/space-member-factory';

type UseSpaceMembersProps = {
  members: Member[];
};

const useSpaceMembers = ({ members }: UseSpaceMembersProps) => {
  const [spaceMembers, setSpaceMembers] = useState<SpaceMember[]>([]);

  useEffect(() => {
    const nextSpaceMembers = members.map((m) => createSpaceMember(m));

    setSpaceMembers(nextSpaceMembers);
  }, [members]);

  const loadSpaceMember = (member: SpaceMember) => {
    const spaceMemberIndex = spaceMembers.findIndex((m) => m.id === member.id);

    if (spaceMemberIndex === -1) {
      return;
    }

    const clonedSpaceMember = spaceMembers[spaceMemberIndex].clone();

    clonedSpaceMember.load();

    setSpaceMembers([
      ...spaceMembers.slice(0, spaceMemberIndex),
      clonedSpaceMember,
      ...spaceMembers.slice(spaceMemberIndex + 1),
    ]);
  };

  const updateSpaceMembers = (
    timeElapsedSeconds: number,
    bounds: paper.Rectangle
  ) => {
    const nextSpaceMembers = spaceMembers.map((m) => {
      const clone = m.clone();

      if (!clone.positionInitialized) {
        const { left, right, top, bottom } = bounds;

        const initialX = generateRandom(left, right);
        const initialY = generateRandom(top, bottom);

        clone.initializePosition(initialX, initialY);
      }

      clone.update(timeElapsedSeconds, bounds);

      return clone;
    });

    setSpaceMembers(nextSpaceMembers);
  };

  return {
    spaceMembers,
    loadSpaceMember,
    updateSpaceMembers,
  };
};

const [SpaceMembersProvider, useSpaceMembersContext] =
  constate(useSpaceMembers);

export { SpaceMembersProvider, useSpaceMembersContext };
