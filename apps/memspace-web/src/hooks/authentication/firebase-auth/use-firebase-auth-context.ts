import { createContext, useContext } from 'react';

export type FirebaseAuth = {
  signInWithCustomToken: (customToken: string) => Promise<void>;
};

export const FirebaseAuthContext = createContext<FirebaseAuth>({
  signInWithCustomToken: async (_: string) => {
    return;
  },
});

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext);
