import React from 'react';
import { render } from '@testing-library/react';
import { AccessTokenProvider } from '../hooks/authentication/use-access-token-context';

type TestAppProps = {
  children: React.ReactNode;
};

export const TestApp = ({ children }: TestAppProps) => {
  return <AccessTokenProvider>{children}</AccessTokenProvider>;
};

export const renderApp = (component: React.ReactNode) => {
  render(<TestApp>{component}</TestApp>);
};
