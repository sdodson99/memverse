import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';

jest.mock('../../hooks/authentication/use-is-logged-in');
const mockUseIsLoggedIn = useIsLoggedIn as jest.Mock;

jest.mock('../../hooks/authentication/use-logout');

describe('<Header />', () => {
  afterEach(() => {
    mockUseIsLoggedIn.mockReset();
  });

  it('should mount', () => {
    render(<Header />);

    const header = screen.getByTestId('Header');

    expect(header).toBeInTheDocument();
  });

  it('should render login button when not logged in', () => {
    mockUseIsLoggedIn.mockReturnValue(false);
    render(<Header />);

    const loginButton = screen.getByText('Login');

    expect(loginButton).toBeInTheDocument();
  });

  it('should render logout button when logged in', () => {
    mockUseIsLoggedIn.mockReturnValue(true);
    render(<Header />);

    const logoutButton = screen.getByText('Logout');

    expect(logoutButton).toBeInTheDocument();
  });
});
