export const useYouTubeLogin = () => {
  const youTubeLogin = async () => {
    const accessToken = '';

    if (!accessToken) {
      throw new Error('No access token returned from Google Auth.');
    }

    return accessToken;
  };

  const isInitializing = true;

  return { login: youTubeLogin, isInitializing };
};
