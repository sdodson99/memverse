import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { useMembers } from '../hooks/members/use-members';
import Space from '../components/Space/Space';

const SpacePage: NextPage = () => {
  const {
    members,
    loading: membersLoading,
    error: membersError,
  } = useMembers();

  const membersLoaded = !membersLoading && !membersError;

  return <Layout>{membersLoaded && <Space members={members} />}</Layout>;
};

export default SpacePage;
