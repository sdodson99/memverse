import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

type UserDetails = {
  displayName?: string;
  photoUrl?: string;
};

export class CreateUserIfNotExistsCommand {
  constructor(private logger: typeof functions.logger) {}

  /**
   * Attempt to create a user if the user does not already exist.
   * @param uid The ID of the user to attempt to create.
   * @throws {Error} Thrown if commands fails.
   */
  async execute(uid: string, { displayName, photoUrl }: UserDetails = {}) {
    const userAlreadyExists = await this.userAlreadyExists(uid);

    if (userAlreadyExists) {
      return;
    }

    this.logger.info('Creating new user.', { uid });

    await admin.auth().createUser({
      uid,
      displayName,
      photoURL: photoUrl,
    });

    this.logger.info('Successfully created new user.', { uid });
  }

  private async userAlreadyExists(uid: string) {
    const { users } = await admin.auth().getUsers([{ uid }]);

    return users.length > 0;
  }
}
