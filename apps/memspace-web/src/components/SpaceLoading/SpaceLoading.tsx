import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './SpaceLoading.module.css';

type SpaceLoadingProps = {};

const SpaceLoading = ({}: SpaceLoadingProps) => (
  <div className={styles.spaceLoading} data-testid="SpaceLoading">
    <LoadingSpinner color="white" size={200} strokeWidth={1} />
    <div className={styles.description}>Loading members...</div>
  </div>
);

export default SpaceLoading;
