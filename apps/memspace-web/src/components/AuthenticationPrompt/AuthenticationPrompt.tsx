import React, { useState } from 'react';
import { useGoogleAuth } from 'react-gapi-auth2';
import { useIsLoggedIn } from '../../hooks/use-is-logged-in';
import { useLogin } from '../../hooks/use-login';
import styles from './AuthenticationPrompt.module.css';

type AuthenticationPromptProps = {};

const AuthenticationPrompt = ({}: AuthenticationPromptProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const isLoggedIn = useIsLoggedIn();
  const login = useLogin();
  const auth = useGoogleAuth();

  const handleLoginClick = async () => {
    setLoginError(null);
    setIsLoggingIn(true);

    const user = await auth.googleAuth?.signIn();
    const authResponse = user?.getAuthResponse();

    const accessToken = authResponse?.access_token;

    if (!accessToken) {
      return;
    }

    try {
      await login(accessToken);
    } catch (error) {
      setLoginError(error);
    }

    setIsLoggingIn(false);
  };

  return (
    <div
      className={styles.authenticationPrompt}
      data-testid="AuthenticationPrompt"
    >
      {isLoggingIn && <div className={styles.status}>Logging in...</div>}
      {!isLoggingIn && (
        <div>
          {loginError && (
            <div className={styles.status}>
              Login failed. You must be a member to login.
            </div>
          )}
          {!loginError && (
            <div>
              {isLoggedIn && (
                <div className={styles.status}>
                  You are now logged in! Thank you for being a member.
                </div>
              )}
              {!isLoggedIn && (
                <div className={styles.status}>You are not logged in.</div>
              )}
            </div>
          )}
        </div>
      )}
      {!isLoggedIn && !isLoggingIn && (
        <button className={styles.loginButton} onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
};

export default AuthenticationPrompt;
