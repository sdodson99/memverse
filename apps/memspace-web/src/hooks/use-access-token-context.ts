import constate from 'constate';
import { useState } from 'react';
import { DateTime } from 'luxon';

type AccessTokenState = {
  token: string;
  expiresAt: DateTime;
};

type AccessToken = {
  token: string;
  expiresIn: number;
};

const useAccessToken = () => {
  const [accessTokenState, setAccessTokenState] = useState<AccessTokenState>();

  const setAccessToken = (accessToken: AccessToken) => {
    const expiresAt = DateTime.now().plus({ seconds: accessToken.expiresIn });

    setAccessTokenState({
      token: accessToken.token,
      expiresAt,
    });
  };

  const clearAccessToken = () => setAccessTokenState(undefined);

  const isExpired = () => {
    if (!accessTokenState) {
      return false;
    }

    return accessTokenState.expiresAt < DateTime.now();
  };

  return {
    token: accessTokenState?.token,
    hasToken: !!accessTokenState?.token,
    isExpired,
    setAccessToken,
    clearAccessToken,
  };
};

const [AccessTokenProvider, useAccessTokenContext] = constate(useAccessToken);

export { AccessTokenProvider, useAccessTokenContext };
