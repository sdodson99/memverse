import * as jwt from 'jsonwebtoken';
import { getFirebaseConfig } from './get-firebase-config';

export const generateAccessToken = (payload = { id: '123' }) => {
  const {
    access_token: { secret_key: secretKey },
  } = getFirebaseConfig();

  const token = jwt.sign(payload, secretKey);

  return token;
};
