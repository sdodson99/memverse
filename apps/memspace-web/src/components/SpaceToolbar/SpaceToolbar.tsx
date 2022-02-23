import React, { useState } from 'react';
import styles from './SpaceToolbar.module.css';
import SpaceMembersSheet from '../SpaceMembersSheet/SpaceMembersSheet';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import UpdateSpaceMemberMessageSheet from '../UpdateSpaceMemberMessageSheet/UpdateSpaceMemberMessageSheet';

type SpaceToolbarProps = {};

type SheetType = 'VIEW_MEMBERS' | 'UPDATE_MEMBER_MESSAGE';

const SpaceToolbar = ({}: SpaceToolbarProps) => {
  const [currentSheet, setCurrentSheet] = useState<SheetType | null>();

  const isLoggedIn = useIsLoggedIn();

  const handleSheetDismiss = () => setCurrentSheet(null);

  return (
    <div className={styles.spaceToolbar} data-testid="SpaceToolbar">
      <div className="container">
        <div className={styles.spaceToolbarContent}>
          <button
            className={styles.toolbarItem}
            onClick={() => setCurrentSheet('VIEW_MEMBERS')}
            aria-label="View members"
          >
            🔎
          </button>

          {isLoggedIn && (
            <button
              className={styles.toolbarItem}
              onClick={() => setCurrentSheet('UPDATE_MEMBER_MESSAGE')}
              aria-label="Update message"
            >
              ✏️
            </button>
          )}
        </div>
      </div>
      <SpaceMembersSheet
        open={currentSheet === 'VIEW_MEMBERS'}
        onDismiss={handleSheetDismiss}
      />
      <UpdateSpaceMemberMessageSheet
        open={currentSheet === 'UPDATE_MEMBER_MESSAGE'}
        onDismiss={handleSheetDismiss}
      />
    </div>
  );
};

export default SpaceToolbar;
