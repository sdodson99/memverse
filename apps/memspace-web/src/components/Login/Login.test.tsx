import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { NonMemberError } from '../../hooks/authentication/use-application-login';
import { useLogin } from '../../hooks/authentication/use-login';
import { useRouter } from 'next/router';

jest.mock('../../hooks/authentication/use-login');
jest.mock('next/router');

const mockUseLogin = useLogin as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe('<Login />', () => {
  let mockLogin: jest.Mock;

  beforeEach(() => {
    mockLogin = jest.fn();
    mockUseLogin.mockReturnValue({ login: mockLogin });
  });

  afterEach(() => {
    mockUseLogin.mockReset();
    mockUseRouter.mockReset();
  });

  it('should mount', () => {
    render(<Login />);

    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });

  describe('on login click', () => {
    describe('with successful login', () => {
      let mockRouterPush: jest.Mock;

      beforeEach(async () => {
        mockRouterPush = jest.fn();
        mockUseRouter.mockReturnValue({ push: mockRouterPush });

        render(<Login />);

        const loginButton = screen.getByTestId('YouTubeLoginButton');
        await act(async () => {
          loginButton.click();
        });
      });

      it('should login', () => {
        expect(mockLogin).toBeCalled();
      });

      it('should redirect to home page', () => {
        expect(mockRouterPush).toBeCalledWith({ pathname: '/' });
      });
    });

    describe('with failed login', () => {
      const login = async () => {
        render(<Login />);
        const loginButton = screen.getByTestId('YouTubeLoginButton');

        await act(async () => {
          loginButton.click();
        });
      };

      it('should display error message for NonMemberError', async () => {
        mockLogin.mockImplementation(() => {
          throw new NonMemberError();
        });
        await login();

        const errorMessage = screen.getByTestId('NonMemberLoginErrorMessage');

        expect(errorMessage).toBeInTheDocument();
      });

      it('should display error message for unknown error', async () => {
        mockLogin.mockImplementation(() => {
          throw new Error();
        });
        await login();

        const errorMessage = screen.getByTestId('UnknownLoginErrorMessage');

        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('login initializing', () => {
    it('should render login button when not initializing', () => {
      mockUseLogin.mockReturnValue({ isInitializing: false });
      render(<Login />);

      const loginButton = screen.queryByTestId('YouTubeLoginButton');

      expect(loginButton).toBeInTheDocument();
    });

    it('should not render login button when initializing', () => {
      mockUseLogin.mockReturnValue({ isInitializing: true });
      render(<Login />);

      const loginButton = screen.queryByTestId('YouTubeLoginButton');

      expect(loginButton).not.toBeInTheDocument();
    });
  });
});
