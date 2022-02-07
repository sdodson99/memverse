import React from 'react';
import styles from './SpaceToolbar.module.css';

type SpaceToolbarProps = {};

const SpaceToolbar = ({}: SpaceToolbarProps) => (
  <div className={styles.spaceToolbar} data-testid="SpaceToolbar">
    SpaceToolbar Component
  </div>
);

export default SpaceToolbar;
