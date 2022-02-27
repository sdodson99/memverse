import '../styles/globals.css';
import 'react-spring-bottom-sheet/dist/style.css';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { GApiProvider } from 'react-gapi-auth2';
import { AccessTokenProvider } from '../hooks/authentication/use-access-token-context';
import Head from 'next/head';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { AccountProvider } from '../hooks/authentication/use-account-context';

const googleClientConfig = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  scope: 'https://www.googleapis.com/auth/youtube.readonly',
};

const firebaseConfig = {
  apiKey: 'AIzaSyDxXUSxSLuzKFuEhACAGtuvYZC-nTf70l0',
  authDomain: 'memverse.firebaseapp.com',
  databaseURL: 'https://memverse-default-rtdb.firebaseio.com',
  projectId: 'memverse',
  storageBucket: 'memverse.appspot.com',
  messagingSenderId: '645429020198',
  appId: '1:645429020198:web:56cdb892fda7c4c8e088e7',
  measurementId: 'G-R4HBRGPMS3',
};

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeApp(firebaseConfig);
    getAnalytics();
  }, []);

  return (
    <GApiProvider clientConfig={googleClientConfig}>
      <AccessTokenProvider>
        <AccountProvider>
          <Head>
            <title>Memspace</title>
          </Head>
          <Component {...pageProps} />
        </AccountProvider>
      </AccessTokenProvider>
    </GApiProvider>
  );
}

export default App;
