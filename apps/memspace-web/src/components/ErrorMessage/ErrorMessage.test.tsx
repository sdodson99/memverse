import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('should mount', () => {
    render(<ErrorMessage>test</ErrorMessage>);

    const errorMessage = screen.getByTestId('ErrorMessage');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render content', () => {
    render(<ErrorMessage>content</ErrorMessage>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });
});
