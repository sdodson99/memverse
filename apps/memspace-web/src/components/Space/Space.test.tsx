import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Space from './Space';
import { AccessTokenProvider } from '../../hooks/authentication/use-access-token-context';

jest.mock('@psychobolt/react-paperjs');

describe('<Space />', () => {
  it('should mount', () => {
    render(<Space members={[]} />, { wrapper: AccessTokenProvider });

    const space = screen.getByTestId('Space');

    expect(space).toBeInTheDocument();
  });
});
