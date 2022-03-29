import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from '../login.page';
import { renderApp } from '../../test-utils/render-app';

describe('<LoginPage />', () => {
  it('should mount', () => {
    renderApp(<LoginPage />);

    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});
