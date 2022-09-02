import { useState } from 'react';
import { useFirebaseAuthContext } from '../authentication/firebase-auth/use-firebase-auth-context';
import { useFetcher } from '../use-fetcher';

export const useUpdateMemberMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const { getIdToken } = useFirebaseAuthContext();
  const fetcher = useFetcher();

  const execute = async (message: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = await getIdToken();

      await fetcher.put(
        `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
        {
          content: message,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        error: null,
      };
    } catch (error: unknown) {
      setError(error);

      return {
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    error,
  };
};
