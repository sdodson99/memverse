import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from './Layout';
import { AccessTokenProvider } from '../../hooks/authentication/use-access-token-context';

describe('<Layout />', () => {
  it('should mount', () => {
    render(<Layout>Page</Layout>, { wrapper: AccessTokenProvider });

    const layout = screen.getByTestId('Layout');

    expect(layout).toBeInTheDocument();
  });

  it('should render children', () => {
    render(<Layout>Page</Layout>, { wrapper: AccessTokenProvider });

    const children = screen.getByText('Page');

    expect(children).toBeInTheDocument();
  });
});
