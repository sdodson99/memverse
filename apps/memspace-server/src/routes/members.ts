import * as functions from 'firebase-functions';
import { Router as createRouter } from 'express';
import { YouTubeMembersQuery } from 'youtube-member-verifier';
import { MembersQuery } from '../queries/members/members-query';
import { ManyMessagesByIdsQuery } from '../queries/many-messages-by-ids/many-messages-by-ids-query';

const firebaseConfig = functions.config();
const youTubeStudioConfig = firebaseConfig.youtube_studio;

const youTubeMembersQuery = new YouTubeMembersQuery({
  apiKey: youTubeStudioConfig.api_key,
  channelId: youTubeStudioConfig.channel_id,
  onBehalfOfUser: youTubeStudioConfig.user_behalf_id,
  cookieHeader: youTubeStudioConfig.cookie_header,
  authorizationHeader: youTubeStudioConfig.authorization_header,
});
const manyMessagesByIdsQuery = new ManyMessagesByIdsQuery();
const membersQuery = new MembersQuery(
  youTubeMembersQuery,
  manyMessagesByIdsQuery
);

export const createMembersRouter = () => {
  const router = createRouter();

  router.get('/', async (req, res) => {
    const members = await membersQuery.execute();

    return res.send(members);
  });

  return router;
};
