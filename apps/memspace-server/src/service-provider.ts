import * as functions from 'firebase-functions';
import { SaveMessageCommand } from './services/save-message';
import { DatabasePaths } from './configuration/database-paths';
import { GetAccountHandler } from './handlers/account/get-account-handler';
import { GetAccountMessageHandler } from './handlers/account/get-account-message-handler';
import { UpdateAccountMessageHandler } from './handlers/account/update-account-message-handler';
import { GetAllMembersHandler } from './handlers/members/get-all-members-handler';
import { AllMembersQuery } from './services/all-members';
import { ManyMessagesByMemberIdsQuery } from './services/many-messages-by-member-ids';
import { MessageByMemberIdQuery } from './services/message-by-member-id';
import { YouTubeMembersQuery } from 'youtube-member-querier';
import admin from 'firebase-admin';

export type ServiceProvider = {
  resolveGetAllMembersHandler: () => GetAllMembersHandler;
  resolveGetAccountHandler: () => GetAccountHandler;
  resolveGetAccountMessageHandler: () => GetAccountMessageHandler;
  resolveUpdateAccountMessageHandler: () => UpdateAccountMessageHandler;
};

export const createServiceProvider = (): ServiceProvider => {
  const firebaseConfig = functions.config();
  const youTubeStudioConfig = firebaseConfig.youtube_studio;
  const firebaseApp = admin.app();

  const messageByMemberIdQuery = new MessageByMemberIdQuery(
    firebaseApp,
    DatabasePaths.MESSAGES
  );
  const saveMessageCommand = new SaveMessageCommand(
    firebaseApp,
    DatabasePaths.MESSAGES
  );
  const youTubeMembersQuery = new YouTubeMembersQuery({
    apiKey: youTubeStudioConfig.api_key,
    channelId: youTubeStudioConfig.channel_id,
    onBehalfOfUser: youTubeStudioConfig.user_behalf_id,
    cookieHeader: youTubeStudioConfig.cookie_header,
    authorizationHeader: youTubeStudioConfig.authorization_header,
  });
  const manyMessagesByMemberIdsQuery = new ManyMessagesByMemberIdsQuery(
    messageByMemberIdQuery
  );
  const allMembersQuery = new AllMembersQuery(
    youTubeMembersQuery,
    manyMessagesByMemberIdsQuery
  );

  const getAllMembersHandler = new GetAllMembersHandler(allMembersQuery);
  const getAccountHandler = new GetAccountHandler();
  const getAccountMessageHandler = new GetAccountMessageHandler(
    messageByMemberIdQuery
  );
  const updateAccountMessageHandler = new UpdateAccountMessageHandler(
    saveMessageCommand
  );

  return {
    resolveGetAllMembersHandler: () => getAllMembersHandler,
    resolveGetAccountHandler: () => getAccountHandler,
    resolveGetAccountMessageHandler: () => getAccountMessageHandler,
    resolveUpdateAccountMessageHandler: () => updateAccountMessageHandler,
  };
};
