import React, { ReactNode } from 'react';
import { FirebaseAuthContext, FirebaseAuth } from './use-firebase-auth-context';

type MockFirebaseAuthProviderProps = {
  children?: ReactNode;
};

export const MockFirebaseAuthProvider = ({
  children,
}: MockFirebaseAuthProviderProps) => {
  const mockFirebaseAuth: FirebaseAuth = {
    signInWithCustomToken: async (_customToken: string) => {
      return;
    },
  };

  return (
    <FirebaseAuthContext.Provider value={mockFirebaseAuth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
