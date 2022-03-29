import * as functions from 'firebase-functions';
import { YouTubeMembersQuery } from 'youtube-member-querier';
import { LoginHandler } from './handlers/login-handler';
import { IsYouTubeMemberQuery } from './queries/is-youtube-member';
import { YouTubeChannelQuery } from './queries/youtube-channel';
import { AccessTokenGenerator } from './services/access-tokens/access-token-generator';

export type ServiceProvider = {
  resolveLoginHandler: () => LoginHandler;
};

export const createServiceProvider = (): ServiceProvider => {
  const firebaseConfig = functions.config();
  const youTubeStudioConfig = firebaseConfig.youtube_studio;
  const accessTokenConfig = firebaseConfig.access_token;
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
  const accessTokenGenerator = new AccessTokenGenerator(
    accessTokenConfig.secret_key,
    parseInt(accessTokenConfig.expires_in)
  );

  const loginHandler = new LoginHandler(
    youTubeChannelQuery,
    isYouTubeMemberQuery,
    accessTokenGenerator,
    logger
  );

  return {
    resolveLoginHandler: () => loginHandler,
  };
};
