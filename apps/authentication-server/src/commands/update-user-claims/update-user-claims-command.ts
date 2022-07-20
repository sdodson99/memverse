import admin from 'firebase-admin';

export type UserClaims = {
  memberAsOf: number;
};

export class UpdateUserClaimsCommand {
  async execute(uid: string, claims: UserClaims) {
    await admin.auth().setCustomUserClaims(uid, claims);
  }
}
