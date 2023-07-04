import { GetManyMessagesByMemberIdsQuery } from '@/entities/member-message';
import 'server-only';
import { YouTubeMembersQuery } from 'youtube-member-querier';
import { Member } from './member';

export class GetAllMembersQuery {
  constructor(
    private youTubeMembersQuery: YouTubeMembersQuery,
    private getManyMessagesByMemberIdsQuery: GetManyMessagesByMemberIdsQuery
  ) {}

  async execute(): Promise<Member[]> {
    const youTubeMembers = await this.youTubeMembersQuery.execute();

    const memberIds = youTubeMembers.map((m) => m.channelId);
    const memberIdToMessageMap =
      await this.getManyMessagesByMemberIdsQuery.execute(memberIds);

    return youTubeMembers.map((m) => ({
      ...m,
      id: m.channelId,
      message: memberIdToMessageMap.get(m.channelId)?.content ?? null,
    }));
  }
}
