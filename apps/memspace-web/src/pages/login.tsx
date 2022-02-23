import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '../components/PageLayout/PageLayout';

const Login: NextPage = () => {
  return (
    <PageLayout title="Login">
      <Head>
        <title>Login - Memspace</title>
      </Head>
      <div>
        Use a YouTube account to login to Memspace. You must be a member of the{' '}
        <a
          href="https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg/join"
          target="_blank"
          rel="noreferrer"
        >
          SingletonSean YouTube channel
        </a>{' '}
        in order to successfully login.
      </div>
    </PageLayout>
  );
};

export default Login;
