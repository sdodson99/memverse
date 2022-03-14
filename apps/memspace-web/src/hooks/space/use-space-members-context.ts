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

type SpaceMemberAction = (member: SpaceMember) => void;

const useSpaceMembers = ({ members }: UseSpaceMembersProps) => {
  const [spaceMembers, setSpaceMembers] = useState<SpaceMember[]>([]);

  useEffect(() => {
    const nextSpaceMembers = members.map((m) => createSpaceMember(m));

    setSpaceMembers(nextSpaceMembers);
  }, [members]);

  const withSpaceMember = (memberId: string, callback: SpaceMemberAction) => {
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

  const toggleSpaceMemberPaused = (member: SpaceMember) => {
    withSpaceMember(member.id, (m) => {
      if (m.paused) {
        m.unpause();
      } else {
        m.pause();
      }
    });
  };

  const setShowSpaceMemberDetails = (member: SpaceMember, show: boolean) => {
    withSpaceMember(member.id, (m) => {
      m.showUsername = show;
      m.showMessage = show;
    });
  };

  const updateSpaceMemberMessage = (memberId: string, message: string) => {
    withSpaceMember(memberId, (m) => {
      m.message = message;
    });
  };

  const withAllSpaceMembers = (callback: SpaceMemberAction) => {
    const nextSpaceMembers = spaceMembers.map((m) => {
      const clone = m.clone();

      callback(clone);

      return clone;
    });

    setSpaceMembers(nextSpaceMembers);
  };

  const updateSpaceMembers = (
    timeElapsedSeconds: number,
    bounds: paper.Rectangle
  ) => {
    withAllSpaceMembers((member) => {
      if (!member.positionInitialized) {
        const { left, right, top, bottom } = bounds;

        const initialX = generateRandom(left, right);
        const initialY = generateRandom(top, bottom);

        member.initializePosition(initialX, initialY);
      }

      member.update(timeElapsedSeconds, bounds);
    });
  };

  const setSpaceMembersSize = (diameter: number) => {
    withAllSpaceMembers((member) => {
      member.height = diameter;
      member.width = diameter;
    });
  };

  return {
    spaceMembers,
    loadSpaceMember,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
    setSpaceMembersSize,
    updateSpaceMembers,
    updateSpaceMemberMessage,
  };
};

const [SpaceMembersProvider, useSpaceMembersContext] =
  constate(useSpaceMembers);

export { SpaceMembersProvider, useSpaceMembersContext };
