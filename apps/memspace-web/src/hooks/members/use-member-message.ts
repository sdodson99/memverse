import axios from 'axios';
import { useAccessTokenContext } from '../authentication/use-access-token-context';
import { useQuery } from 'react-query';

type MessageResponse = {
  content: string;
};

export const useMemberMessage = () => {
  const { token } = useAccessTokenContext();

  const {
    data: message,
    error,
    isLoading: loading,
  } = useQuery(['account/message', { token }], async () => {
    const { data } = await axios.get<MessageResponse>(
      `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data?.content ?? '';
  });

  return {
    message,
    loading,
    error,
  };
};
