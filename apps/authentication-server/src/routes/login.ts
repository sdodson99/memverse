import { Router as createRouter } from 'express';
import { LoginHandler } from '../handlers/login-handler';

export const createLoginRouter = (loginHandler: LoginHandler) => {
  const router = createRouter();

  router.post('/', (req, res) => loginHandler.handle(req, res));

  return router;
};
