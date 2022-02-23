import { useGoogleAuth } from 'react-gapi-auth2';

export const useYouTubeLogin = () => {
  const auth = useGoogleAuth();

  const youTubeLogin = async () => {
    const user = await auth.googleAuth?.signIn();
    const authResponse = user?.getAuthResponse();

    const accessToken = authResponse?.access_token;

    if (!accessToken) {
      throw new Error('No access token returned from Google Auth.');
    }

    return accessToken;
  };

  return youTubeLogin;
};
