import { useEffect, useState } from 'react';
import paper from 'paper';
import { SpaceMemberRaster } from '../../models/space-member-raster';
import { createSpaceMemberRaster } from '../../models/space-member-raster-factory';
import { generateRandom } from '../../utilities/generate-random';
import { SpaceMember } from '../../models/space-member';

export const useAddSpaceMemberRasters = (
  members: SpaceMember[],
  paperScope: paper.PaperScope | null
) => {
  const [memberRasters, setMemberRasters] = useState<SpaceMemberRaster[]>([]);
  const [currentMembers, setCurrentMembers] = useState<SpaceMember[]>([]);

  useEffect(() => {
    if (!paperScope) {
      return;
    }

    if (members === currentMembers) {
      return;
    }

    const addMembersToView = () => {
      const getRandomPosition = () => {
        const { left, right, top, bottom } = paperScope.view.bounds;

        const x = generateRandom(left, right);
        const y = generateRandom(top, bottom);

        return new paper.Point(x, y);
      };

      const currentMemberRasters: SpaceMemberRaster[] = members.map((m) => {
        return createSpaceMemberRaster(m, getRandomPosition());
      });

      setMemberRasters(currentMemberRasters);
      setCurrentMembers(members);
    };

    const removeMembersFromView = () => {
      memberRasters.forEach((m) => m.remove());
    };

    removeMembersFromView();
    addMembersToView();
  }, [paperScope, members, currentMembers, memberRasters]);

  return {
    memberRasters,
  };
};
