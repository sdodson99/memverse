import { MutableRefObject, useCallback, useEffect } from 'react';
import { useSpaceMembersContext } from './use-space-members-context';
import { merge } from 'rxjs';
import { SpaceMemberRaster } from '../../models/space-member-raster';

export const useHandleSpaceMemberUpdates = (
  spaceMemberRastersRef: MutableRefObject<SpaceMemberRaster[]>
) => {
  const { spaceMembersStateRef, onSpaceMemberChanged$, onSpaceMemberUpdated$ } =
    useSpaceMembersContext();

  const updateSpaceMember = useCallback(
    (memberId: string) => {
      const memberRaster = spaceMemberRastersRef.current.find(
        (m) => m.id === memberId
      );

      if (!memberRaster) {
        return;
      }

      const member = spaceMembersStateRef.current.find(
        (m) => m.id === memberId
      );

      if (!member) {
        return;
      }

      memberRaster.update(member);
    },
    [spaceMemberRastersRef, spaceMembersStateRef]
  );

  useEffect(() => {
    const subscription = merge(
      onSpaceMemberChanged$,
      onSpaceMemberUpdated$
    ).subscribe((memberId) => {
      updateSpaceMember(memberId);
    });

    return () => subscription.unsubscribe();
  }, [onSpaceMemberChanged$, onSpaceMemberUpdated$, updateSpaceMember]);
};
