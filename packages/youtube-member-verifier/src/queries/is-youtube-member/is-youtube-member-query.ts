import { YouTubeMembersQuery } from '../youtube-members';

export class IsYouTubeMemberQuery {
  constructor(private youTubeMembersQuery: YouTubeMembersQuery) {}

  async execute(channelId: string): Promise<boolean> {
    const youTubeMembers = await this.youTubeMembersQuery.execute();

    return youTubeMembers.some((m) => m.channelId === channelId);
  }
}
