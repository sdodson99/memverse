import { YouTubeMembersQuery } from 'youtube-member-verifier';
import { Member } from '../../models/member';
import { ManyMessagesByMemberIdsQuery } from '../many-messages-by-member-ids';

export class AllMembersQuery {
  constructor(
    private youTubeMembersQuery: YouTubeMembersQuery,
    private manyMessagesByMemberIdsQuery: ManyMessagesByMemberIdsQuery
  ) {}

  async execute(): Promise<Member[]> {
    const youTubeMembers = await this.youTubeMembersQuery.execute();

    // Filter out member that don't have channel IDs. Maybe the channel was deleted?
    // Move this to youtube-member-verifier package in the future.
    const validYouTubeMembers = youTubeMembers.filter((m) => m.channelId);

    const memberIds = validYouTubeMembers.map((m) => m.channelId);
    const memberMessages = await this.manyMessagesByMemberIdsQuery.execute(
      memberIds
    );

    return validYouTubeMembers.map((y) => ({
      id: y.channelId,
      username: y.username,
      photoUrl: y.photoUrl,
      message: memberMessages[y.channelId]?.content ?? '',
    }));
  }
}
