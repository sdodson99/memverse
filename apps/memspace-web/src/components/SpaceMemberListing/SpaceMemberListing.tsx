import React from 'react';
import { SpaceMember } from '../../models/space-member';
import SpaceMemberListingItem from '../SpaceMemberListingItem/SpaceMemberListingItem';
import styles from './SpaceMemberListing.module.css';

type SpaceMemberListingProps = {
  members: SpaceMember[];
  onPause?: (member: SpaceMember) => void;
  onUnpause?: (member: SpaceMember) => void;
};

const SpaceMemberListing = ({
  members,
  onPause,
  onUnpause,
}: SpaceMemberListingProps) => {
  const memberListingItems = members.map((m) => {
    return (
      <div key={m.id} className={styles.spaceMemberListingItem}>
        <SpaceMemberListingItem
          username={m.username}
          photoUrl={m.photoUrl}
          message={m.message}
          paused={m.paused}
          onPause={() => onPause?.(m)}
          onUnpause={() => onUnpause?.(m)}
        />
      </div>
    );
  });

  return (
    <div className={styles.spaceMemberListing} data-testid="SpaceMemberListing">
      {memberListingItems}
    </div>
  );
};

export default SpaceMemberListing;
