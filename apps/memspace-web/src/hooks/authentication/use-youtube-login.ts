import { useGoogleIdentityServicesContext } from './google-identity-services/use-google-identity-services-context';

export const useYouTubeLogin = () => {
  const { client, initialized } = useGoogleIdentityServicesContext();

  const youTubeLogin = async () => {
    if (!client) {
      throw new Error('Client not initialized.');
    }

    return new Promise<string>((resolve, reject) => {
      const focusEventHandler = () => {
        reject(new Error('client_focused_back_to_window'));
        window.removeEventListener('focus', focusEventHandler);
      };

      // When user focuses our application, cancel the login flow and throw an error.
      // This will handle cases where the user closes out of the login flow.
      // Without this functionality, the login flow would never finish and we could
      // infinitely show a loading spinner on the UI.
      window.addEventListener('focus', focusEventHandler);

      client.callback = (response) => resolve(response.access_token);

      client.requestAccessToken();
    });
  };

  const isInitializing = !initialized;

  return { login: youTubeLogin, isInitializing };
};
