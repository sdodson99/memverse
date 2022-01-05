import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { useMembers } from '../hooks/members/use-members';

const Space: NextPage = () => {
  const { members } = useMembers();

  return <Layout>You have {members.length} members.</Layout>;
};

export default Space;
