import React, { useRef } from 'react';
import styles from './SpaceCanvas.module.css';
import { Member } from '../../models/member';
import { usePaperScope } from '../../hooks/space/usePaperScope';
import { useUpdateMemberRasters } from '../../hooks/space/useUpdateMemberRasters';
import { useAddMemberRasters } from '../../hooks/space/useAddMemberRasters';

type SpaceCanvasProps = {
  members: Member[];
};

const SpaceCanvas = ({ members }: SpaceCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scope: paperScope } = usePaperScope(canvasRef);

  const { memberRasters } = useAddMemberRasters(members, paperScope);
  useUpdateMemberRasters(memberRasters, paperScope);

  return (
    <canvas
      ref={canvasRef}
      className={styles.spaceCanvas}
      data-testid="SpaceCanvas"
      data-paper-resize="true"
    />
  );
};

export default SpaceCanvas;
