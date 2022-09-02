import { useFirebaseAuthContext } from '../authentication/firebase-auth/use-firebase-auth-context';
import { useQuery } from 'react-query';
import { useFetcher } from '../use-fetcher';

type MessageResponse = {
  content: string;
};

export const useMemberMessage = () => {
  const { currentUser, getIdToken } = useFirebaseAuthContext();
  const fetcher = useFetcher();

  const {
    data: message,
    error,
    isLoading: loading,
  } = useQuery(['account/message', { id: currentUser?.id }], async () => {
    const token = await getIdToken();

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
