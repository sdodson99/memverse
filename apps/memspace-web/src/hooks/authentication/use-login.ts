import axios from 'axios';
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

  const login = async (youTubeAccessToken: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(
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
