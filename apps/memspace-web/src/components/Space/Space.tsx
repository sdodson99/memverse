import React, { useEffect, useRef, useState } from 'react';
import styles from './Space.module.css';
import paper from 'paper';
import { Member } from '../../models/member';

type SpaceProps = {
  members: Member[];
};

const Space = ({ members }: SpaceProps) => {
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);
  const [memberRasters, setMemberRasters] = useState<paper.Raster[]>([]);

  const [paperInitialized, setPaperInitialized] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (paperInitialized) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    paper.setup(canvas);

    setPaperInitialized(true);
  }, [canvasRef, paperInitialized]);

  useEffect(() => {
    if (!paperInitialized) {
      return;
    }

    if (members === currentMembers) {
      return;
    }

    const addMembersToView = () => {
      const currentMemberRasters = members.map((m) => {
        const raster = new paper.Raster(m.photoUrl);

        raster.position = paper.view.center;
        raster.onMouseEnter = () => {
          console.log(m.username);
        };

        return raster;
      });

      setMemberRasters(currentMemberRasters);
      setCurrentMembers(members);
    };

    const removePreviousMembersFromView = () => {
      memberRasters.forEach((r) => r.remove());
    };

    removePreviousMembersFromView();
    addMembersToView();
  }, [paperInitialized, members, currentMembers, memberRasters]);

  return (
    <canvas ref={canvasRef} className={styles.space} data-testid="Space" />
  );
};

export default Space;
