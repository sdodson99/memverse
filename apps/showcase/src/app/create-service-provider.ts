import 'server-only';
import * as firebase from 'firebase-admin';
import {
  GetManyMessagesByMemberIdsQuery,
  GetMessageByMemberIdQuery,
} from '@/entities/member-message';
import {
  GetAllMembersQuery,
  GetAllYouTubeMembersQuery,
} from '@/features/view-members';
import {
  MockFirebaseAdminApp,
  initializeFirebaseAdminApp,
} from '@/shared/firebase';
import { getMockData } from '@/mocks';
import { UpdateMemberMessageCommand } from '@/features/update-member-message/update-member-message-command';
import { getServerSession } from '@/features/auth/get-server-session';
import { mockGetServerSession } from '@/features/auth/mock-get-server-session';
import { isProductionServer } from '@/shared/configuration';
import { GetYouTubeChannelQuery } from '@/features/auth/get-youtube-channel-query';

type ServiceProviderOptions = {
  mock?: string;
  mockChannelId?: string;
};

export function createServiceProvider(options: ServiceProviderOptions = {}) {
  const normalizedOptions = normalize(options);

  const getServerSession = createGetServerSession(normalizedOptions);
  const firebaseApp = createFirebaseAdminApp(normalizedOptions);

  const getMessageByMemberIdQuery = new GetMessageByMemberIdQuery(firebaseApp);
  const getManyMessagesByMembersIdsQuery = new GetManyMessagesByMemberIdsQuery(
    getMessageByMemberIdQuery
  );

  const getAllYouTubeMembersQuery = new GetAllYouTubeMembersQuery(firebaseApp);
  const getAllMembersQuery = new GetAllMembersQuery(
    getAllYouTubeMembersQuery,
    getManyMessagesByMembersIdsQuery
  );
  const getYouTubeChannelQuery = new GetYouTubeChannelQuery(fetch);

  const updateMemberMessageCommand = new UpdateMemberMessageCommand(
    firebaseApp
  );

  return {
    getServerSession,
    getAllYouTubeMembersQuery,
    getAllMembersQuery,
    getYouTubeChannelQuery,
    updateMemberMessageCommand,
  };
}

function normalize(options: ServiceProviderOptions) {
  const normalizedOptions = {
    ...options,
  };

  if (isProductionServer()) {
    normalizedOptions.mock = undefined;
    normalizedOptions.mockChannelId = undefined;
  }

  return normalizedOptions;
}

function createFirebaseAdminApp({ mock }: ServiceProviderOptions) {
  if (mock) {
    const { firebaseDatabase } = getMockData(mock);

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
