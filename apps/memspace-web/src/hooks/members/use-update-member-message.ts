import axios from 'axios';
import { useState } from 'react';
import { useAccessTokenContext } from '../authentication/use-access-token-context';

export const useUpdateMemberMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAccessTokenContext();

  const execute = async (message: string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.put(
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
    } catch (error: any) {
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
