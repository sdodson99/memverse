import { CreateUserIfNotExistsCommand } from '../create-user-if-not-exists-command';
import * as functions from 'firebase-functions';
import { auth } from 'firebase-admin';
import { when } from 'jest-when';

jest.mock('firebase-admin', () => ({
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

describe('CreateUserIfNotExistsCommand', () => {
  let command: CreateUserIfNotExistsCommand;

  let mockAuthGetUsers: jest.Mock;
  let mockAuthCreateUser: jest.Mock;

  let uid: string;
  let displayName: string;
  let photoUrl: string;

  beforeEach(() => {
    command = new CreateUserIfNotExistsCommand({
      info: jest.fn(),
    } as unknown as typeof functions.logger);

    mockAuthGetUsers = jest.fn();
    mockAuthCreateUser = jest.fn();
    mockFirebaseAuth.mockReturnValue({
      getUsers: mockAuthGetUsers,
      createUser: mockAuthCreateUser,
    });

    uid = '123';
    displayName = 'displayName123';
    photoUrl = 'photoUrl123';
  });

  afterEach(() => {
    mockFirebaseAuth.mockReset();
  });

  it('should create user if user does not already exist', async () => {
    when(mockAuthGetUsers).calledWith([{ uid }]).mockReturnValue({ users: [] });

    await command.execute(uid, { displayName, photoUrl });

    expect(mockAuthCreateUser).toBeCalledWith({
      uid,
      displayName,
      photoURL: photoUrl,
    });
  });

  it('should not create user if user already exists', async () => {
    when(mockAuthGetUsers)
      .calledWith([{ uid }])
      .mockReturnValue({ users: ['1'] });

    await command.execute(uid, { displayName, photoUrl });

    expect(mockAuthCreateUser).not.toBeCalled();
  });
});
