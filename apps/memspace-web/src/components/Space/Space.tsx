import React, { useEffect, useRef, useState } from 'react';
import styles from './Space.module.css';
import paper from 'paper';
import { Member } from '../../models/member';
import { usePaperScope } from '../../hooks/space/usePaperScope';
import { generateRandom } from '../../utilities/generate-random';
import { MemberRaster } from '../../models/member-raster';
import { createMemberRaster } from '../../models/member-raster-factory';

type SpaceProps = {
  members: Member[];
};

const Space = ({ members }: SpaceProps) => {
  const [memberRasters, setMemberRasters] = useState<MemberRaster[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { initialized: paperInitialized, scope: paperScope } =
    usePaperScope(canvasRef);

  useEffect(() => {
    if (!paperInitialized) {
      return;
    }

    paperScope.view.onFrame = ({
      delta: timeElapsedSeconds,
    }: {
      delta: number;
    }) => {
      memberRasters.forEach((m) => {
        m.update(timeElapsedSeconds);
      });
    };
  }, [paperInitialized, paperScope, memberRasters]);

  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);
  useEffect(() => {
    if (!paperInitialized) {
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
  }, [paperInitialized, paperScope, members, currentMembers, memberRasters]);

  return (
    <canvas ref={canvasRef} className={styles.space} data-testid="Space" />
  );
};

export default Space;
