import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceError from './SpaceError';

describe('<SpaceError />', () => {
  it('should mount', () => {
    render(<SpaceError />);

    const spaceError = screen.getByTestId('SpaceError');

    expect(spaceError).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(<SpaceError />);

    const errorMessage = screen.getByText(
      'Failed to load members. Please refresh to try again.'
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
