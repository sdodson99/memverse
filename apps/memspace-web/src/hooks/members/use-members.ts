import axios from 'axios';
import { Member } from '../../models/member';
import { useQuery } from 'react-query';

export const useMembers = () => {
  const {
    data: members,
    error,
    isLoading: loading,
  } = useQuery(['members'], async () => {
    const { data } = await axios.get<Member[]>(
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
