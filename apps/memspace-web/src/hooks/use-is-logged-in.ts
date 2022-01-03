import { useAccessTokenContext } from './use-access-token-context';

export const useIsLoggedIn = () => {
  const { hasToken, isExpired } = useAccessTokenContext();

  const isLoggedIn = hasToken && !isExpired();

  return isLoggedIn;
};
