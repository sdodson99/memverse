import React, { ReactNode, useEffect, useState } from 'react';
import { getGis } from '../../../utilities/google-identity-services';
import {
  GoogleIdentityServicesContext,
  GoogleIdentityServices,
} from './use-google-identity-services-context';

export type RealGoogleIdentityServicesProviderProps = {
  clientId: string;
  scope: string;
  children?: ReactNode;
};

export const RealGoogleIdentityServicesProvider = ({
  clientId,
  scope,
  children,
}: RealGoogleIdentityServicesProviderProps) => {
  const [client, setClient] = useState<GoogleTokenClient>();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<Error>();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-testid', 'gisscript');
    script.onload = () => setScriptLoaded(true);
    script.onerror = (e) => setScriptError(new Error(e.toString()));

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded) {
      return;
    }

    const client = getGis().accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: scope,
    });

    setClient(client);
  }, [scriptLoaded, clientId, scope]);

  const realGoogleIdentityServices: GoogleIdentityServices = {
    client,
    initialized: !!client,
    error: scriptError,
  };

  return (
    <GoogleIdentityServicesContext.Provider value={realGoogleIdentityServices}>
      {children}
    </GoogleIdentityServicesContext.Provider>
  );
};
