import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import { getYouTubeMembers } from './get-youtube-members';
import { updateYouTubeMembersCache } from './update-youtube-members-cache';

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

exports.updateMembersCache = onSchedule('0 1 * * *', async () => {
  const members = await getYouTubeMembers();

  logger.info('Successfully fetched YouTube Members: ', members.length);

  await updateYouTubeMembersCache(members);

  logger.info('Successfully updated YouTube members cache');
});
