import { GetExistingUsersQuery } from '../get-existing-users-query';
import { auth } from 'firebase-admin';

jest.mock('firebase-admin', () => ({
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

describe('GetExistingUsersQuery', () => {
  let query: GetExistingUsersQuery;

  let mockGetUsers: jest.Mock;

  beforeEach(() => {
    mockGetUsers = jest.fn();
    mockFirebaseAuth.mockReturnValue({
      getUsers: mockGetUsers,
    });

    query = new GetExistingUsersQuery();
  });

  it('should return found users by IDs', async () => {
    const userIds = ['1', '2', '3'];
    mockGetUsers.mockImplementation((identifiers) => ({
      users: identifiers,
    }));

    const actualUsers = await query.execute(userIds);

    expect(actualUsers).toHaveLength(3);
  });
});
