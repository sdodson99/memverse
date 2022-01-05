import axios from 'axios';
import { useAccessTokenContext } from './use-access-token-context';

type LoginResponse = {
  token: string;
  expiresIn: number;
};

export const useLogin = () => {
  const { setAccessToken } = useAccessTokenContext();

  const login = async (youTubeAccessToken: string) => {
    const { data } = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`,
      {
        accessToken: youTubeAccessToken,
      }
    );

    setAccessToken(data);
  };

  return login;
};
