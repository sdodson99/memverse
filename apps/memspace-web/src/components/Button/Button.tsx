import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ children, ...others }: ButtonProps) => (
  <button className={styles.button} data-testid="Button" {...others}>
    {children}
  </button>
);

export default Button;
