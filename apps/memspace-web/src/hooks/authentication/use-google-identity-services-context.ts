import constate from 'constate';
import { useEffect, useState } from 'react';
import { getGis } from '../../utilities/google-identity-services';

type GoogleIdentityServicesProps = {
  clientId: string;
  scope: string;
};

const useGoogleIdentityServices = ({
  clientId,
  scope,
}: GoogleIdentityServicesProps) => {
  const [client, setClient] = useState<GoogleTokenClient | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | Event | null>(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-testid', 'gisscript');
    script.onload = () => setScriptLoaded(true);
    script.onerror = (e) => setScriptError(e);

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

  const initialized = client !== null;
  const error = scriptError;

  return {
    client,
    initialized,
    error,
  };
};

const [GoogleIdentityServicesProvider, useGoogleIdentityServicesContext] =
  constate(useGoogleIdentityServices);
export { GoogleIdentityServicesProvider, useGoogleIdentityServicesContext };
