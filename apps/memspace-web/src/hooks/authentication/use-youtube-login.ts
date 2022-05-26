import { useMockTagContext } from '../use-mock-tag-context';
import { useGoogleIdentityServicesContext } from './use-google-identity-services-context';

export const useYouTubeLogin = () => {
  const { client, initialized } = useGoogleIdentityServicesContext();

  const mockTag = useMockTagContext();

  const youTubeLogin = async () => {
    if (mockTag) {
      return Promise.resolve('mock-google-access-token');
    }

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
