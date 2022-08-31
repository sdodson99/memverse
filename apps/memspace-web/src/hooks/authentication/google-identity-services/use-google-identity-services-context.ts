import { createContext, useContext } from 'react';

export type GoogleIdentityServices = {
  initialized: boolean;
  client?: GoogleTokenClient;
  error?: Error;
};

export const GoogleIdentityServicesContext =
  createContext<GoogleIdentityServices>({ initialized: false });

export const useGoogleIdentityServicesContext = () =>
  useContext(GoogleIdentityServicesContext);
