import React, { ReactNode } from 'react';
import { FirebaseAuthContext, FirebaseAuth } from './use-firebase-auth-context';
import {
  getAuth,
  signInWithCustomToken as signInWithCustomTokenBase,
} from 'firebase/auth';

export type RealFirebaseAuthProviderProps = {
  children?: ReactNode;
};

export const RealFirebaseAuthProvider = ({
  children,
}: RealFirebaseAuthProviderProps) => {
  const signInWithCustomToken = async (customToken: string) => {
    const auth = getAuth();

    await signInWithCustomTokenBase(auth, customToken);
  };

  const realFirebaseAuth: FirebaseAuth = {
    signInWithCustomToken,
  };

  return (
    <FirebaseAuthContext.Provider value={realFirebaseAuth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
