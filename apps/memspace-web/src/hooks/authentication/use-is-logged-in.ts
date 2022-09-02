import { useFirebaseAuthContext } from './firebase-auth/use-firebase-auth-context';

export const useIsLoggedIn = () => {
  const { currentUser } = useFirebaseAuthContext();

  return !!currentUser;
};
