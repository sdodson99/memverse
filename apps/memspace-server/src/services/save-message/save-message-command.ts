import { Message } from '../../models/message';
import * as firebase from 'firebase-admin';

export class SaveMessageCommand {
  constructor(
    private firebaseApp: firebase.app.App,
    private messagesPath: string
  ) {}

  async execute(memberId: string, message: Message): Promise<void> {
    await this.firebaseApp
      .database()
      .ref(this.messagesPath)
      .child(memberId)
      .set(message);
  }
}
