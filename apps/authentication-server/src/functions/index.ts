import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { createIsYouTubeMemberQuery } from 'youtube-member-verifier';
import { YouTubeChannelQuery } from '../queries/youtube-channel';

const app = express();
app.use(cors({ origin: true }));

const firebaseConfig = functions.config();
const youTubeStudioConfig = firebaseConfig.youtube_studio;

const youTubeChannelQuery = new YouTubeChannelQuery();
const isYouTubeMemberQuery = createIsYouTubeMemberQuery({
  apiKey: youTubeStudioConfig.api_key,
  channelId: youTubeStudioConfig.channel_id,
  onBehalfOfUser: youTubeStudioConfig.user_behalf_id,
  cookieHeader: youTubeStudioConfig.cookie_header,
  authorizationHeader: youTubeStudioConfig.authorization_header,
});

app.post('/login', async (req, res) => {
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

      return res.send(youTubeChannel?.id);
    } catch (error) {
      return res.sendStatus(403);
    }
  } catch (error) {
    return res.sendStatus(401);
  }
});

export const api = functions.https.onRequest(app);
