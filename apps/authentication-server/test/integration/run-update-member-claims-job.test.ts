import { auth } from 'firebase-admin';
import { YouTubeMembersQuery } from 'youtube-member-querier';
import { setupFirebase } from './utilities';
import { CloudFunction } from 'firebase-functions/v1';

const functionsTest = setupFirebase();

jest.mock('youtube-member-querier');
const mockYouTubeMembersQuery = YouTubeMembersQuery as jest.Mock;

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(),
}));
const mockFirebaseAuth = auth as jest.Mock;

describe('RUN update member claims job', () => {
  let mockYouTubeMembersQueryExecute: jest.Mock;
  let mockGetUsers: jest.Mock;
  let mockSetCustomUserClaims: jest.Mock;
  let job: CloudFunction<unknown>;

  beforeAll(() => {
    mockYouTubeMembersQueryExecute = jest.fn();
    mockYouTubeMembersQuery.mockReturnValue({
      execute: mockYouTubeMembersQueryExecute,
    });

    mockGetUsers = jest.fn();
    mockSetCustomUserClaims = jest.fn();
    mockFirebaseAuth.mockReturnValue({
      getUsers: mockGetUsers,
      setCustomUserClaims: mockSetCustomUserClaims,
    });

    job = require('../../src/index').updateMemberClaimsJobFunction;
  });

  afterEach(() => {
    mockYouTubeMembersQuery.mockReset();
    mockFirebaseAuth.mockReset();

    functionsTest.cleanup();
  });

  it('should update claims of each existing member user', async () => {
    mockYouTubeMembersQueryExecute.mockReturnValue([
      {
        id: 'channel-1',
      },
      {
        id: 'channel-2',
      },
    ]);
    mockGetUsers.mockImplementation((identifiers) => ({
      users: identifiers,
    }));

    const runJob = functionsTest.wrap(job);

    await runJob({});

    expect(mockSetCustomUserClaims).toBeCalledTimes(2);
  });
});
