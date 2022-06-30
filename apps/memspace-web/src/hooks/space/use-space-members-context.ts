import paper from 'paper';
import constate from 'constate';
import { useEffect, useRef } from 'react';
import { Member } from '../../models/member';
import { SpaceMember } from '../../models/space-member';
import { generateRandom } from '../../utilities/generate-random';
import { createSpaceMember } from '../../models/space-member-factory';
import { Subject } from 'rxjs';

type UseSpaceMembersProps = {
  members: Member[];
};

type SpaceMemberAction = (member: SpaceMember) => void;

const useSpaceMembers = ({ members }: UseSpaceMembersProps) => {
  const spaceMembersStateRef = useRef<SpaceMember[]>([]);

  const { current: spaceMembersResetSubject } = useRef(new Subject());
  const { current: spaceMemberChangedSubject } = useRef(new Subject<string>());
  const { current: spaceMemberUpdatedSubject } = useRef(new Subject<string>());

  const { current: onSpaceMembersReset$ } = useRef(
    spaceMembersResetSubject.asObservable()
  );
  const { current: onSpaceMemberChanged$ } = useRef(
    spaceMemberChangedSubject.asObservable()
  );
  const { current: onSpaceMemberUpdated$ } = useRef(
    spaceMemberUpdatedSubject.asObservable()
  );

  useEffect(() => {
    const nextSpaceMembers = members.map((m) => createSpaceMember(m));

    spaceMembersStateRef.current = nextSpaceMembers;
    spaceMembersResetSubject.next(null);
  }, [members, spaceMembersResetSubject]);

  const withSpaceMember = (memberId: string, callback: SpaceMemberAction) => {
    const spaceMember = spaceMembersStateRef.current.find(
      (m) => m.id === memberId
    );

    if (!spaceMember) {
      return;
    }

    callback(spaceMember);
  };

  const loadSpaceMember = (member: SpaceMember) => {
    withSpaceMember(member.id, (m) => {
      m.load();

      spaceMemberChangedSubject.next(member.id);
    });
  };

  const toggleSpaceMemberPaused = (member: SpaceMember) => {
    withSpaceMember(member.id, (m) => {
      if (m.paused) {
        m.unpause();
      } else {
        m.pause();
      }

      spaceMemberChangedSubject.next(member.id);
    });
  };

  const setShowSpaceMemberDetails = (member: SpaceMember, show: boolean) => {
    withSpaceMember(member.id, (m) => {
      m.showUsername = show;
      m.showMessage = show;

      spaceMemberChangedSubject.next(member.id);
    });
  };

  const updateSpaceMemberMessage = (memberId: string, message: string) => {
    withSpaceMember(memberId, (m) => {
      m.message = message;

      spaceMemberChangedSubject.next(m.id);
    });
  };

  const setSpaceMemberSpeed = (memberId: string, speed: number) => {
    withSpaceMember(memberId, (m) => {
      m.speedPixelsPerSecond = speed;

      spaceMemberChangedSubject.next(m.id);
    });
  };

  const setSpaceMemberDirectionDegrees = (
    memberId: string,
    degrees: number
  ) => {
    withSpaceMember(memberId, (m) => {
      m.directionDegrees = degrees;

      spaceMemberChangedSubject.next(m.id);
    });
  };

  const setSpaceMemberPositionX = (memberId: string, x: number) => {
    withSpaceMember(memberId, (m) => {
      m.x = x;

      spaceMemberChangedSubject.next(m.id);
    });
  };

  const setSpaceMemberPositionY = (memberId: string, y: number) => {
    withSpaceMember(memberId, (m) => {
      m.y = y;

      spaceMemberChangedSubject.next(m.id);
    });
  };

  const withAllSpaceMembers = (callback: SpaceMemberAction) => {
    spaceMembersStateRef.current.forEach((m) => callback(m));
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

      spaceMemberUpdatedSubject.next(member.id);
    });
  };

  const setSpaceMembersSize = (diameter: number) => {
    withAllSpaceMembers((member) => {
      member.height = diameter;
      member.width = diameter;

      spaceMemberChangedSubject.next(member.id);
    });
  };

  const shuffleSpaceMembers = (bounds: paper.Rectangle) => {
    withAllSpaceMembers((member) => {
      const { left, right, top, bottom } = bounds;

      const x = generateRandom(left, right);
      const y = generateRandom(top, bottom);
      const directionRadians = generateRandom(0, 2 * Math.PI);

      member.x = x;
      member.y = y;
      member.directionRadians = directionRadians;

      spaceMemberUpdatedSubject.next(member.id);
    });
  };

  return {
    spaceMembersStateRef,
    loadSpaceMember,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
    setSpaceMemberSpeed,
    setSpaceMemberDirectionDegrees,
    setSpaceMemberPositionX,
    setSpaceMemberPositionY,
    setSpaceMembersSize,
    updateSpaceMembers,
    updateSpaceMemberMessage,
    shuffleSpaceMembers,
    onSpaceMembersReset$,
    onSpaceMemberChanged$,
    onSpaceMemberUpdated$,
  };
};

const [SpaceMembersProvider, useSpaceMembersContext] =
  constate(useSpaceMembers);

export { SpaceMembersProvider, useSpaceMembersContext };
