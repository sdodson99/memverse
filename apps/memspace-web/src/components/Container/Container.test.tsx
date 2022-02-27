import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Container from './Container';

describe('<Container />', () => {
  it('should mount with content', () => {
    render(<Container>hello world</Container>);

    const content = screen.getByText('hello world');

    expect(content).toBeInTheDocument();
  });
});
