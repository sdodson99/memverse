import axios from 'axios';
import { useEffect, useState } from 'react';

type Member = {
  id: string;
  username: string;
  photoUrl: string;
  message: string;
};

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      setError(null);
      setMembers([]);

      try {
        const { data } = await axios.get<Member[]>(
          `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/members`
        );

        setMembers(data);
      } catch (error: any) {
        setError(error);
      }

      setLoading(false);
    }

    fetchMembers();
  }, []);

  return {
    members,
    loading,
    error,
  };
};
