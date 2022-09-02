import { useFetcher } from '../use-fetcher';

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

  const login = async (youTubeAccessToken: string) => {
    try {
      const { data } = await fetcher.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`,
        {
          accessToken: youTubeAccessToken,
        }
      );

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
