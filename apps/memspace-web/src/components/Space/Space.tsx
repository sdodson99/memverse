import React from 'react';
import { SpaceMembersProvider } from '../../hooks/space/use-space-members-context';
import { ThrottledSpaceMembersProvider } from '../../hooks/space/use-throttled-space-members-context';
import { Member } from '../../models/member';
import SpaceCanvas from '../SpaceCanvas/SpaceCanvas';
import SpaceToolbar from '../SpaceToolbar/SpaceToolbar';
import styles from './Space.module.css';

type SpaceProps = {
  members: Member[];
};

const Space = ({ members }: SpaceProps) => {
  return (
    <div className={styles.space} data-testid="Space">
      <SpaceMembersProvider members={members}>
        <ThrottledSpaceMembersProvider>
          <div className={styles.spaceCanvas}>
            <SpaceCanvas />
          </div>
          <div className={styles.spaceToolbar}>
            <SpaceToolbar />
          </div>
        </ThrottledSpaceMembersProvider>
      </SpaceMembersProvider>
    </div>
  );
};

export default Space;
