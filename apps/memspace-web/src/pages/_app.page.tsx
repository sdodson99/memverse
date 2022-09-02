import '../styles/globals.css';
import 'react-spring-bottom-sheet/dist/style.css';
import React from 'react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { FirebaseProvider } from '../hooks/use-firebase-context';
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
              <QueryClientProvider client={queryClient}>
                <Head>
                  <title>Memspace</title>
                </Head>
                <Component {...pageProps} />
              </QueryClientProvider>
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
