import { RequestHandler } from 'express';

export const authorizeIsMember: RequestHandler = (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).send();
  }

  if (!user.isMember()) {
    return res.status(403).send('User is not a member.');
  }

  return next();
};
