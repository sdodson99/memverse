import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceToolbar from './SpaceToolbar';

describe('<SpaceToolbar />', () => {
  it('should mount', () => {
    render(<SpaceToolbar />);

    const spaceToolbar = screen.getByTestId('SpaceToolbar');

    expect(spaceToolbar).toBeInTheDocument();
  });
});
