import * as functions from 'firebase-functions';
import { Router as createRouter } from 'express';
import { createIsYouTubeMemberQuery } from '../../../../packages/youtube-member-verifier/lib/src';
import { YouTubeChannelQuery } from '../queries/youtube-channel';
import { AccessTokenGenerator } from '../services/access-tokens/access-token-generator';

const firebaseConfig = functions.config();
const youTubeStudioConfig = firebaseConfig.youtube_studio;
const accessTokenConfig = firebaseConfig.access_token;

const youTubeChannelQuery = new YouTubeChannelQuery();
const isYouTubeMemberQuery = createIsYouTubeMemberQuery({
  apiKey: youTubeStudioConfig.api_key,
  channelId: youTubeStudioConfig.channel_id,
  onBehalfOfUser: youTubeStudioConfig.user_behalf_id,
  cookieHeader: youTubeStudioConfig.cookie_header,
  authorizationHeader: youTubeStudioConfig.authorization_header,
});
const accessTokenGenerator = new AccessTokenGenerator(
  accessTokenConfig.secret_key,
  accessTokenConfig.expires_in
);

export const createLoginRouter = () => {
  const router = createRouter();

  router.post('/', async (req, res) => {
    const userAccessToken = req.body.accessToken;

    if (!userAccessToken) {
      return res.sendStatus(401);
    }

    try {
      const youTubeChannel = await youTubeChannelQuery.execute(userAccessToken);

      if (!youTubeChannel) {
        return res.sendStatus(401);
      }

      const { id: channelId } = youTubeChannel;

      try {
        const isMember = await isYouTubeMemberQuery.execute(channelId);

        if (!isMember) {
          return res.sendStatus(403);
        }

        const accessToken = accessTokenGenerator.generate(channelId);

        return res.send(accessToken);
      } catch (error) {
        return res.sendStatus(403);
      }
    } catch (error) {
      return res.sendStatus(401);
    }
  });

  return router;
};
