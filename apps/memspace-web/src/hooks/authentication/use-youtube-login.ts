import { useGoogleIdentityServicesContext } from './google-identity-services/use-google-identity-services-context';

export const useYouTubeLogin = () => {
  const { client, initialized } = useGoogleIdentityServicesContext();

  const youTubeLogin = async () => {
    if (!client) {
      throw new Error('Client not initialized.');
    }

    return new Promise<string>((resolve, reject) => {
      client.callback = (response) => {
        if (!response.access_token) {
          return reject(
            new Error('No access token returned from Google Auth.')
          );
        }

        return resolve(response.access_token);
      };

      client.requestAccessToken();
    });
  };

  const isInitializing = !initialized;

  return { login: youTubeLogin, isInitializing };
};
