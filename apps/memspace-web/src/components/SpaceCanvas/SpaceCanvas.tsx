import React, { useRef } from 'react';
import styles from './SpaceCanvas.module.css';
import { usePaperScope } from '../../hooks/space/use-paper-scope';
import { useUpdateSpaceMemberRasters } from '../../hooks/space/use-update-space-member-rasters';
import { useAddSpaceMemberRasters } from '../../hooks/space/use-add-space-member-rasters';
import { SpaceMember } from '../../models/space-member';

type SpaceCanvasProps = {
  members: SpaceMember[];
};

const SpaceCanvas = ({ members }: SpaceCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scope: paperScope } = usePaperScope(canvasRef);

  const { memberRasters } = useAddSpaceMemberRasters(members, paperScope);
  useUpdateSpaceMemberRasters(memberRasters, paperScope);

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
