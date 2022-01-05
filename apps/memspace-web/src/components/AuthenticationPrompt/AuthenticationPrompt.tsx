import React, { useState } from 'react';
import { useGoogleAuth } from 'react-gapi-auth2';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { useLogin } from '../../hooks/authentication/use-login';
import { useLogout } from '../../hooks/authentication/use-logout';
import styles from './AuthenticationPrompt.module.css';

type AuthenticationPromptProps = {};

const AuthenticationPrompt = ({}: AuthenticationPromptProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);

  const isLoggedIn = useIsLoggedIn();
  const login = useLogin();
  const logout = useLogout();
  const auth = useGoogleAuth();

  const handleLoginClick = async () => {
    setHasLoginError(false);
    setIsLoggingIn(true);

    try {
      const user = await auth.googleAuth?.signIn();
      const authResponse = user?.getAuthResponse();

      const accessToken = authResponse?.access_token;

      if (!accessToken) {
        return;
      }

      await login(accessToken);
    } catch (error) {
      setHasLoginError(true);
    }

    setIsLoggingIn(false);
  };

  const handleLogoutClick = () => logout();

  return (
    <div
      className={styles.authenticationPrompt}
      data-testid="AuthenticationPrompt"
    >
      {isLoggingIn && <div className={styles.status}>Logging in...</div>}
      {!isLoggingIn && (
        <div>
          {hasLoginError && (
            <div className={styles.status}>
              Login failed. You must be a member to login.
            </div>
          )}
          {!hasLoginError && (
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
        <button
          className={styles.authenticationButton}
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
      {isLoggedIn && (
        <button
          className={styles.authenticationButton}
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthenticationPrompt;
