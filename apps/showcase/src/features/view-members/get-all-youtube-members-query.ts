import 'server-only';
import firebase from 'firebase-admin';
import { cache } from 'react';

const MEMBERS_DATABASE_PATH = '/members';

type MemberDataItem = {
  channelId: string;
  username: string;
  photoUrl: string;
};

type MembersData = {
  [channelId: string]: MemberDataItem;
};

export class GetAllYouTubeMembersQuery {
  constructor(private firebaseApp: firebase.app.App) {}

  async execute() {
    return getAllYouTubeMembers(this.firebaseApp);
  }
}

const getAllYouTubeMembers = cache(async (firebaseApp: firebase.app.App) => {
  const membersData = await firebaseApp
    .database()
    .ref(MEMBERS_DATABASE_PATH)
    .get();

  if (!membersData.exists()) {
    return [];
  }

  const members = membersData.val() as MembersData;

  return Object.values(members);
});
