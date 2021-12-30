import { YouTubeMembersQuery } from '../../youtube-members';
import { IsYouTubeMemberQuery } from '../is-youtube-member-query';

describe('IsYouTubeMemberQuery', () => {
  let query: IsYouTubeMemberQuery;

  let mockExecuteYouTubeMembersQuery: jest.Mock;

  beforeEach(() => {
    mockExecuteYouTubeMembersQuery = jest.fn();
    const mockYouTubeMembersQuery = {
      execute: mockExecuteYouTubeMembersQuery,
    } as unknown as YouTubeMembersQuery;

    query = new IsYouTubeMemberQuery(mockYouTubeMembersQuery);
  });

  it('should return true if user is YouTube member', async () => {
    mockExecuteYouTubeMembersQuery.mockReturnValue([
      {
        channelId: '1',
      },
    ]);

    const isMember = await query.execute('1');

    expect(isMember).toBeTruthy();
  });

  it('should return false if user is YouTube member', async () => {
    mockExecuteYouTubeMembersQuery.mockReturnValue([
      {
        channelId: '1',
      },
    ]);

    const isMember = await query.execute('2');

    expect(isMember).toBeFalsy();
  });
});
