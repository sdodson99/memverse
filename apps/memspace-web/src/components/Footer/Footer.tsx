import React from 'react';
import styles from './Footer.module.css';

type FooterProps = {};

const Footer = ({}: FooterProps) => (
  <div className={styles.footer} data-testid="Footer">
    © 2022 SingletonSean
  </div>
);

export default Footer;
