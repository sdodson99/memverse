import { Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { NonMemberError } from '../../hooks/authentication/use-application-login';
import { useLogin } from '../../hooks/authentication/use-login';
import { useNavigate } from '../../hooks/use-navigate';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import YouTubeLoginButton from '../YouTubeLoginButton/YouTubeLoginButton';
import styles from './Login.module.css';

type LoginProps = {};

type LoginError = 'NON_MEMBER' | 'UNKNOWN';

const Login = ({}: LoginProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<LoginError>();

  const { login, isInitializing: isLoginInitializing } = useLogin();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    setLoginError(undefined);
    setIsLoggingIn(true);

    try {
      await login();

      await navigate({ pathname: '/' });
    } catch (error) {
      setIsLoggingIn(false);

      if (error instanceof NonMemberError) {
        setLoginError('NON_MEMBER');
      } else {
        setLoginError('UNKNOWN');
      }
    }
  };

  return (
    <div className={styles.login} data-testid="Login">
      <div className={styles.description}>
        Use a YouTube account to login to Memspace. You <strong>must</strong> be
        a{' '}
        <Link
          href="https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg/join"
          target="_blank"
          rel="noreferrer"
          color="blue"
        >
          SingletonSean YouTube member
        </Link>{' '}
        in order to successfully login.
      </div>

      {!isLoggingIn && !isLoginInitializing && (
        <div>
          <div className={styles.loginButton}>
            <YouTubeLoginButton onClick={handleLoginClick} />
          </div>

          {loginError === 'NON_MEMBER' && (
            <div
              className={styles.error}
              data-testid="NonMemberLoginErrorMessage"
            >
              <ErrorMessage>
                You are not a SingletonSean YouTube member.{' '}
                <a
                  href="https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg/join"
                  target="_blank"
                  rel="noreferrer"
                >
                  Become a member
                </a>{' '}
                in order to login.
              </ErrorMessage>
            </div>
          )}

          {loginError === 'UNKNOWN' && (
            <div
              className={styles.error}
              data-testid="UnknownLoginErrorMessage"
            >
              <ErrorMessage>
                Failed to login. Please try again later.
              </ErrorMessage>
            </div>
          )}
        </div>
      )}

      {(isLoggingIn || isLoginInitializing) && (
        <div className={styles.loadingSpinner}>
          <LoadingSpinner size={75} />
        </div>
      )}
    </div>
  );
};

export default Login;
