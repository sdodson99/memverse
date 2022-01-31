import React, { useRef } from 'react';
import styles from './Space.module.css';
import { Member } from '../../models/member';
import { usePaperScope } from '../../hooks/space/usePaperScope';
import { useUpdateMemberRasters } from '../../hooks/space/useUpdateMemberRasters';
import { useAddMemberRasters } from '../../hooks/space/useAddMemberRasters';

type SpaceProps = {
  members: Member[];
};

const Space = ({ members }: SpaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scope: paperScope } = usePaperScope(canvasRef);

  const { memberRasters } = useAddMemberRasters(members, paperScope);
  useUpdateMemberRasters(memberRasters, paperScope);

  return (
    <canvas ref={canvasRef} className={styles.space} data-testid="Space" />
  );
};

export default Space;
