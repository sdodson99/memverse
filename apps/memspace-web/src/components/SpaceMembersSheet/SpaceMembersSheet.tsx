import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import SpaceMemberListing from '../SpaceMemberListing/SpaceMemberListing';
import styles from './SpaceMembersSheet.module.css';

export type SpaceMembersSheetProps = {
  open: boolean;
  onDismiss?: () => void;
};

const SpaceMembersSheet = ({ open, onDismiss }: SpaceMembersSheetProps) => {
  const { spaceMembers } = useSpaceMembersContext();

  const membersCount = spaceMembers.length;

  return (
    <BottomSheet
      open={open}
      header="Members"
      maxHeight={500}
      onDismiss={onDismiss}
      className={styles.spaceMembersSheet}
      data-testid="SpaceMembersSheet"
    >
      <div className={styles.content}>
        <div className={styles.description}>
          Thank you to the <strong>{membersCount}</strong> member(s) below for
          supporting the SingletonSean YouTube channel.
        </div>
        <div className={styles.listing}>
          <SpaceMemberListing members={spaceMembers} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default SpaceMembersSheet;
