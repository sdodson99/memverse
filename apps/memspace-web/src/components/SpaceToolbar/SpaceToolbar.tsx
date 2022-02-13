import React, { useState } from 'react';
import styles from './SpaceToolbar.module.css';
import SpaceMembersSheet from '../SpaceMembersSheet/SpaceMembersSheet';

type SpaceToolbarProps = {};

const SpaceToolbar = ({}: SpaceToolbarProps) => {
  const [viewMembersSheetOpen, setViewMembersSheetOpen] =
    useState<boolean>(false);

  const handleViewMembersClick = () => {
    setViewMembersSheetOpen(true);
  };

  const handleViewMembersSheetDismiss = () => {
    setViewMembersSheetOpen(false);
  };

  return (
    <div className={styles.spaceToolbar} data-testid="SpaceToolbar">
      <div className="container">
        <div className={styles.spaceToolbarContent}>
          <button
            className={styles.toolbarItem}
            onClick={handleViewMembersClick}
            aria-label="View members"
          >
            🔎
          </button>
        </div>
      </div>
      <SpaceMembersSheet
        open={viewMembersSheetOpen}
        onDismiss={handleViewMembersSheetDismiss}
      />
    </div>
  );
};

export default SpaceToolbar;
