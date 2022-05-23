import React, { useState } from 'react';
import styles from './SpaceToolbar.module.css';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { BottomSheet } from 'react-spring-bottom-sheet';
import ViewSpaceMembers from '../ViewSpaceMembers/ViewSpaceMembers';
import UpdateSpaceMemberMessage from '../UpdateSpaceMemberMessage/UpdateSpaceMemberMessage';
import Container from '../Container/Container';
import ReactTooltip from 'react-tooltip';
import { useThrottledSpaceMembersContext } from '../../hooks/space/use-throttled-space-members-context';
import { usePaperScope } from '../../hooks/space/use-paper-scope';

type SpaceToolbarProps = {};

type SheetType = 'VIEW_MEMBERS' | 'UPDATE_MEMBER_MESSAGE';

const SpaceToolbar = ({}: SpaceToolbarProps) => {
  const [currentSheet, setCurrentSheet] = useState<SheetType | null>();

  const isLoggedIn = useIsLoggedIn();

  const handleSheetDismiss = () => setCurrentSheet(null);

  const [paperScope] = usePaperScope();
  const { shuffleSpaceMembers } = useThrottledSpaceMembersContext();
  const handleShuffleMembers = () => {
    const bounds = paperScope?.view?.bounds;

    if (!bounds) {
      return;
    }

    shuffleSpaceMembers(bounds);
  };

  return (
    <div className={styles.spaceToolbar} data-testid="SpaceToolbar">
      <Container>
        <div className={styles.spaceToolbarContent}>
          <button
            className={styles.toolbarItem}
            onClick={() => setCurrentSheet('VIEW_MEMBERS')}
            aria-label="View members"
            data-tip="View Members"
          >
            🔎
          </button>
          <ReactTooltip effect="solid" place="top" type="light" />

          <button
            className={styles.toolbarItem}
            onClick={() => handleShuffleMembers()}
            aria-label="Shuffle members"
            data-tip="Shuffle Members"
          >
            🔀
          </button>
          <ReactTooltip effect="solid" place="top" type="light" />

          {isLoggedIn && (
            <>
              <button
                className={styles.toolbarItem}
                onClick={() => setCurrentSheet('UPDATE_MEMBER_MESSAGE')}
                aria-label="Update message"
                data-tip="Update Message"
              >
                ✏️
              </button>
              <ReactTooltip effect="solid" place="top" type="light" />
            </>
          )}
        </div>
      </Container>
      <BottomSheet
        open={currentSheet === 'VIEW_MEMBERS'}
        header="Members"
        defaultSnap={({ maxHeight }) => maxHeight * 0.75}
        snapPoints={({ maxHeight }) => [maxHeight * 0.35, maxHeight * 0.75]}
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
        maxHeight={500}
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
