import React from 'react';
import styles from './Footer.module.css';

type FooterProps = {};

const Footer = ({}: FooterProps) => (
  <footer className={styles.footer} data-testid="Footer">
    © 2022 SingletonSean
  </footer>
);

export default Footer;
