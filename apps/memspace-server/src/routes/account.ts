import { Router as createRouter } from 'express';
import { authenticate } from '../middleware/authenticate';

export const createAccountRouter = () => {
  const router = createRouter();

  router.get('/message', authenticate, async (req, res) => {
    return res.send(req.user?.id);
  });

  return router;
};
