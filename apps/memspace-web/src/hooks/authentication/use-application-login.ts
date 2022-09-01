import { useFetcher } from '../use-fetcher';
import { useAccessTokenContext } from './use-access-token-context';

type LoginResponse = {
  accessToken: string;
};

export class NonMemberError extends Error {
  constructor() {
    super();

    this.name = 'NonMemberError';
  }
}

export const useApplicationLogin = () => {
  const fetcher = useFetcher();
  const { setAccessToken } = useAccessTokenContext();

  const login = async (youTubeAccessToken: string) => {
    try {
      const { data } = await fetcher.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`,
        {
          accessToken: youTubeAccessToken,
        }
      );

      // TODO: Remove after Firebase migration
      setAccessToken({
        token: data.accessToken,
        expiresIn: 3600,
      });

      return data.accessToken;
    } catch (error) {
      if (error?.response?.status === 403) {
        throw new NonMemberError();
      }

      throw error;
    }
  };

  return { login };
};
