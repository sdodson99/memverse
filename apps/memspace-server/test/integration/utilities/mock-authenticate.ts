import { auth } from 'firebase-admin';
import { when } from 'jest-when';

jest.mock('firebase-admin', () => ({
  ...jest.requireActual('firebase-admin'),
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

let mockVerifyIdToken: jest.Mock;

beforeEach(() => {
  mockVerifyIdToken = jest.fn();

  mockFirebaseAuth.mockReturnValue({
    verifyIdToken: mockVerifyIdToken,
  });
});

afterEach(() => {
  mockFirebaseAuth.mockReset();
});

export const mockAuthenticate = (
  token: string,
  userResponse: unknown = { uid: '123' }
) => {
  when(mockVerifyIdToken).calledWith(token).mockReturnValue(userResponse);
};
