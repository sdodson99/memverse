import * as firebase from 'firebase-admin';

export function initializeFirebaseAdminApp(options?: firebase.AppOptions) {
  return firebase.app() || firebase.initializeApp(options);
}
