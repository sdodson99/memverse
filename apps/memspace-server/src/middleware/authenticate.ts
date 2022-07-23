import { RequestHandler } from 'express';
import { auth } from 'firebase-admin';
import { User } from '../models/user';

export const authenticate: RequestHandler = async (req, res, next) => {
  const bearerAccessToken = req.headers.authorization;

  if (!bearerAccessToken) {
    return res.status(401).send('No access token provided.');
  }

  if (!bearerAccessToken?.startsWith('Bearer ')) {
    return res.status(401).send('Must provide authentication scheme.');
  }

  const accessToken = bearerAccessToken.substring('Bearer '.length);

  try {
    const { uid, memberAsOf } = await auth().verifyIdToken(accessToken);

    req.user = new User(uid, memberAsOf);

    return next();
  } catch (error) {
    return res.status(401).send('Invalid access token.');
  }
};
