import React from 'react';
import styles from './Footer.module.css';

type FooterProps = {};

const Footer = ({}: FooterProps) => (
  <footer className={styles.footer} data-testid="Footer">
    Copyright © {new Date().getFullYear()} Sean Dodson. All rights reserved.
  </footer>
);

export default Footer;
