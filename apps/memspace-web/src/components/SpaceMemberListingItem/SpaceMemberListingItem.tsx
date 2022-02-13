/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './SpaceMemberListingItem.module.css';

export type SpaceMemberListingItemProps = {
  username: string;
  photoUrl: string;
};

const SpaceMemberListingItem = ({
  username,
  photoUrl,
}: SpaceMemberListingItemProps) => (
  <div
    className={styles.spaceMemberListingItem}
    data-testid="SpaceMemberListingItem"
  >
    <img className={styles.avatar} src={photoUrl} alt={`${username} Avatar`} />
    <div className={styles.username}>{username}</div>
  </div>
);

export default SpaceMemberListingItem;
