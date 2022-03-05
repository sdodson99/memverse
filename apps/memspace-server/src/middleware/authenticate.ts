import { RequestHandler } from 'express';
import * as functions from 'firebase-functions';
import * as jwt from 'jsonwebtoken';

const firebaseConfig = functions.config();
const accessTokenSecretKey = firebaseConfig?.access_token?.secret_key;

export const authenticate: RequestHandler = (req, res, next) => {
  const bearerAccessToken = req.headers.authorization;

  if (!bearerAccessToken) {
    return res.status(401).send('No access token provided.');
  }

  if (!bearerAccessToken?.startsWith('Bearer ')) {
    return res.status(401).send('Must provide authentication scheme.');
  }

  const accessToken = bearerAccessToken.substring('Bearer '.length);

  return jwt.verify(
    accessToken,
    accessTokenSecretKey,
    (
      err: jwt.VerifyErrors | null,
      rawPayload: string | jwt.JwtPayload | undefined
    ) => {
      if (err) {
        return res.status(401).send('Invalid access token.');
      }

      const payload = rawPayload as jwt.JwtPayload;
      const userId = payload['id'];

      req.user = {
        id: userId,
      };

      return next();
    }
  );
};
