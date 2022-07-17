import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './SpaceLayout.module.css';

type SpaceLayoutProps = {
  children: React.ReactNode;
};

const SpaceLayout = ({ children }: SpaceLayoutProps) => (
  <div className={styles.spaceLayout} data-testid="SpaceLayout">
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
    <Footer />
  </div>
);

export default SpaceLayout;
