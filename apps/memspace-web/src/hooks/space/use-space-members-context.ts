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

  const withSpaceMember = (
    memberId: string,
    callback: (member: SpaceMember) => void
  ) => {
    const spaceMemberIndex = spaceMembers.findIndex((m) => m.id === memberId);

    if (spaceMemberIndex === -1) {
      return;
    }

    const clonedSpaceMember = spaceMembers[spaceMemberIndex].clone();

    callback(clonedSpaceMember);

    setSpaceMembers([
      ...spaceMembers.slice(0, spaceMemberIndex),
      clonedSpaceMember,
      ...spaceMembers.slice(spaceMemberIndex + 1),
    ]);
  };

  const loadSpaceMember = (member: SpaceMember) => {
    withSpaceMember(member.id, (m) => m.load());
  };

  const updateSpaceMemberMessage = (memberId: string, message: string) => {
    withSpaceMember(memberId, (m) => {
      m.message = message;
    });
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
    updateSpaceMemberMessage,
  };
};

const [SpaceMembersProvider, useSpaceMembersContext] =
  constate(useSpaceMembers);

export { SpaceMembersProvider, useSpaceMembersContext };
