import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '../components/PageLayout/PageLayout';
import Login from '../components/Login/Login';

const LoginPage: NextPage = () => {
  return (
    <PageLayout title="Login">
      <Head>
        <title>Login - Memspace</title>
      </Head>
      <Login />
    </PageLayout>
  );
};

export default LoginPage;
