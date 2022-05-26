import { Member } from '../../models/member';
import { useQuery } from 'react-query';
import { useFetcher } from '../use-fetcher';

export const useMembers = () => {
  const fetcher = useFetcher();

  const {
    data: members,
    error,
    isLoading: loading,
  } = useQuery(['members'], async () => {
    const { data } = await fetcher.get<Member[]>(
      `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/members`
    );

    return data;
  });

  return {
    members: members ?? [],
    loading,
    error,
  };
};
