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
      const generateRandom = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      const getRandomPosition = () => {
        const { left, right, top, bottom } = paper.view.bounds;

        const x = generateRandom(left, right);
        const y = generateRandom(top, bottom);

        return new paper.Point(x, y);
      };

      const currentMemberRasters = members.map((m) => {
        const raster = new paper.Raster();

        raster.onMouseEnter = () => {
          console.log(m.username);
        };

        raster.onLoad = () => {
          raster.size.width = 50;
          raster.size.height = 50;
        };

        raster.source = m.photoUrl;
        raster.position = getRandomPosition();
        raster.size.width = 50;
        raster.size.height = 50;

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
