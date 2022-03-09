import { Account } from '../../models/account';
import { useAccessTokenContext } from './use-access-token-context';
import { useIsLoggedIn } from './use-is-logged-in';
import axios from 'axios';
import constate from 'constate';
import { useQuery } from 'react-query';

const useAccount = () => {
  const { token } = useAccessTokenContext();
  const isLoggedIn = useIsLoggedIn();

  const {
    data: account,
    error,
    isLoading: loading,
  } = useQuery(['account', { token, isLoggedIn }], async () => {
    if (!isLoggedIn) {
      return null;
    }

    const { data } = await axios.get<Account>(
      `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  });

  return {
    account,
    loading,
    error,
  };
};

const [AccountProvider, useAccountContext] = constate(useAccount);
export { AccountProvider, useAccountContext };
