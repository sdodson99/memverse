import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Link from './Link';
import { renderApp } from '../../test-utils/render-app';

describe('<Link />', () => {
  it('should not append mock tag if no mock available', () => {
    renderApp(<Link href={{ pathname: '/' }}>Test</Link>);

    const link = screen.getByText('Test');

    expect(link.getAttribute('href')).toBe('/');
  });

  it('should append mock tag if mock available', () => {
    renderApp(
      <Link href={{ pathname: '/', query: { success: true } }}>Test</Link>,
      {
        mockTag: 'base-mock',
      }
    );

    const link = screen.getByText('Test');

    expect(link.getAttribute('href')).toBe('/?success=true&mock=base-mock');
  });
});
