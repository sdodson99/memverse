import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageHeader from './PageHeader';

describe('<PageHeader />', () => {
  it('should render children', () => {
    render(<PageHeader>Title</PageHeader>);

    const pageHeader = screen.getByText('Title');

    expect(pageHeader).toBeInTheDocument();
  });
});
