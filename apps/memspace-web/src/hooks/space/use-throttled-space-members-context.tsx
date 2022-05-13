import { useSpaceMembersContext } from './use-space-members-context';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { SpaceMember } from '../../models/space-member';
import React, { useEffect } from 'react';
import { merge, throttleTime } from 'rxjs';

const throttledSpaceMembersState = atom<SpaceMember[]>({
  key: 'ThrottledSpaceMembers',
  default: [],
});

type ThrottledSpaceMembersProviderProps = {
  children: React.ReactNode;
};

export const ThrottledSpaceMembersProvider = ({
  children,
}: ThrottledSpaceMembersProviderProps) => {
  const setThrottledSpaceMembersState = useSetRecoilState(
    throttledSpaceMembersState
  );
  const {
    spaceMembersStateRef,
    onSpaceMembersReset$,
    onSpaceMemberChanged$,
    onSpaceMemberUpdated$,
  } = useSpaceMembersContext();

  useEffect(() => {
    const subscription = merge(
      onSpaceMembersReset$,
      onSpaceMemberChanged$,
      // Throttle updates since they happen pretty much every tick.
      onSpaceMemberUpdated$.pipe(throttleTime(1000))
    ).subscribe(() => {
      setThrottledSpaceMembersState(
        spaceMembersStateRef.current.map((m) => m.clone())
      );
    });

    return () => subscription.unsubscribe();
  }, [
    spaceMembersStateRef,
    onSpaceMembersReset$,
    onSpaceMemberChanged$,
    onSpaceMemberUpdated$,
    setThrottledSpaceMembersState,
  ]);

  return <>{children}</>;
};

export const useThrottledSpaceMembersContext = () => {
  const spaceMembers = useRecoilValue(throttledSpaceMembersState);

  const {
    spaceMembersStateRef: _spaceMembersStateRef,
    onSpaceMembersReset$: _onSpaceMembersReset$,
    onSpaceMemberChanged$: _onSpaceMemberChanged$,
    onSpaceMemberUpdated$: _onSpaceMemberUpdated$,
    ...others
  } = useSpaceMembersContext();

  return {
    spaceMembers,
    ...others,
  };
};
