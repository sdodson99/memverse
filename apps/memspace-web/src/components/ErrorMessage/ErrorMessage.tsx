import React from 'react';
import styles from './ErrorMessage.module.css';

type ErrorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <div className={styles.errorMessage} data-testid="ErrorMessage">
    {children}
  </div>
);

export default ErrorMessage;
