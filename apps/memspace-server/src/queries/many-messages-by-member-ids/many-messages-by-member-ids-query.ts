import { MessageByMemberIdQuery } from '../message-by-member-id';
import { MemberIdToMessageMap } from './member-id-to-message-map';

export class ManyMessagesByMemberIdsQuery {
  constructor(private messageByMemberIdQuery: MessageByMemberIdQuery) {}

  async execute(memberIds: string[]): Promise<MemberIdToMessageMap> {
    const messageByMemberIdQueries = memberIds.map((m) =>
      this.messageByMemberIdQuery.execute(m).then((message) => ({
        memberId: m,
        message,
      }))
    );

    const messagesByMemberIds = await Promise.all(messageByMemberIdQueries);

    return messagesByMemberIds.reduce<MemberIdToMessageMap>(
      (result, current) => {
        result[current.memberId] = current.message;

        return result;
      },
      {}
    );
  }
}
