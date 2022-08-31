import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '../components/PageLayout/PageLayout';
import Login from '../components/Login/Login';
import { GoogleIdentityServicesProvider } from '../hooks/authentication/google-identity-services/google-identity-services-provider';

const LoginPage: NextPage = () => {
  return (
    <PageLayout title="Login">
      <Head>
        <title>Login - Memspace</title>
      </Head>
      <GoogleIdentityServicesProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
        scope={'https://www.googleapis.com/auth/youtube.readonly'}
      >
        <Login />
      </GoogleIdentityServicesProvider>
    </PageLayout>
  );
};

export default LoginPage;
