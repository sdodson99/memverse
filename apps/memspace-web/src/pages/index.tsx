import type { NextPage } from 'next';
import AuthenticationPrompt from '../components/AuthenticationPrompt/AuthenticationPrompt';
import Layout from '../components/Layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <AuthenticationPrompt />
    </Layout>
  );
};

export default Home;
