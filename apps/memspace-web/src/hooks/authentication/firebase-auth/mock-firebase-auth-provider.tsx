import React, { ReactNode, useState } from 'react';
import {
  FirebaseAuthContext,
  FirebaseAuth,
  User,
} from './use-firebase-auth-context';

type MockFirebaseAuthProviderProps = {
  children?: ReactNode;
};

export const MockFirebaseAuthProvider = ({
  children,
}: MockFirebaseAuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const mockFirebaseAuth: FirebaseAuth = {
    signInWithCustomToken: async (_customToken: string) =>
      setCurrentUser({
        id: '1',
      }),
    getIdToken: async () => 'mock-firebase-id-token',
    signOut: async () => {
      setCurrentUser(null);
    },
    currentUser,
  };

  return (
    <FirebaseAuthContext.Provider value={mockFirebaseAuth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
