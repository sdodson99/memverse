import React from 'react';
import styles from './SpaceMemberListingItem.module.css';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

export type SpaceMemberListingItemProps = {
  username: string;
  photoUrl: string;
  message?: string;
  paused?: boolean;
  onPause?: () => void;
  onUnpause?: () => void;
  isShowingDetails?: boolean;
  onShowDetails?: () => void;
  onHideDetails?: () => void;
};

const SpaceMemberListingItem = ({
  username,
  photoUrl,
  message,
  paused,
  onPause,
  onUnpause,
  isShowingDetails,
  onShowDetails,
  onHideDetails,
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
    <Menu menuButton={<MenuButton data-testid="MenuButton">···</MenuButton>}>
      {!paused && <MenuItem onClick={() => onPause?.()}>Pause</MenuItem>}
      {paused && <MenuItem onClick={() => onUnpause?.()}>Unpause</MenuItem>}

      {!isShowingDetails && (
        <MenuItem onClick={() => onShowDetails?.()}>Show Details</MenuItem>
      )}
      {isShowingDetails && (
        <MenuItem onClick={() => onHideDetails?.()}>Hide Details</MenuItem>
      )}
    </Menu>
  </div>
);

export default SpaceMemberListingItem;
