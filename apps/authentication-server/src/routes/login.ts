import { Router as createRouter } from 'express';
import { ServiceProvider } from '../service-provider';

export const createLoginRouter = (serviceProvider: ServiceProvider) => {
  const router = createRouter();

  const loginHandler = serviceProvider.resolveLoginHandler();

  router.post('/', (req, res) => loginHandler.handle(req, res));

  return router;
};
