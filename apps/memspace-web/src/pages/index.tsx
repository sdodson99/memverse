import type { NextPage } from 'next';
import { useGoogleAuth, useGoogleUser } from 'react-gapi-auth2';

const Home: NextPage = () => {
  const loggedInUserValue = useGoogleUser();
  const auth = useGoogleAuth();

  const handleLoginClick = async () => {
    const user = await auth.googleAuth?.signIn();
    const authResponse = user?.getAuthResponse();

    const accessToken = authResponse?.access_token;
    console.log(accessToken);
  };

  const isLoggedIn = loggedInUserValue.currentUser !== null;

  return (
    <div>
      <div>
        {isLoggedIn && (
          <>You are now logged in! Thank you for being a member.</>
        )}
        {!isLoggedIn && (
          <div>
            <div>You are not logged in.</div>
            <button onClick={handleLoginClick}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
