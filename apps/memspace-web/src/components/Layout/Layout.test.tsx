import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from './Layout';
import { renderApp } from '../../test-utils/render-app';

describe('<Layout />', () => {
  it('should mount', () => {
    renderApp(<Layout>Page</Layout>);

    const layout = screen.getByTestId('Layout');

    expect(layout).toBeInTheDocument();
  });

  it('should render children', () => {
    renderApp(<Layout>Page</Layout>);

    const children = screen.getByText('Page');

    expect(children).toBeInTheDocument();
  });
});
