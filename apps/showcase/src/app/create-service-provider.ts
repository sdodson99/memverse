import 'server-only';
import * as firebase from 'firebase-admin';
import {
  GetManyMessagesByMemberIdsQuery,
  GetMessageByMemberIdQuery,
} from '@/entities/member-message';
import {
  GetAllMembersQuery,
  MockYouTubeMembersQuery,
} from '@/features/view-members';
import { YouTubeMembersQuery } from 'youtube-member-querier';
import {
  MockFirebaseAdminApp,
  initializeFirebaseAdminApp,
} from '@/shared/firebase';
import { getMockData } from '@/mocks';
import { UpdateMemberMessageCommand } from '@/features/update-member-message/update-member-message-command';

type ServiceProviderOptions = {
  mock?: string;
};

export function createServiceProvider(options: ServiceProviderOptions = {}) {
  const firebaseApp = createFirebaseAdminApp(options);

  const youTubeMembersQuery = createYouTubeMembersQuery(options);

  const getMessageByMemberIdQuery = new GetMessageByMemberIdQuery(firebaseApp);
  const getManyMessagesByMembersIdsQuery = new GetManyMessagesByMemberIdsQuery(
    getMessageByMemberIdQuery
  );

  const getAllMembersQuery = new GetAllMembersQuery(
    youTubeMembersQuery,
    getManyMessagesByMembersIdsQuery
  );

  const updateMemberMessageCommand = new UpdateMemberMessageCommand(
    firebaseApp
  );

  return {
    getAllMembersQuery,
    updateMemberMessageCommand,
  };
}

function createYouTubeMembersQuery({ mock }: ServiceProviderOptions) {
  if (mock) {
    const { youTubeMembers } = getMockData(mock);

    // TBD: Could wrap youtube-member-querier completely instead of casting.
    return new MockYouTubeMembersQuery(
      youTubeMembers
    ) as unknown as YouTubeMembersQuery;
  }

  return new YouTubeMembersQuery({
    channelId: process.env.YOUTUBE_CHANNEL_ID ?? '',
    apiKey: process.env.YOUTUBE_API_KEY ?? '',
    onBehalfOfUser: process.env.YOUTUBE_ON_BEHALF_OF_USER ?? '',
    authorizationHeader: process.env.YOUTUBE_AUTHORIZATION_HEADER ?? '',
    cookieHeader: process.env.YOUTUBE_COOKIE_HEADER ?? '',
  });
}

function createFirebaseAdminApp({ mock }: ServiceProviderOptions) {
  if (mock) {
    const { firebaseDatabase } = getMockData(mock);

    // TBD: Could wrap Firebase completely instead of casting.
    return new MockFirebaseAdminApp(
      firebaseDatabase
    ) as unknown as firebase.app.App;
  }

  return initializeFirebaseAdminApp({
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}
