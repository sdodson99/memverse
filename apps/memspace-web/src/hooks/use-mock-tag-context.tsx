import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { isProduction } from '../configuration';

const MockTagContext = createContext<string | null | undefined>(undefined);

type MockTagProviderProps = {
  children: React.ReactNode;
};

export const MockTagProvider = ({ children }: MockTagProviderProps) => {
  const { query, isReady } = useRouter();

  const mockingEnabled = !isProduction();
  const mockTagLoading = !isReady;

  const getMockTag = () => {
    if (!mockingEnabled) {
      return null;
    }

    return query['mock']?.toString().toLowerCase() ?? null;
  };

  if (mockingEnabled && mockTagLoading) {
    return null;
  }

  return (
    <MockTagContext.Provider value={getMockTag()}>
      {children}
    </MockTagContext.Provider>
  );
};

export const useMockTagContext = () => useContext(MockTagContext);
