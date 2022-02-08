import React, { useRef } from 'react';
import styles from './SpaceCanvas.module.css';
import { usePaperScope } from '../../hooks/space/usePaperScope';
import { useUpdateMemberRasters } from '../../hooks/space/useUpdateMemberRasters';
import { useAddMemberRasters } from '../../hooks/space/useAddMemberRasters';
import { SpaceMember } from '../../models/space-member';

type SpaceCanvasProps = {
  members: SpaceMember[];
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
