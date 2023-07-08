import { MESSAGES_DATABASE_PATH } from '@/entities/member-message';
import * as firebase from 'firebase-admin';

export class UpdateMemberMessageCommand {
  constructor(private firebaseApp: firebase.app.App) {}

  async execute(memberId: string, message: string | null): Promise<void> {
    await this.firebaseApp
      .database()
      .ref(MESSAGES_DATABASE_PATH)
      .child(memberId)
      .set({ content: message ?? '' });
  }
}
