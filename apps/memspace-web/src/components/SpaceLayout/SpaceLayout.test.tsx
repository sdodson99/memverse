import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceLayout from './SpaceLayout';
import { AccessTokenProvider } from '../../hooks/authentication/use-access-token-context';

describe('<SpaceLayout />', () => {
  it('should render children', () => {
    render(<SpaceLayout>hello world</SpaceLayout>, {
      wrapper: AccessTokenProvider,
    });

    const content = screen.getByText('hello world');

    expect(content).toBeInTheDocument();
  });
});
