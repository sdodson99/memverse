import React, { ReactNode } from 'react';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout} data-testid="Layout">
    {children}
  </div>
);

export default Layout;
