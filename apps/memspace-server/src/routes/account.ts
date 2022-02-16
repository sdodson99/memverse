import { Router as createRouter } from 'express';
import { authenticate } from '../middleware/authenticate';
import { MessageByMemberIdQuery } from '../queries/message-by-member-id';
import { getFirebaseApp } from '../startup/firebase-app';

const firebaseApp = getFirebaseApp();
const messagesPath = '/messages';
const messageByMemberIdQuery = new MessageByMemberIdQuery(
  firebaseApp,
  messagesPath
);

export const createAccountRouter = () => {
  const router = createRouter();

  router.get('/message', authenticate, async (req, res) => {
    const memberId = req.user?.id;

    if (!memberId) {
      return res.sendStatus(401);
    }

    const message = await messageByMemberIdQuery.execute(memberId);

    const messageResponse = {
      content: message?.content ?? '',
    };

    return res.send(messageResponse);
  });

  return router;
};
