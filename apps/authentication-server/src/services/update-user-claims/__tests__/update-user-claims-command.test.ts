import {
  UpdateUserClaimsCommand,
  UserClaims,
} from '../update-user-claims-command';
import { auth } from 'firebase-admin';

jest.mock('firebase-admin', () => ({
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

describe('UpdateUserClaimsCommand', () => {
  let command: UpdateUserClaimsCommand;

  let mockAuthSetCustomUserClaims: jest.Mock;

  let uid: string;
  let claims: UserClaims;

  beforeEach(() => {
    command = new UpdateUserClaimsCommand();

    mockAuthSetCustomUserClaims = jest.fn();
    mockFirebaseAuth.mockReturnValue({
      setCustomUserClaims: mockAuthSetCustomUserClaims,
    });

    uid = '123';
    claims = {
      memberAsOf: 1,
    };
  });

  afterEach(() => {
    mockFirebaseAuth.mockReset();
  });

  it('should update user claims', async () => {
    await command.execute(uid, claims);

    expect(mockAuthSetCustomUserClaims).toBeCalledWith(uid, claims);
  });
});
