import { auth } from 'firebase-admin';
import { when } from 'jest-when';
import { GenerateAccessTokenCommand } from '../generate-access-token-command';

jest.mock('firebase-admin', () => ({
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

describe('GenerateAccessTokenCommand', () => {
  let command: GenerateAccessTokenCommand;

  let mockAuthCreateCustomToken: jest.Mock;

  let uid: string;

  beforeEach(() => {
    command = new GenerateAccessTokenCommand();

    mockAuthCreateCustomToken = jest.fn();
    mockFirebaseAuth.mockReturnValue({
      createCustomToken: mockAuthCreateCustomToken,
    });

    uid = '123';
  });

  afterEach(() => {
    mockFirebaseAuth.mockReset();
  });

  it('should return custom token for user', async () => {
    const expectedToken = 'token123';
    when(mockAuthCreateCustomToken)
      .calledWith(uid)
      .mockReturnValue(expectedToken);

    const actualToken = await command.execute(uid);

    expect(actualToken).toBe(expectedToken);
  });
});
