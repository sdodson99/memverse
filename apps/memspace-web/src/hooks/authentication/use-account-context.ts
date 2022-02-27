import { useEffect, useState } from 'react';
import { Account } from '../../models/account';
import { useAccessTokenContext } from './use-access-token-context';
import { useIsLoggedIn } from './use-is-logged-in';
import axios from 'axios';
import constate from 'constate';

const useAccount = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAccessTokenContext();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      return setAccount(null);
    }

    async function fetchAccount() {
      setLoading(true);
      setError(null);
      setAccount(null);

      try {
        const { data } = await axios.get<Account>(
          `${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setAccount(data);
      } catch (error: any) {
        setError(error);
      }

      setLoading(false);
    }

    fetchAccount();
  }, [token, isLoggedIn]);

  return {
    account,
    loading,
    error,
  };
};

const [AccountProvider, useAccountContext] = constate(useAccount);
export { AccountProvider, useAccountContext };
