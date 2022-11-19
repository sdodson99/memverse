import React from 'react';
import styles from './Footer.module.css';

type FooterProps = {};

const Footer = ({}: FooterProps) => (
  <footer className={styles.footer} data-testid="Footer">
    Copyright © 2022 Sean Dodson. All rights reserved.
  </footer>
);

export default Footer;
