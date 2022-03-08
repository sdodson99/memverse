import { Router as createRouter } from 'express';
import { SaveMessageCommand } from '../commands/save-message';
import { DatabasePaths } from '../configuration/database-paths';
import { authenticate } from '../middleware/authenticate';
import { MessageByMemberIdQuery } from '../queries/message-by-member-id';
import { getFirebaseApp } from '../startup/firebase-app';
import { celebrate, Segments, Joi } from 'celebrate';

const firebaseApp = getFirebaseApp();
const messagesPath = DatabasePaths.MESSAGES;
const messageByMemberIdQuery = new MessageByMemberIdQuery(
  firebaseApp,
  messagesPath
);
const saveMessageCommand = new SaveMessageCommand(firebaseApp, messagesPath);

export const createAccountRouter = () => {
  const router = createRouter();

  router.get('/', authenticate, async (req, res) => {
    const memberId = req.user?.id ?? '';

    return res.send({
      id: memberId,
    });
  });

  router.get('/message', authenticate, async (req, res) => {
    const memberId = req.user?.id ?? '';

    const message = await messageByMemberIdQuery.execute(memberId);

    const messageResponse = {
      content: message?.content ?? '',
    };

    return res.send(messageResponse);
  });

  router.put(
    '/message',
    authenticate,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        content: Joi.string().allow('', null).max(100),
      }),
    }),
    async (req, res) => {
      const memberId = req.user?.id ?? '';

      const { content } = req.body;
      const message = {
        content,
      };

      await saveMessageCommand.execute(memberId, message);

      return res.sendStatus(204);
    }
  );

  return router;
};
