import React, { ReactNode } from 'react';
import {
  GoogleIdentityServicesContext,
  GoogleIdentityServices,
} from './use-google-identity-services-context';

type MockGoogleIdentityServicesProviderProps = {
  children?: ReactNode;
};

export const MockGoogleIdentityServicesProvider = ({
  children,
}: MockGoogleIdentityServicesProviderProps) => {
  const mockGoogleIdentityServices: GoogleIdentityServices = {
    initialized: true,
    client: {
      requestAccessToken: () =>
        mockGoogleIdentityServices.client?.callback?.({
          access_token: 'mock_access_token',
        }),
    },
  };

  return (
    <GoogleIdentityServicesContext.Provider value={mockGoogleIdentityServices}>
      {children}
    </GoogleIdentityServicesContext.Provider>
  );
};
