import 'server-only';
import { GetMessageByMemberIdQuery } from './get-message-by-member-id-query';
import { Message } from './message';

type MemberIdToMessageMap = Map<string, Message>;

export class GetManyMessagesByMemberIdsQuery {
  constructor(private getMessageByMemberIdQuery: GetMessageByMemberIdQuery) {}

  async execute(memberIds: string[]): Promise<MemberIdToMessageMap> {
    const messageByMemberIdQueries = memberIds.map((m) =>
      this.getMessageByMemberIdQuery.execute(m).then((message) => ({
        memberId: m,
        message,
      }))
    );

    const messagesByMemberIds = await Promise.all(messageByMemberIdQueries);

    return messagesByMemberIds.reduce<MemberIdToMessageMap>(
      (result, current) => {
        result.set(current.memberId, current.message);

        return result;
      },
      new Map<string, Message>()
    );
  }
}
