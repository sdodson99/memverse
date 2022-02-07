import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Space from './Space';

describe('<Space />', () => {
  it('should mount', () => {
    render(<Space members={[]} />);

    const space = screen.getByTestId('Space');

    expect(space).toBeInTheDocument();
  });
});
