import React from 'react';
import styles from './Header.module.css';

type HeaderProps = {};

const Header = ({}: HeaderProps) => (
  <div className={styles.header} data-testid="Header">
    Header Component
  </div>
);

export default Header;
