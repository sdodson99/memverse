import React from 'react';
import { useMockTagContext } from '../../use-mock-tag-context';
import { MockFirebaseAuthProvider } from './mock-firebase-auth-provider';
import {
  RealFirebaseAuthProvider,
  RealFirebaseAuthProviderProps,
} from './real-firebase-auth-provider';

type FirebaseAuthProviderProps = RealFirebaseAuthProviderProps;

export const FirebaseAuthProvider = (props: FirebaseAuthProviderProps) => {
  const mockTag = useMockTagContext();

  if (mockTag) {
    return <MockFirebaseAuthProvider {...props} />;
  }

  return <RealFirebaseAuthProvider {...props} />;
};
