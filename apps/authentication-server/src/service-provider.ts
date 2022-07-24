import * as functions from 'firebase-functions';
import { YouTubeMembersQuery } from 'youtube-member-querier';
import { CreateUserIfNotExistsCommand } from './services/create-user-if-not-exists';
import { UpdateUserClaimsCommand } from './services/update-user-claims';
import { YouTubeChannelQuery } from './services/youtube-channel';
import { IsYouTubeMemberQuery } from './services/is-youtube-member';
import { LoginHandler } from './handlers/login-handler';
import { GenerateAccessTokenCommand } from './services/generate-access-token';
import { createLoginRouter } from './routes/login';
import { Router } from 'express';
import { UpdateMemberClaimsJob } from './jobs';
import { GetExistingUsersQuery } from './services/existing-users';

export type ServiceProvider = {
  resolveLoginRouter: () => Router;
  resolveUpdateMemberClaimsJob: () => UpdateMemberClaimsJob;
};

export const createServiceProvider = (): ServiceProvider => {
  const firebaseConfig = functions.config();
  const youTubeStudioConfig = firebaseConfig.youtube_studio;
  const logger = functions.logger;

  const youTubeChannelQuery = new YouTubeChannelQuery();
  const youTubeMembersQuery = new YouTubeMembersQuery({
    apiKey: youTubeStudioConfig.api_key,
    channelId: youTubeStudioConfig.channel_id,
    onBehalfOfUser: youTubeStudioConfig.user_behalf_id,
    cookieHeader: youTubeStudioConfig.cookie_header,
    authorizationHeader: youTubeStudioConfig.authorization_header,
  });
  const isYouTubeMemberQuery = new IsYouTubeMemberQuery(youTubeMembersQuery);
  const createUserIfNotExistsCommand = new CreateUserIfNotExistsCommand(logger);
  const updateUserClaimsCommand = new UpdateUserClaimsCommand();
  const generateAccessTokenCommand = new GenerateAccessTokenCommand();
  const getExistingUsersQuery = new GetExistingUsersQuery();

  const loginHandler = new LoginHandler(
    youTubeChannelQuery,
    isYouTubeMemberQuery,
    createUserIfNotExistsCommand,
    updateUserClaimsCommand,
    generateAccessTokenCommand,
    logger
  );

  const updateMemberClaimsJob = new UpdateMemberClaimsJob(
    youTubeMembersQuery,
    getExistingUsersQuery,
    updateUserClaimsCommand,
    logger
  );

  return {
    resolveLoginRouter: () => createLoginRouter(loginHandler),
    resolveUpdateMemberClaimsJob: () => updateMemberClaimsJob,
  };
};
