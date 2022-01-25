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
  speedPixelsPerSecond: number;
};

const DEFAULT_SPEED_PIXELS_PER_SECOND = 50;

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
      memberRasters.forEach((m) => {
        const pixelsTravelled = m.speedPixelsPerSecond * timeElapsedSeconds;
        const xPixelsTravelled = Math.cos(m.directionRadians) * pixelsTravelled;
        const yPixelsTravelled = Math.sin(m.directionRadians) * pixelsTravelled;

        m.raster.position = m.raster.position.add(
          new paper.Point(xPixelsTravelled, yPixelsTravelled)
        );

        if (m.raster.position.x > paper.view.bounds.right) {
          m.directionRadians = Math.PI - m.directionRadians;
          m.raster.position.x = paper.view.bounds.right;
        }

        if (m.raster.position.x < paper.view.bounds.left) {
          m.directionRadians = Math.PI - m.directionRadians;
          m.raster.position.x = paper.view.bounds.left;
        }

        if (m.raster.position.y > paper.view.bounds.bottom) {
          m.directionRadians = 2 * Math.PI - m.directionRadians;
          m.raster.position.y = paper.view.bounds.bottom;
        }

        if (m.raster.position.y < paper.view.bounds.top) {
          m.directionRadians = 2 * Math.PI - m.directionRadians;
          m.raster.position.y = paper.view.bounds.top;
        }

        while (m.directionRadians < 0) {
          m.directionRadians = 2 * Math.PI + m.directionRadians;
        }

        while (m.directionRadians > 2 * Math.PI) {
          m.directionRadians = m.directionRadians - 2 * Math.PI;
        }
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
        const memberRaster: MemberRaster = {
          raster: new paper.Raster(),
          directionRadians: generateRandom(0, 2 * Math.PI),
          speedPixelsPerSecond: DEFAULT_SPEED_PIXELS_PER_SECOND,
        };

        const { raster } = memberRaster;

        raster.onMouseEnter = () => {
          memberRaster.speedPixelsPerSecond = 0;
        };

        raster.onMouseLeave = () => {
          memberRaster.speedPixelsPerSecond = DEFAULT_SPEED_PIXELS_PER_SECOND;
        };

        raster.onLoad = () => {
          raster.size.width = 50;
          raster.size.height = 50;
        };

        raster.source = m.photoUrl;
        raster.position = getRandomPosition();
        raster.size.width = 50;
        raster.size.height = 50;

        return memberRaster;
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
