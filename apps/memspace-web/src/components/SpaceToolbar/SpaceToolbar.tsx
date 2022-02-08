import React from 'react';
import styles from './SpaceToolbar.module.css';

type SpaceToolbarProps = {};

const SpaceToolbar = ({}: SpaceToolbarProps) => {
  return (
    <div className={styles.spaceToolbar} data-testid="SpaceToolbar">
      <div className="container">
        <div className={styles.spaceToolbarContent}>
          <button className={styles.toolbarItem} onClick={() => {}}>
            🔎
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceToolbar;
