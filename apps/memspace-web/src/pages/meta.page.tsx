import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import pkg from '../../package.json';

const MetaPage: NextPage = () => {
  const { version } = pkg;

  return (
    <div>
      <Head>
        <title>Meta - Memspace</title>
      </Head>
      <div>Version: {version}</div>
    </div>
  );
};

export default MetaPage;
