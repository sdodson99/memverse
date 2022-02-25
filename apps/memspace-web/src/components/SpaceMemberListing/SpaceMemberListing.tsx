import React from 'react';
import { SpaceMember } from '../../models/space-member';
import SpaceMemberListingItem from '../SpaceMemberListingItem/SpaceMemberListingItem';
import styles from './SpaceMemberListing.module.css';

type SpaceMemberListingProps = {
  members: SpaceMember[];
};

const SpaceMemberListing = ({ members }: SpaceMemberListingProps) => {
  const memberListingItems = members.map((m) => {
    return (
      <div key={m.id} className={styles.spaceMemberListingItem}>
        <SpaceMemberListingItem
          username={m.username}
          photoUrl={m.photoUrl}
          message={m.message}
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
