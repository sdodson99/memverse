import { when } from 'jest-when';
import { IsYouTubeMemberQuery } from 'youtube-member-verifier';
import { ChannelOwnerIsYouTubeMemberQuery } from '../channel-owner-is-youtube-member-query';

describe('ChannelOwnerIsYouTubeMemberQuery', () => {
  let query: ChannelOwnerIsYouTubeMemberQuery;

  let mockIsYouTubeMemberQueryExecute: jest.Mock;

  let channelId: string;

  beforeEach(() => {
    channelId = '123';

    mockIsYouTubeMemberQueryExecute = jest.fn();
    const isYouTubeMemberQuery = {
      execute: mockIsYouTubeMemberQueryExecute,
    } as unknown as IsYouTubeMemberQuery;

    query = new ChannelOwnerIsYouTubeMemberQuery(
      channelId,
      isYouTubeMemberQuery
    );
  });

  it('should return true if user is channel owner', async () => {
    const result = await query.execute(channelId);

    expect(result).toBeTruthy();
  });

  it('should return YouTube channel member status if user is not channel owner', async () => {
    const otherChannelId = 'other-channel-id';
    when(mockIsYouTubeMemberQueryExecute)
      .calledWith(otherChannelId)
      .mockReturnValue(false);

    const result = await query.execute(otherChannelId);

    expect(result).toBeFalsy();
  });
});
