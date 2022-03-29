import React from 'react';
import type { NextPage } from 'next';
import { useMembers } from '../hooks/members/use-members';
import Space from '../components/Space/Space';
import LoadingErrorEmptyDataLayout from '../components/LoadingErrorEmptyDataLayout/LoadingErrorEmptyDataLayout';
import SpaceLoading from '../components/SpaceLoading/SpaceLoading';
import SpaceError from '../components/SpaceError/SpaceError';
import Head from 'next/head';
import SpaceLayout from '../components/SpaceLayout/SpaceLayout';

const SpacePage: NextPage = () => {
  const {
    members,
    loading: membersLoading,
    error: membersError,
  } = useMembers();

  return (
    <SpaceLayout>
      <Head>
        <title>Home - Memspace</title>
      </Head>
      <LoadingErrorEmptyDataLayout
        isLoading={membersLoading}
        loadingDisplay={<SpaceLoading />}
        hasError={!!membersError}
        errorDisplay={<SpaceError />}
        dataDisplay={<Space members={members} />}
      />
    </SpaceLayout>
  );
};

export default SpacePage;
