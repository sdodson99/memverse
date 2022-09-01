import { useApplicationLogin } from './use-application-login';
import { useFirebaseLogin } from './use-firebase-login';
import { useYouTubeLogin } from './use-youtube-login';

export const useLogin = () => {
  const { login: youTubeLogin, isInitializing } = useYouTubeLogin();
  const { login: applicationLogin } = useApplicationLogin();
  const { login: firebaseLogin } = useFirebaseLogin();

  const login = async () => {
    const youTubeAccessToken = await youTubeLogin();

    const firebaseAccessToken = await applicationLogin(youTubeAccessToken);

    await firebaseLogin(firebaseAccessToken);
  };

  return {
    isInitializing,
    login,
  };
};
