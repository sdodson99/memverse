import { Router as createRouter } from 'express';

export const createMembersRouter = () => {
  const router = createRouter();

  router.get('/', async (req, res) => {
    return res.send('success');
  });

  return router;
};
