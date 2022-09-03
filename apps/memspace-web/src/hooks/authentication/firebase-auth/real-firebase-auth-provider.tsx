import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  FirebaseAuthContext,
  FirebaseAuth,
  User,
} from './use-firebase-auth-context';
import {
  getAuth,
  signInWithCustomToken as signInWithCustomTokenBase,
  getIdToken as getIdTokenBase,
  signOut as signOutBase,
  User as FirebaseUser,
} from 'firebase/auth';
import { useFirebaseContext } from '../../use-firebase-context';

export type RealFirebaseAuthProviderProps = {
  children?: ReactNode;
};

export const RealFirebaseAuthProvider = ({
  children,
}: RealFirebaseAuthProviderProps) => {
  const { app } = useFirebaseContext();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    if (!app) {
      return;
    }

    const unsubscribe = getAuth().onIdTokenChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [app]);

  const signInWithCustomToken = async (customToken: string) => {
    const auth = getAuth();

    await signInWithCustomTokenBase(auth, customToken);
  };

  const getIdToken = async (): Promise<string | null> => {
    if (!currentUser) {
      return null;
    }

    return getIdTokenBase(currentUser);
  };

  const signOut = useCallback(async () => {
    const auth = getAuth();

    await signOutBase(auth);
  }, []);

  const toUser = (firebaseUser: FirebaseUser | null): User | null => {
    if (!firebaseUser) {
      return null;
    }

    return {
      id: firebaseUser.uid,
    };
  };

  const realFirebaseAuth: FirebaseAuth = {
    signInWithCustomToken,
    getIdToken,
    signOut,
    currentUser: toUser(currentUser),
  };

  return (
    <FirebaseAuthContext.Provider value={realFirebaseAuth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
