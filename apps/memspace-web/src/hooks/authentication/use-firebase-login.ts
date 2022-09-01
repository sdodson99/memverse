import { useFirebaseAuthContext } from './firebase-auth/use-firebase-auth-context';

export const useFirebaseLogin = () => {
  const { signInWithCustomToken } = useFirebaseAuthContext();

  const login = async (firebaseToken: string) => {
    await signInWithCustomToken(firebaseToken);
  };

  return { login };
};
