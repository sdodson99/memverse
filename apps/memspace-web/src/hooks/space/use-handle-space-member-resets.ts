import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { SpaceMemberRaster } from '../../models/space-member-raster';
import { useSpaceMembersContext } from './use-space-members-context';

export const useHandleSpaceMemberResets = (
  spaceMemberRastersRef: MutableRefObject<SpaceMemberRaster[]>
) => {
  const [loaded, setLoaded] = useState(false);

  const {
    spaceMembersStateRef,
    onSpaceMembersReset$,
    loadSpaceMember,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
  } = useSpaceMembersContext();

  const addSpaceMembers = useCallback(() => {
    const spaceMemberRasters =
      spaceMembersStateRef.current.map<SpaceMemberRaster>((m) => {
        const raster = new SpaceMemberRaster(m.id);

        raster.onLoad = () => loadSpaceMember(m);
        raster.onClick = () => {
          toggleSpaceMemberPaused(m);
          raster.bringToFront();
        };
        raster.onMouseEnter = () => setShowSpaceMemberDetails(m, true);
        raster.onMouseLeave = () => setShowSpaceMemberDetails(m, false);
        raster.photoUrl = m.photoUrl;

        raster.update(m);

        return raster;
      });

    spaceMemberRastersRef.current = spaceMemberRasters;
  }, [
    spaceMembersStateRef,
    loadSpaceMember,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
    spaceMemberRastersRef,
  ]);

  const removeSpaceMembers = useCallback(() => {
    spaceMemberRastersRef.current.forEach((r) => {
      r.remove();
    });
  }, [spaceMemberRastersRef]);

  const resetSpaceMembers = useCallback(() => {
    removeSpaceMembers();
    addSpaceMembers();
  }, [addSpaceMembers, removeSpaceMembers]);

  useEffect(() => {
    if (loaded) {
      return;
    }

    resetSpaceMembers();
    setLoaded(true);
  }, [loaded, resetSpaceMembers]);

  useEffect(() => {
    const subscription = onSpaceMembersReset$.subscribe(() => {
      resetSpaceMembers();
    });

    return () => subscription.unsubscribe();
  }, [onSpaceMembersReset$, resetSpaceMembers]);
};
