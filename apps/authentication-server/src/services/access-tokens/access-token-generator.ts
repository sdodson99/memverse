import * as jwt from 'jsonwebtoken';
import { AccessToken } from './access-token';

export class AccessTokenGenerator {
  constructor(private secretKey: string, private expiresInSeconds: number) {}

  generate(userId: string): AccessToken {
    const token = jwt.sign({ id: userId }, this.secretKey, {
      expiresIn: this.expiresInSeconds,
    });

    return {
      token,
      expiresIn: this.expiresInSeconds,
    };
  }
}
