import { useGoogleAuth } from 'react-gapi-auth2';

jest.mock('react-gapi-auth2');
const mockUseGoogleAuth = useGoogleAuth as jest.Mock;

beforeEach(() => {
  mockUseGoogleAuth.mockReturnValue({});
});

afterEach(() => {
  mockUseGoogleAuth.mockReset();
});

export { mockUseGoogleAuth };
