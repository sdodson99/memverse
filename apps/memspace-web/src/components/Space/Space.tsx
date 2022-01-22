import React, { useEffect, useRef, useState } from 'react';
import styles from './Space.module.css';
import paper from 'paper';
import { Member } from '../../models/member';

type SpaceProps = {
  members: Member[];
};

const Space = ({ members }: SpaceProps) => {
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

    const addMembers = () => {
      members.forEach((m) => {
        const raster = new paper.Raster(m.photoUrl);

        raster.position = paper.view.center;
        raster.onMouseEnter = () => {
          console.log(m.username);
        };
      });
    };

    addMembers();
  }, [paperInitialized, members]);

  return (
    <canvas ref={canvasRef} className={styles.space} data-testid="Space" />
  );
};

export default Space;
