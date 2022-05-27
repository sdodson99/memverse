export const getFirebaseConfig = () => {
  const secretKey =
    'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest';

  return {
    youtube_studio: {},
    access_token: {
      secret_key: secretKey,
      expires_in: '3600',
    },
  };
};
