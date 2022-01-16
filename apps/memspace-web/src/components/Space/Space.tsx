import React, { useEffect, useRef } from 'react';
import styles from './Space.module.css';
import paper from 'paper';
import { Member } from '../../models/member';

type SpaceProps = {
  members: Member[];
};

const Space = ({ members }: SpaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const addMembers = () => {
      members.forEach((m) => {
        const raster = new paper.Raster(m.photoUrl);

        raster.position = paper.view.center;
        raster.onMouseEnter = () => {
          console.log(m.username);
        };
      });
    };

    const canvas = canvasRef.current;

    if (canvas) {
      paper.setup(canvas);
      addMembers();
    }
  }, [canvasRef, members]);

  return (
    <canvas ref={canvasRef} className={styles.space} data-testid="Space" />
  );
};

export default Space;
