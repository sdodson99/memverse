import { MockFirebaseAdminApp } from '@/shared/firebase';
import * as firebase from 'firebase-admin';
import { Mock } from 'vitest';

vi.mock('firebase-admin');
const mockInitializeApp = firebase.initializeApp as Mock;

export const mockFirebaseData = {
  data: {} as Record<string, unknown>,
};

beforeEach(() => {
  mockInitializeApp.mockImplementation(
    () => new MockFirebaseAdminApp(mockFirebaseData.data)
  );
});

afterEach(() => {
  mockInitializeApp.mockReset();
});
