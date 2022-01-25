import React from 'react';
import type { NextPage } from 'next';
import AuthenticationPrompt from '../components/AuthenticationPrompt/AuthenticationPrompt';
import Layout from '../components/Layout/Layout';

const Login: NextPage = () => {
  return (
    <Layout>
      <AuthenticationPrompt />
    </Layout>
  );
};

export default Login;
