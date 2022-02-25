import React from 'react';
import styles from './SpaceMemberListingItem.module.css';

export type SpaceMemberListingItemProps = {
  username: string;
  photoUrl: string;
  message?: string;
};

const SpaceMemberListingItem = ({
  username,
  photoUrl,
  message,
}: SpaceMemberListingItemProps) => (
  <div
    className={styles.spaceMemberListingItem}
    data-testid="SpaceMemberListingItem"
  >
    <img className={styles.avatar} src={photoUrl} alt={`${username} Avatar`} />
    <div className={styles.content}>
      <div className={styles.username}>{username}</div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  </div>
);

export default SpaceMemberListingItem;
