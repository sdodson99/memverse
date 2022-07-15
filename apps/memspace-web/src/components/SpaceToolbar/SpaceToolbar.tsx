import React, { useState } from 'react';
import styles from './SpaceToolbar.module.css';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { BottomSheet } from 'react-spring-bottom-sheet';
import ViewSpaceMembers from '../ViewSpaceMembers/ViewSpaceMembers';
import Container from '../Container/Container';
import { useThrottledSpaceMembersContext } from '../../hooks/space/use-throttled-space-members-context';
import { usePaperScope } from '../../hooks/space/use-paper-scope';
import { Tooltip } from '@chakra-ui/react';
import UpdateSpaceMemberMessageSheet from '../UpdateSpaceMemberMessageSheet/UpdateSpaceMemberMessageSheet';

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
          <Tooltip hasArrow label="View Members" bg="gray.100" color="gray.900">
            <button
              className={styles.toolbarItem}
              onClick={() => setCurrentSheet('VIEW_MEMBERS')}
            >
              🔎
            </button>
          </Tooltip>

          <Tooltip
            hasArrow
            label="Shuffle Members"
            bg="gray.100"
            color="gray.900"
          >
            <button
              className={styles.toolbarItem}
              onClick={() => handleShuffleMembers()}
            >
              🔀
            </button>
          </Tooltip>

          {isLoggedIn && (
            <>
              <Tooltip
                hasArrow
                label="Update Members"
                bg="gray.100"
                color="gray.900"
              >
                <button
                  className={styles.toolbarItem}
                  onClick={() => setCurrentSheet('UPDATE_MEMBER_MESSAGE')}
                >
                  ✏️
                </button>
              </Tooltip>
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
      <UpdateSpaceMemberMessageSheet
        open={currentSheet === 'UPDATE_MEMBER_MESSAGE'}
        onDismiss={handleSheetDismiss}
        onSuccess={handleSheetDismiss}
        className={styles.sheet}
        innerContentClassName={styles.sheetContent}
      />
    </div>
  );
};

export default SpaceToolbar;
