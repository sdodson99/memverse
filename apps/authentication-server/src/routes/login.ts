import * as functions from 'firebase-functions';
import { Router as createRouter } from 'express';
import { createIsYouTubeMemberQuery } from 'youtube-member-verifier';
import { YouTubeChannelQuery } from '../queries/youtube-channel';
import { AccessTokenGenerator } from '../services/access-tokens/access-token-generator';
import { ChannelOwnerIsYouTubeMemberQuery } from '../queries/is-youtube-member';

const firebaseConfig = functions.config();
const youTubeStudioConfig = firebaseConfig.youtube_studio;
const accessTokenConfig = firebaseConfig.access_token;

const youTubeChannelQuery = new YouTubeChannelQuery();
const baseIsYouTubeMemberQuery = createIsYouTubeMemberQuery({
  apiKey: youTubeStudioConfig.api_key,
  channelId: youTubeStudioConfig.channel_id,
  onBehalfOfUser: youTubeStudioConfig.user_behalf_id,
  cookieHeader: youTubeStudioConfig.cookie_header,
  authorizationHeader: youTubeStudioConfig.authorization_header,
});
const isYouTubeMemberQuery = new ChannelOwnerIsYouTubeMemberQuery(
  youTubeStudioConfig.channel_id,
  baseIsYouTubeMemberQuery
);
const accessTokenGenerator = new AccessTokenGenerator(
  accessTokenConfig.secret_key,
  accessTokenConfig.expires_in
);

const logger = functions.logger;

export const createLoginRouter = () => {
  const router = createRouter();

  router.post('/', async (req, res) => {
    logger.info('Received login request.');

    const userAccessToken = req.body.accessToken;

    if (!userAccessToken) {
      logger.warn('User did not provide an access token.');
      return res.sendStatus(401);
    }

    const youTubeChannel = await youTubeChannelQuery.execute(userAccessToken);

    if (!youTubeChannel) {
      logger.warn("Unable to find user's YouTube channel.");
      return res.sendStatus(401);
    }

    const { id: channelId } = youTubeChannel;

    logger.info("Found user's YouTube channel.", { channelId });

    const isMember = await isYouTubeMemberQuery.execute(channelId);

    if (!isMember) {
      logger.info('User is not a channel member.', { channelId });
      return res.sendStatus(403);
    }

    logger.info('Verified user is a channel member.', { channelId });

    const accessToken = accessTokenGenerator.generate(channelId);

    logger.info('Signed access token for user.', { channelId });

    return res.send(accessToken);
  });

  return router;
};
