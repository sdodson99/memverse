import { YouTubeMembersQuery } from 'youtube-member-querier';

export class IsYouTubeMemberQuery {
  constructor(private youTubeMembersQuery: YouTubeMembersQuery) {}

  /**
   * Check if a channel is the channel owner or the YouTube channel member.
   * @param channelId The channel ID to check member status for.
   * @returns True/false for is channel member.
   * @throws {Error} Thrown if query fails.
   */
  async execute(channelId: string): Promise<boolean> {
    const members = await this.youTubeMembersQuery.execute();

    return members.some((m) => m.channelId === channelId);
  }
}
