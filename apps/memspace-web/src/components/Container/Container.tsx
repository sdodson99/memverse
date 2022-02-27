import React from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className={styles.container} data-testid="Container">
    {children}
  </div>
);

export default Container;
