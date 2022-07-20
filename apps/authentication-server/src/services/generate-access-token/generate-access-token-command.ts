import admin from 'firebase-admin';

export class GenerateAccessTokenCommand {
  async execute(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  }
}
