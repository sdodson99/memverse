import '../styles/globals.css';
import 'react-spring-bottom-sheet/dist/style.css';
import React from 'react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { AccessTokenProvider } from '../hooks/authentication/use-access-token-context';
import Head from 'next/head';
import { FirebaseProvider } from '../hooks/use-firebase-context';
import { AccountProvider } from '../hooks/authentication/use-account-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import { MockTagProvider } from '../hooks/use-mock-tag-context';
import { FirebaseAuthProvider } from '../hooks/authentication/firebase-auth/firebase-auth-provider';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <MockTagProvider>
      <FirebaseProvider>
        <FirebaseAuthProvider>
          <RecoilRoot>
            <ChakraProvider>
              <AccessTokenProvider>
                <QueryClientProvider client={queryClient}>
                  <AccountProvider>
                    <Head>
                      <title>Memspace</title>
                    </Head>
                    <Component {...pageProps} />
                  </AccountProvider>
                </QueryClientProvider>
              </AccessTokenProvider>
            </ChakraProvider>
          </RecoilRoot>
        </FirebaseAuthProvider>
      </FirebaseProvider>
    </MockTagProvider>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default App;
