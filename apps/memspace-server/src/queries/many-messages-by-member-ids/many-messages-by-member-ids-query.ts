export class ManyMessagesByMemberIdsQuery {
  async execute(memberIds: string[]): Promise<Record<string, string>> {
    return memberIds.reduce<Record<string, string>>(
      (result, currentMemberId) => {
        result[currentMemberId] = 'Insert your message here!';

        return result;
      },
      {}
    );
  }
}
