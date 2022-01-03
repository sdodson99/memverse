import React from 'react';
import { useGoogleAuth, useGoogleUser } from 'react-gapi-auth2';
import styles from './AuthenticationPrompt.module.css';

type AuthenticationPromptProps = {};

const AuthenticationPrompt = ({}: AuthenticationPromptProps) => {
  const loggedInUserValue = useGoogleUser();
  const auth = useGoogleAuth();

  const handleLoginClick = async () => {
    const user = await auth.googleAuth?.signIn();
    const authResponse = user?.getAuthResponse();

    const accessToken = authResponse?.access_token;
    console.log(accessToken);
  };

  const isLoggedIn = loggedInUserValue.currentUser !== null;

  return (
    <div
      className={styles.authenticationPrompt}
      data-testid="AuthenticationPrompt"
    >
      {isLoggedIn && (
        <div className={styles.status}>
          You are now logged in! Thank you for being a member.
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <div className={styles.status}>You are not logged in.</div>
          <button className={styles.loginButton} onClick={handleLoginClick}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPrompt;
