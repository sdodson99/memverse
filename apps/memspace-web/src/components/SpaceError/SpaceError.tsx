import React from 'react';
import styles from './SpaceError.module.css';

type SpaceErrorProps = {};

const SpaceError = ({}: SpaceErrorProps) => (
  <div className={styles.spaceError} data-testid="SpaceError">
    <div className="container">
      Failed to load members. Please refresh to try again.
    </div>
  </div>
);

export default SpaceError;
