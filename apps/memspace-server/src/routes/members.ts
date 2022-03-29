import { Router as createRouter } from 'express';
import { ServiceProvider } from '../service-provider';

export const createMembersRouter = (serviceProvider: ServiceProvider) => {
  const router = createRouter();

  const getAllMembersHandler = serviceProvider.resolveGetAllMembersHandler();

  router.get('/', (req, res) => getAllMembersHandler.handle(req, res));

  return router;
};
