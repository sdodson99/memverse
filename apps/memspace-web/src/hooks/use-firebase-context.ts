import { useEffect, useState } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import constate from 'constate';
import { getFirebaseConfig, isProduction } from '../configuration';

const useFirebase = () => {
  const [app, setApp] = useState<FirebaseApp>();

  useEffect(() => {
    const initializedApp = initializeApp(getFirebaseConfig());
    setApp(initializedApp);

    getAnalytics();

    if (!isProduction()) {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
  }, []);

  return { app };
};

const [FirebaseProvider, useFirebaseContext] = constate(useFirebase);

export { FirebaseProvider, useFirebaseContext };
