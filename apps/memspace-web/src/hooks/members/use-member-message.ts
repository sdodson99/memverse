import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAccessTokenContext } from '../authentication/use-access-token-context';

type MessageResponse = {
  content: string;
};

export const useMemberMessage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAccessTokenContext();

  useEffect(() => {
    async function fetchMessage() {
      setLoading(true);
      setError(null);
      setMessage(null);

      try {
        const { data } = await axios.get<MessageResponse>(
          `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(data?.content ?? '');
      } catch (error: any) {
        setError(error);
      }

      setLoading(false);
    }

    fetchMessage();
  }, [token]);

  return {
    message,
    loading,
    error,
  };
};
