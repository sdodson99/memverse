import { Router as createRouter } from 'express';
import { authenticate } from '../middleware/authenticate';
import { celebrate, Segments, Joi } from 'celebrate';
import { ServiceProvider } from '../service-provider';
import { authorizeIsMember } from '../middleware/authorize-is-member';

export const createAccountRouter = (serviceProvider: ServiceProvider) => {
  const router = createRouter();

  const getAccountMessageHandler =
    serviceProvider.resolveGetAccountMessageHandler();
  const updateAccountMessageHandler =
    serviceProvider.resolveUpdateAccountMessageHandler();

  router.get('/message', authenticate, authorizeIsMember, async (req, res) =>
    getAccountMessageHandler.handle(req, res)
  );
  router.put(
    '/message',
    authenticate,
    authorizeIsMember,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        content: Joi.string().allow('', null).max(100).default(''),
      }),
    }),
    (req, res) => updateAccountMessageHandler.handle(req, res)
  );

  return router;
};
