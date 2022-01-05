import { useAccessTokenContext } from './use-access-token-context';

export const useLogout = () => {
  const { clearAccessToken } = useAccessTokenContext();

  const logout = () => {
    clearAccessToken();
  };

  return logout;
};
