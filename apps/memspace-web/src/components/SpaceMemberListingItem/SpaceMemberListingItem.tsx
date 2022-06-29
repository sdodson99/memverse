import React from 'react';
import styles from './SpaceMemberListingItem.module.css';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

export type SpaceMemberListingItemProps = {
  channelId: string;
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
  channelId,
  username,
  photoUrl,
  message,
  paused,
  onPause,
  onUnpause,
  isShowingDetails,
  onShowDetails,
  onHideDetails,
}: SpaceMemberListingItemProps) => {
  const channelLink = `https://www.youtube.com/channel/${channelId}`;

  return (
    <div
      className={styles.spaceMemberListingItem}
      data-testid="SpaceMemberListingItem"
    >
      <img
        className={styles.avatar}
        src={photoUrl}
        alt={`${username} Avatar`}
        referrerPolicy="no-referrer"
      />
      <div className={styles.content}>
        <div
          className={styles.usernameContent}
          data-testid="SpaceMemberListingItemUsername"
        >
          <span>{username}</span>
          <a
            href={channelLink}
            target="_blank"
            rel="noreferrer"
            className={styles.channelLink}
          >
            <ExternalLinkIcon />
          </a>
        </div>
        {message && <div className={styles.message}>{message}</div>}
      </div>
      <Menu closeOnSelect={false}>
        <MenuButton data-testid="MenuButton">...</MenuButton>
        <MenuList>
          {!paused && <MenuItem onClick={() => onPause?.()}>Pause</MenuItem>}
          {paused && <MenuItem onClick={() => onUnpause?.()}>Unpause</MenuItem>}

          {!isShowingDetails && (
            <MenuItem onClick={() => onShowDetails?.()}>Show Details</MenuItem>
          )}
          {isShowingDetails && (
            <MenuItem onClick={() => onHideDetails?.()}>Hide Details</MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};

export default SpaceMemberListingItem;
