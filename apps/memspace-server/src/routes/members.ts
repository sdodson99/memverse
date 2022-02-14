import * as functions from 'firebase-functions';
import { Router as createRouter } from 'express';
import { YouTubeMembersQuery } from 'youtube-member-verifier';
import { AllMembersQuery } from '../queries/all-members';
import { ManyMessagesByMemberIdsQuery } from '../queries/many-messages-by-member-ids';

const firebaseConfig = functions.config();
const youTubeStudioConfig = firebaseConfig.youtube_studio;

const youTubeMembersQuery = new YouTubeMembersQuery({
  apiKey: youTubeStudioConfig.api_key,
  channelId: youTubeStudioConfig.channel_id,
  onBehalfOfUser: youTubeStudioConfig.user_behalf_id,
  cookieHeader: youTubeStudioConfig.cookie_header,
  authorizationHeader: youTubeStudioConfig.authorization_header,
});
const manyMessagesByMemberIdsQuery = new ManyMessagesByMemberIdsQuery();
const allMembersQuery = new AllMembersQuery(
  youTubeMembersQuery,
  manyMessagesByMemberIdsQuery
);

export const createMembersRouter = () => {
  const router = createRouter();

  router.get('/', async (req, res) => {
    const members = await allMembersQuery.execute();

    return res.send(members);
  });

  return router;
};
