import React from 'react';
import Header from '../Header/Header';
import styles from './SpaceLayout.module.css';

type SpaceLayoutProps = {
  children: React.ReactNode;
};

const SpaceLayout = ({ children }: SpaceLayoutProps) => (
  <div className={styles.spaceLayout} data-testid="SpaceLayout">
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);

export default SpaceLayout;
