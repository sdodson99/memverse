import React, { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout} data-testid="Layout">
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
