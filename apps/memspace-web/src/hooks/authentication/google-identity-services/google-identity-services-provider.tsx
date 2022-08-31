import React from 'react';
import { useMockTagContext } from '../../use-mock-tag-context';
import { MockGoogleIdentityServicesProvider } from './mock-google-identity-services-provider';
import {
  RealGoogleIdentityServicesProvider,
  RealGoogleIdentityServicesProviderProps,
} from './real-google-identity-services-provider';

type GoogleIdentityServicesProviderProps =
  RealGoogleIdentityServicesProviderProps;

export const GoogleIdentityServicesProvider = (
  props: GoogleIdentityServicesProviderProps
) => {
  const mockTag = useMockTagContext();

  if (mockTag) {
    return <MockGoogleIdentityServicesProvider {...props} />;
  }

  return <RealGoogleIdentityServicesProvider {...props} />;
};
