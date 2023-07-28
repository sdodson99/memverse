import 'server-only';
import { GetManyMessagesByMemberIdsQuery } from '@/entities/member-message';
import { Member } from '@/entities/member';
import { GetAllYouTubeMembersQuery } from './get-all-youtube-members-query';

export class GetAllMembersQuery {
  constructor(
    private getAllYouTubeMembersQuery: GetAllYouTubeMembersQuery,
    private getManyMessagesByMemberIdsQuery: GetManyMessagesByMemberIdsQuery
  ) {}

  async execute(): Promise<Member[]> {
    const youTubeMembers = await this.getAllYouTubeMembersQuery.execute();

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
