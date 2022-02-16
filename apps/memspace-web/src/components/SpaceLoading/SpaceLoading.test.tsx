import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceLoading from './SpaceLoading';

describe('<SpaceLoading />', () => {
  it('should mount', () => {
    render(<SpaceLoading />);

    const spaceLoading = screen.getByTestId('SpaceLoading');

    expect(spaceLoading).toBeInTheDocument();
  });

  it('should render loading spinner', () => {
    render(<SpaceLoading />);

    const spinner = screen.getByTestId('LoadingSpinner');

    expect(spinner).toBeInTheDocument();
  });

  it('should render loading description', () => {
    render(<SpaceLoading />);

    const description = screen.getByText('Loading members...');

    expect(description).toBeInTheDocument();
  });
});
