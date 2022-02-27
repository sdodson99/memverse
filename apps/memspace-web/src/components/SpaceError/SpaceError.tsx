import React from 'react';
import Container from '../Container/Container';
import styles from './SpaceError.module.css';

type SpaceErrorProps = {};

const SpaceError = ({}: SpaceErrorProps) => (
  <div className={styles.spaceError} data-testid="SpaceError">
    <Container>Failed to load members. Please refresh to try again.</Container>
  </div>
);

export default SpaceError;
