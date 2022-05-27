import test from 'firebase-functions-test';
import { getFirebaseConfig } from './get-firebase-config';

export const setupFirebase = () => {
  const functionsTest = test();

  const config = getFirebaseConfig();
  functionsTest.mockConfig(config);

  return functionsTest;
};
