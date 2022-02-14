import * as firebase from 'firebase-admin';
import { getFirebaseApp } from '../firebase-app';

jest.mock('firebase-admin');
const mockInitializeApp = firebase.initializeApp as jest.Mock;

describe('getFirebaseApp', () => {
  let mockFirebaseApp: firebase.app.App;

  beforeEach(() => {
    mockFirebaseApp = {} as firebase.app.App;

    mockInitializeApp.mockReturnValue(mockFirebaseApp);
  });

  afterEach(() => {
    mockInitializeApp.mockReset();
  });

  it('should return single firebase app', () => {
    getFirebaseApp();

    const app = getFirebaseApp();

    expect(app).toBe(mockFirebaseApp);
    expect(mockInitializeApp).toBeCalledTimes(1);
  });
});
