export const isProduction = () =>
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

export const getFirebaseConfig = () => ({
  apiKey: 'AIzaSyDxXUSxSLuzKFuEhACAGtuvYZC-nTf70l0',
  authDomain: 'memverse.firebaseapp.com',
  databaseURL: 'https://memverse-default-rtdb.firebaseio.com',
  projectId: 'memverse',
  storageBucket: 'memverse.appspot.com',
  messagingSenderId: '645429020198',
  appId: '1:645429020198:web:56cdb892fda7c4c8e088e7',
  measurementId: 'G-R4HBRGPMS3',
});
