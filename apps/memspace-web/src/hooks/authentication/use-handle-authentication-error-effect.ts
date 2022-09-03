import { useEffect } from 'react';
import { useNavigate } from '../use-navigate';
import { useFirebaseAuthContext } from './firebase-auth/use-firebase-auth-context';
import axios from 'axios';

export const useHandleAuthenticationErrorEffect = (
  error: Error | unknown | null
) => {
  const { signOut } = useFirebaseAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) {
      return;
    }

    if (!axios.isAxiosError(error)) {
      return;
    }

    const errorStatusCode = error?.response?.status;
    const isAuthenticationError =
      errorStatusCode === 401 || errorStatusCode === 403;

    if (!isAuthenticationError) {
      return;
    }

    const handleAuthenticationError = async () => {
      await signOut();
      await navigate({ pathname: '/login' });
    };

    handleAuthenticationError();
  }, [error, signOut, navigate]);
};
