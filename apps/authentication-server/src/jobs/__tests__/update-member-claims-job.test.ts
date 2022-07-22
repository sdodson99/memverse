import { YouTubeMembersQuery } from 'youtube-member-querier';
import { UpdateMemberClaimsJob } from '../update-member-claims-job';
import functions from 'firebase-functions';

describe('UpdateMemberClaimsJob', () => {
  let job: UpdateMemberClaimsJob;

  let mockYouTubeMembersQueryExecute: jest.Mock;
  let mockGetExistingUsersQueryExecute: jest.Mock;
  let mockUpdateUserClaimsCommandExecute: jest.Mock;

  beforeEach(() => {
    mockYouTubeMembersQueryExecute = jest.fn();
    const youTubeMembersQuery = {
      execute: mockYouTubeMembersQueryExecute,
    } as unknown as YouTubeMembersQuery;

    mockGetExistingUsersQueryExecute = jest.fn();
    const getExistingUsersQuery = {
      execute: mockGetExistingUsersQueryExecute,
    };

    mockUpdateUserClaimsCommandExecute = jest.fn();
    const updateUserClaimsCommand = {
      execute: mockUpdateUserClaimsCommandExecute,
    };

    job = new UpdateMemberClaimsJob(
      youTubeMembersQuery,
      getExistingUsersQuery,
      updateUserClaimsCommand,
      functions.logger
    );
  });

  it('should update claims for each member', async () => {
    const members = [
      {
        channelId: 'channel1',
      },
      {
        channelId: 'channel2',
      },
      {
        channelId: 'channel3',
      },
    ];
    mockYouTubeMembersQueryExecute.mockReturnValue(members);
    mockGetExistingUsersQueryExecute.mockImplementation((ids) =>
      ids.map((i: string) => ({ uid: i }))
    );

    await job.run();

    expect(mockUpdateUserClaimsCommandExecute).toBeCalledTimes(3);
    expect(mockUpdateUserClaimsCommandExecute.mock.calls[0][0]).toBe(
      'channel1'
    );
    expect(
      mockUpdateUserClaimsCommandExecute.mock.calls[0][1].memberAsOf
    ).toBeDefined();
  });
});
