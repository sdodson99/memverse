/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './Header.module.css';

type HeaderProps = {};

const Header = ({}: HeaderProps) => (
  <div className={styles.header} data-testid="Header">
    <img className={styles.logo} src="/logo.svg" alt="Memspace Logo" />
  </div>
);

export default Header;
