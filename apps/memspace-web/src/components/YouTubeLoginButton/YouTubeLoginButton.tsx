import React from 'react';
import styles from './YouTubeLoginButton.module.css';

type YouTubeLoginButtonProps = {
  onClick?: React.MouseEventHandler;
};

const YouTubeLoginButton = ({ onClick }: YouTubeLoginButtonProps) => (
  <button
    className={styles.youTubeLoginButton}
    data-testid="YouTubeLoginButton"
    onClick={onClick}
  >
    <div className={styles.label}>Login with</div>
    <div>
      <img className={styles.logo} src="/youtube-text.png" alt="YouTube" />
    </div>
  </button>
);

export default YouTubeLoginButton;
