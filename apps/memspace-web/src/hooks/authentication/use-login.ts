import axios from 'axios';
import { useFetcher } from '../use-fetcher';
import { useAccessTokenContext } from './use-access-token-context';

type LoginResponse = {
  token: string;
  expiresIn: number;
};

export class NonMemberError extends Error {
  constructor() {
    super();

    this.name = 'NonMemberError';
  }
}

export const useLogin = () => {
  const { setAccessToken } = useAccessTokenContext();
  const fetcher = useFetcher();

  const login = async (youTubeAccessToken: string) => {
    try {
      const { data } = await fetcher.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`,
        {
          accessToken: youTubeAccessToken,
        }
      );

      setAccessToken(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new NonMemberError();
        }
      }

      throw error;
    }
  };

  return login;
};
