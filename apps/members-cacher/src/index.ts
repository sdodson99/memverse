import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getYouTubeMembers } from './get-youtube-members';
import { updateYouTubeMembersCache } from './update-youtube-members-cache';

admin.initializeApp();

const logger = functions.logger;

exports.updateMembersCache = functions
  .region('us-central1')
  .pubsub.schedule('0 1 * * *')
  .timeZone('UTC')
  .onRun(async () => {
    try {
      const members = await getYouTubeMembers();

      logger.info('Successfully fetched YouTube Members: ', members.length);

      await updateYouTubeMembersCache(members);

      logger.info('Successfully updated YouTube Members cache');
    } catch (e) {
      logger.error('Failed to update YouTube Members cache');
    }
  });
