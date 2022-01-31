import { useEffect, useState } from 'react';
import paper from 'paper';
import { Member } from '../../models/member';
import { MemberRaster } from '../../models/member-raster';
import { createMemberRaster } from '../../models/member-raster-factory';
import { generateRandom } from '../../utilities/generate-random';

export const useAddMemberRasters = (
  members: Member[],
  paperScope: paper.PaperScope | null
) => {
  const [memberRasters, setMemberRasters] = useState<MemberRaster[]>([]);
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);

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

      const currentMemberRasters: MemberRaster[] = members.map((m) => {
        return createMemberRaster(m, getRandomPosition());
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
