import 'server-only';
import { GetManyMessagesByMemberIdsQuery } from '@/entities/member-message';
import { Member } from '@/entities/member';
import firebase from 'firebase-admin';

const MEMBERS_DATABASE_PATH = '/members';

type MemberDataItem = {
  channelId: string;
  username: string;
  photoUrl: string;
};

type MembersData = {
  [channelId: string]: MemberDataItem;
};

export class GetAllMembersQuery {
  constructor(
    private firebaseApp: firebase.app.App,
    private getManyMessagesByMemberIdsQuery: GetManyMessagesByMemberIdsQuery
  ) {}

  async execute(): Promise<Member[]> {
    const youTubeMembers = await this.getYouTubeMembers();

    const memberIds = youTubeMembers.map((m) => m.channelId);
    const memberIdToMessageMap =
      await this.getManyMessagesByMemberIdsQuery.execute(memberIds);

    return youTubeMembers.map((m) => ({
      ...m,
      id: m.channelId,
      message: memberIdToMessageMap.get(m.channelId)?.content ?? null,
    }));
  }

  private async getYouTubeMembers() {
    const membersData = await this.firebaseApp
      .database()
      .ref(MEMBERS_DATABASE_PATH)
      .get();

    if (!membersData.exists()) {
      return [];
    }

    const members = membersData.val() as MembersData;

    return Object.values(members);
  }
}
