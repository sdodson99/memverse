import React from 'react';
import type { NextPage } from 'next';
import AuthenticationPrompt from '../components/AuthenticationPrompt/AuthenticationPrompt';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Login - Memspace</title>
      </Head>
      <AuthenticationPrompt />
    </Layout>
  );
};

export default Login;
