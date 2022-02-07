import React from 'react';
import { Member } from '../../models/member';
import SpaceCanvas from '../SpaceCanvas/SpaceCanvas';
import SpaceToolbar from '../SpaceToolbar/SpaceToolbar';
import styles from './Space.module.css';

type SpaceProps = {
  members: Member[];
};

const Space = ({ members }: SpaceProps) => (
  <div className={styles.space} data-testid="Space">
    <div className={styles.spaceCanvas}>
      <SpaceCanvas members={members} />
    </div>
    <div className={styles.spaceToolbar}>
      <SpaceToolbar />
    </div>
  </div>
);

export default Space;
