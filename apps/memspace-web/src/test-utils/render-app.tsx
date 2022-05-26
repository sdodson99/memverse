import React from 'react';
import { render } from '@testing-library/react';
import { AccessTokenProvider } from '../hooks/authentication/use-access-token-context';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { MockTagProvider } from '../hooks/use-mock-tag-context';
import { useRouter } from 'next/router';

const mockUseRouter = useRouter as jest.Mock;

type TestAppProps = {
  children: React.ReactNode;
};

export const TestApp = ({ children }: TestAppProps) => {
  return (
    <MockTagProvider>
      <RecoilRoot>
        <ChakraProvider>
          <AccessTokenProvider>
            <QueryClientProvider client={new QueryClient()}>
              {children}
            </QueryClientProvider>
          </AccessTokenProvider>
        </ChakraProvider>
      </RecoilRoot>
    </MockTagProvider>
  );
};

type AppOptions = {
  mockTag?: string;
};

export const setupApp = (options?: AppOptions) => {
  if (options?.mockTag) {
    mockUseRouter.mockReturnValue({
      isReady: true,
      query: {
        mock: options.mockTag,
      },
    });
  }
};

export const renderApp = (
  component: React.ReactNode,
  appOptions?: AppOptions
) => {
  setupApp(appOptions);

  render(<TestApp>{component}</TestApp>);
};
