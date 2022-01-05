import { YouTubeMembersQuery } from 'youtube-member-verifier';
import { Member } from '../../models/member';
import { ManyMessagesByIdsQuery } from '../many-messages-by-ids/many-messages-by-ids-query';

export class MembersQuery {
  constructor(
    private youTubeMembersQuery: YouTubeMembersQuery,
    private manyMessagesByIdsQuery: ManyMessagesByIdsQuery
  ) {}

  async execute(): Promise<Member[]> {
    const youTubeMembers = await this.youTubeMembersQuery.execute();

    // TODO: Query and map messages
    const memberIds = youTubeMembers.map((m) => m.channelId);
    const memberMessages = await this.manyMessagesByIdsQuery.execute(memberIds);

    return youTubeMembers.map((y) => ({
      id: y.channelId,
      username: y.username,
      photoUrl: y.photoUrl,
      message: memberMessages[y.channelId],
    }));
  }
}
