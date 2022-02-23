import React from 'react';
import YouTubeLoginButton from '../YouTubeLoginButton/YouTubeLoginButton';
import styles from './Login.module.css';

type LoginProps = {};

const Login = ({}: LoginProps) => {
  const handleLogin = () => {};

  return (
    <div className={styles.login} data-testid="Login">
      <div className={styles.description}>
        Use a YouTube account to login to Memspace. You <strong>must</strong> be
        a member of the{' '}
        <a
          href="https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg/join"
          target="_blank"
          rel="noreferrer"
        >
          SingletonSean YouTube channel
        </a>{' '}
        in order to successfully login.
      </div>
      <div className={styles.loginButton}>
        <YouTubeLoginButton onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
