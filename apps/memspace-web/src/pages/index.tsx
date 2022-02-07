import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { useMembers } from '../hooks/members/use-members';
import SpaceCanvas from '../components/SpaceCanvas/SpaceCanvas';

const SpacePage: NextPage = () => {
  const {
    members,
    loading: membersLoading,
    error: membersError,
  } = useMembers();

  const membersLoaded = !membersLoading && !membersError;

  return <Layout>{membersLoaded && <SpaceCanvas members={members} />}</Layout>;
};

export default SpacePage;
