import React, { useState } from 'react';
import styles from './SpaceToolbar.module.css';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { BottomSheet } from 'react-spring-bottom-sheet';
import ViewSpaceMembers from '../ViewSpaceMembers/ViewSpaceMembers';
import UpdateSpaceMemberMessage from '../UpdateSpaceMemberMessage/UpdateSpaceMemberMessage';
import Container from '../Container/Container';

type SpaceToolbarProps = {};

type SheetType = 'VIEW_MEMBERS' | 'UPDATE_MEMBER_MESSAGE';

const SpaceToolbar = ({}: SpaceToolbarProps) => {
  const [currentSheet, setCurrentSheet] = useState<SheetType | null>();

  const isLoggedIn = useIsLoggedIn();

  const handleSheetDismiss = () => setCurrentSheet(null);

  return (
    <div className={styles.spaceToolbar} data-testid="SpaceToolbar">
      <Container>
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
      </Container>
      <BottomSheet
        open={currentSheet === 'VIEW_MEMBERS'}
        header="Members"
        snapPoints={({ maxHeight }) => maxHeight * 0.55}
        onDismiss={handleSheetDismiss}
        className={styles.sheet}
      >
        <div className={styles.sheetContent}>
          <ViewSpaceMembers />
        </div>
      </BottomSheet>
      <BottomSheet
        open={currentSheet === 'UPDATE_MEMBER_MESSAGE'}
        header="Message"
        snapPoints={({ maxHeight }) => maxHeight * 0.4}
        onDismiss={handleSheetDismiss}
        className={styles.sheet}
      >
        <div className={styles.sheetContent}>
          <UpdateSpaceMemberMessage />
        </div>
      </BottomSheet>
    </div>
  );
};

export default SpaceToolbar;
