import React, { useEffect, useRef, useState } from 'react';
import styles from './Space.module.css';
import paper from 'paper';
import { Member } from '../../models/member';

type SpaceProps = {
  members: Member[];
};

type MemberRaster = {
  raster: paper.Raster;
  directionRadians: number;
};

const Space = ({ members }: SpaceProps) => {
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);
  const [memberRasters, setMemberRasters] = useState<MemberRaster[]>([]);

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

    paper.view.onFrame = ({ delta: timeElapsedSeconds }: { delta: number }) => {
      const pixelsPerSecond = 10;
      const pixelsTravelled = pixelsPerSecond * timeElapsedSeconds;

      memberRasters.forEach((m) => {
        const xPixelsTravelled = Math.cos(m.directionRadians) * pixelsTravelled;
        const yPixelsTravelled = Math.sin(m.directionRadians) * pixelsTravelled;

        m.raster.position = m.raster.position.add(
          new paper.Point(xPixelsTravelled, yPixelsTravelled)
        );
      });
    };
  }, [paperInitialized, memberRasters]);

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

      const currentMemberRasters: MemberRaster[] = members.map((m) => {
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

        const directionRadians = generateRandom(0, 2 * Math.PI);

        return {
          raster,
          directionRadians,
        };
      });

      setMemberRasters(currentMemberRasters);
      setCurrentMembers(members);
    };

    const removePreviousMembersFromView = () => {
      memberRasters.forEach(({ raster }) => raster.remove());
    };

    removePreviousMembersFromView();
    addMembersToView();
  }, [paperInitialized, members, currentMembers, memberRasters]);

  return (
    <canvas ref={canvasRef} className={styles.space} data-testid="Space" />
  );
};

export default Space;
