import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { useMembers } from '../hooks/members/use-members';
import Space from '../components/Space/Space';
import LoadingErrorEmptyDataLayout from '../components/LoadingErrorEmptyDataLayout/LoadingErrorEmptyDataLayout';
import SpaceLoading from '../components/SpaceLoading/SpaceLoading';

const SpacePage: NextPage = () => {
  const {
    members,
    loading: membersLoading,
    error: membersError,
  } = useMembers();

  return (
    <Layout>
      <LoadingErrorEmptyDataLayout
        isLoading={membersLoading}
        loadingDisplay={<SpaceLoading />}
        hasError={!!membersError}
        errorDisplay={'Error'}
        dataDisplay={<Space members={members} />}
      />
    </Layout>
  );
};

export default SpacePage;
