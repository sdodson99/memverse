import { YouTubeMembersQuery } from 'youtube-member-querier';
import { Member } from '../../models/member';
import { ManyMessagesByMemberIdsQuery } from '../many-messages-by-member-ids';

export class AllMembersQuery {
  constructor(
    private youTubeMembersQuery: YouTubeMembersQuery,
    private manyMessagesByMemberIdsQuery: ManyMessagesByMemberIdsQuery
  ) {}

  async execute(): Promise<Member[]> {
    const youTubeMembers = await this.youTubeMembersQuery.execute();

    const memberIds = youTubeMembers.map((m) => m.channelId);
    const memberMessages = await this.manyMessagesByMemberIdsQuery.execute(
      memberIds
    );

    return youTubeMembers.map((y) => ({
      id: y.channelId,
      username: y.username,
      photoUrl: y.photoUrl,
      message: memberMessages[y.channelId]?.content ?? '',
    }));
  }
}
