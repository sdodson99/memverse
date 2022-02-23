import React from 'react';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  children: React.ReactNode;
};

const PageHeader = ({ children }: PageHeaderProps) => (
  <h1 className={styles.pageHeader} data-testid="PageHeader">
    {children}
  </h1>
);

export default PageHeader;
