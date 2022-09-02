import { useFirebaseAuthContext } from './firebase-auth/use-firebase-auth-context';

export const useLogout = () => {
  const { signOut } = useFirebaseAuthContext();

  const logout = () => {
    return signOut();
  };

  return logout;
};
