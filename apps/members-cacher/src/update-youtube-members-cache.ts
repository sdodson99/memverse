import { getDatabase } from 'firebase-admin/database';
import { Member } from './get-youtube-members';

type MembersData = {
  [channelId: string]: Member;
};

export async function updateYouTubeMembersCache(members: Member[]) {
  const membersData = members.reduce<MembersData>((data, currentMember) => {
    data[currentMember.channelId] = currentMember;

    return data;
  }, {});

  await getDatabase().ref('members').set(membersData);
}
