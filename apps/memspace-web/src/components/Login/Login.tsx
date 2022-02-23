import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useLogin } from '../../hooks/authentication/use-login';
import { useYouTubeLogin } from '../../hooks/authentication/use-youtube-login';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import YouTubeLoginButton from '../YouTubeLoginButton/YouTubeLoginButton';
import styles from './Login.module.css';

type LoginProps = {};

const Login = ({}: LoginProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);

  const youTubeLogin = useYouTubeLogin();
  const login = useLogin();
  const router = useRouter();

  const handleLoginClick = async () => {
    setHasLoginError(false);
    setIsLoggingIn(true);

    try {
      const accessToken = await youTubeLogin();

      await login(accessToken);

      await router.push('/');
    } catch (error) {
      setHasLoginError(true);
    }

    setIsLoggingIn(false);
  };

  return (
    <div className={styles.login} data-testid="Login">
      <div className={styles.description}>
        Use a YouTube account to login to Memspace. You <strong>must</strong> be
        a{' '}
        <a
          href="https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg/join"
          target="_blank"
          rel="noreferrer"
        >
          SingletonSean YouTube member
        </a>{' '}
        in order to successfully login.
      </div>

      {!isLoggingIn && (
        <div>
          <div className={styles.loginButton}>
            <YouTubeLoginButton onClick={handleLoginClick} />
          </div>

          {hasLoginError && (
            <div className={styles.error} data-testid="LoginErrorMessage">
              Failed to login. Please ensure you are a{' '}
              <a
                href="https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg/join"
                target="_blank"
                rel="noreferrer"
              >
                SingletonSean YouTube member
              </a>{' '}
              or try again later.
            </div>
          )}
        </div>
      )}

      {isLoggingIn && (
        <div className={styles.loadingSpinner}>
          <LoadingSpinner size={75} />
        </div>
      )}
    </div>
  );
};

export default Login;
