import { IsYouTubeMemberQuery } from 'youtube-member-verifier';

export class ChannelOwnerIsYouTubeMemberQuery {
  constructor(
    private channelOwnerId: string,
    private baseIsYouTubeMemberQuery: IsYouTubeMemberQuery
  ) {}

  /**
   * Check if a channel is the channel owner or the YouTube channel member.
   * @param channelId The channel ID to check member status for.
   * @returns True/false for is channel member.
   * @throws {Error} Thrown if query fails.
   */
  async execute(channelId: string): Promise<boolean> {
    if (this.channelOwnerId === channelId) {
      return true;
    }

    return await this.baseIsYouTubeMemberQuery.execute(channelId);
  }
}
