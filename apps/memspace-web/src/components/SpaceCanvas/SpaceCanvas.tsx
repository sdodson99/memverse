import React, { useRef } from 'react';
import { useSpaceMemberCanvasResize } from '../../hooks/space/use-space-member-canvas-resize';
import styles from './SpaceCanvas.module.css';
import { useUpdateSpace } from '../../hooks/space/use-update-space';
import { SpaceMemberRaster } from '../../models/space-member-raster';
import { useHandleSpaceMemberUpdates } from '../../hooks/space/use-handle-space-member-updates';
import { useHandleSpaceMemberResets } from '../../hooks/space/use-handle-space-member-resets';
import { useInitializePaperScope } from '../../hooks/space/use-initialize-paper-scope';

type SpaceCanvasProps = {};

const SpaceCanvas = ({}: SpaceCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scope: paperScope } = useInitializePaperScope(canvasRef);
  useUpdateSpace(paperScope);
  useSpaceMemberCanvasResize(paperScope);

  const spaceMemberRastersRef = useRef<SpaceMemberRaster[]>([]);
  useHandleSpaceMemberResets(spaceMemberRastersRef);
  useHandleSpaceMemberUpdates(spaceMemberRastersRef);

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
