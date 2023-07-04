import { MockFirebaseAdminApp } from '@/shared/firebase';
import * as firebase from 'firebase-admin';
import { Mock } from 'vitest';

vi.mock('firebase-admin');
const mockInitializeApp = firebase.initializeApp as Mock;

export const mockFirebaseInitialData = {
  data: {} as Record<string, unknown>,
};

beforeEach(() => {
  mockInitializeApp.mockImplementation(
    () => new MockFirebaseAdminApp(mockFirebaseInitialData.data)
  );
});

afterEach(() => {
  mockInitializeApp.mockReset();
});
