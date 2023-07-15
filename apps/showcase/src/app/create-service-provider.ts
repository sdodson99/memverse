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
import { getServerSession } from '@/features/auth/get-server-session';
import { mockGetServerSession } from '@/features/auth/mock-get-server-session';
import { IsProductionServer } from '@/shared/configuration';

type ServiceProviderOptions = {
  mock?: string;
  mockChannelId?: string;
};

export function createServiceProvider(options: ServiceProviderOptions = {}) {
  const normalizedOptions = normalize(options);

  const getServerSession = createGetServerSession(normalizedOptions);
  const firebaseApp = createFirebaseAdminApp(normalizedOptions);
  const youTubeMembersQuery = createYouTubeMembersQuery(normalizedOptions);

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
    getServerSession,
    getAllMembersQuery,
    updateMemberMessageCommand,
  };
}

function normalize(options: ServiceProviderOptions) {
  const normalizedOptions = {
    ...options,
  };

  if (IsProductionServer()) {
    normalizedOptions.mock = undefined;
    normalizedOptions.mockChannelId = undefined;
  }

  return normalizedOptions;
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
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

function createGetServerSession({
  mock,
  mockChannelId,
}: ServiceProviderOptions) {
  if (mock) {
    return () =>
      mockGetServerSession({
        channelId: mockChannelId,
      });
  }

  return getServerSession;
}
