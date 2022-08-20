import { useApplicationLogin } from './use-application-login';
import { useYouTubeLogin } from './use-youtube-login';

export const useLogin = () => {
  const { login: youTubeLogin, isInitializing } = useYouTubeLogin();
  const { login: applicationLogin } = useApplicationLogin();

  const login = async () => {
    const accessToken = await youTubeLogin();

    await applicationLogin(accessToken);
  };

  return {
    isInitializing,
    login,
  };
};
