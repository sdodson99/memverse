import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Space from './Space';
import { renderApp } from '../../test-utils/render-app';

describe('<Space />', () => {
  it('should mount', () => {
    renderApp(<Space members={[]} />);

    const space = screen.getByTestId('Space');

    expect(space).toBeInTheDocument();
  });
});
