import { createContext, useContext } from 'react';

export type User = {
  id: string;
};

export type FirebaseAuth = {
  signInWithCustomToken: (customToken: string) => Promise<void>;
  getIdToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
  currentUser: User | null;
};

export const FirebaseAuthContext = createContext<FirebaseAuth>({
  signInWithCustomToken: async (_: string) => {
    return;
  },
  getIdToken: async () => null,
  signOut: async () => {
    return;
  },
  currentUser: null,
});

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext);
