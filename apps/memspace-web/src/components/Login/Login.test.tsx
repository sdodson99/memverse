import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { NonMemberError, useLogin } from '../../hooks/authentication/use-login';
import { useYouTubeLogin } from '../../hooks/authentication/use-youtube-login';
import { useRouter } from 'next/router';

jest.mock('../../hooks/authentication/use-login');
jest.mock('../../hooks/authentication/use-youtube-login');
jest.mock('next/router');

const mockUseLogin = useLogin as jest.Mock;
const mockUseYouTubeLogin = useYouTubeLogin as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe('<Login />', () => {
  let mockYouTubeLogin: jest.Mock;

  beforeEach(() => {
    mockYouTubeLogin = jest.fn();
    mockUseYouTubeLogin.mockReturnValue({ login: mockYouTubeLogin });
  });

  afterEach(() => {
    mockUseLogin.mockReset();
    mockUseYouTubeLogin.mockReset();
    mockUseRouter.mockReset();
  });

  it('should mount', () => {
    render(<Login />);

    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });

  describe('on login click', () => {
    let mockLogin: jest.Mock;

    beforeEach(() => {
      mockLogin = jest.fn();
      mockUseLogin.mockReturnValue(mockLogin);
    });

    describe('with successful login', () => {
      let mockRouterPush: jest.Mock;

      let accessToken: string;

      beforeEach(async () => {
        mockRouterPush = jest.fn();
        mockUseRouter.mockReturnValue({ push: mockRouterPush });

        accessToken = '123';
        mockYouTubeLogin.mockReturnValue(accessToken);

        render(<Login />);

        const loginButton = screen.getByTestId('YouTubeLoginButton');
        loginButton.click();
      });

      it('should login with YouTube access token', () => {
        expect(mockLogin).toBeCalledWith(accessToken);
      });

      it('should redirect to home page', () => {
        expect(mockRouterPush).toBeCalledWith('/');
      });
    });

    describe('with failed login', () => {
      const login = async () => {
        render(<Login />);
        const loginButton = screen.getByTestId('YouTubeLoginButton');
        loginButton.click();

        await waitForElementToBeRemoved(() =>
          screen.queryByTestId('LoadingSpinner')
        );
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

  describe('YouTube login initializing', () => {
    it('should render login button when not initializing', () => {
      mockUseYouTubeLogin.mockReturnValue({ isInitializing: false });
      render(<Login />);

      const loginButton = screen.queryByTestId('YouTubeLoginButton');

      expect(loginButton).toBeInTheDocument();
    });

    it('should not render login button when initializing', () => {
      mockUseYouTubeLogin.mockReturnValue({ isInitializing: true });
      render(<Login />);

      const loginButton = screen.queryByTestId('YouTubeLoginButton');

      expect(loginButton).not.toBeInTheDocument();
    });
  });
});
