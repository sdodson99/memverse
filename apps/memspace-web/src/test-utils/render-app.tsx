import React from 'react';
import { render } from '@testing-library/react';
import { AccessTokenProvider } from '../hooks/authentication/use-access-token-context';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';

type TestAppProps = {
  children: React.ReactNode;
};

export const TestApp = ({ children }: TestAppProps) => {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <AccessTokenProvider>
          <QueryClientProvider client={new QueryClient()}>
            {children}
          </QueryClientProvider>
        </AccessTokenProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export const renderApp = (component: React.ReactNode) => {
  render(<TestApp>{component}</TestApp>);
};
