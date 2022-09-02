import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceLayout from './SpaceLayout';
import { renderApp } from '../../test-utils/render-app';

describe('<SpaceLayout />', () => {
  it('should render children', () => {
    renderApp(<SpaceLayout>hello world</SpaceLayout>);

    const content = screen.getByText('hello world');

    expect(content).toBeInTheDocument();
  });
});
