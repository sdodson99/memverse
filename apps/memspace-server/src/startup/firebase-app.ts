import * as firebase from 'firebase-admin';

type FirebaseAppState = {
  app: firebase.app.App | null;
};

const state: FirebaseAppState = {
  app: null,
};

export const getFirebaseApp = () => {
  if (!state.app) {
    state.app = firebase.initializeApp();
  }

  return state.app;
};
