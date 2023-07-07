import * as firebase from 'firebase-admin';

export function initializeFirebaseAdminApp(options?: firebase.AppOptions) {
  return firebase.apps.length === 0
    ? firebase.initializeApp(options)
    : firebase.app();
}
