import { useAccessTokenContext } from '../authentication/use-access-token-context';
import { useQuery } from 'react-query';
import { useFetcher } from '../use-fetcher';

type MessageResponse = {
  content: string;
};

export const useMemberMessage = () => {
  const { token } = useAccessTokenContext();
  const fetcher = useFetcher();

  const {
    data: message,
    error,
    isLoading: loading,
  } = useQuery(['account/message', { token }], async () => {
    const { data } = await fetcher.get<MessageResponse>(
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
