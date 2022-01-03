import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GApiProvider } from 'react-gapi-auth2';
import { AccessTokenProvider } from '../hooks/use-access-token-context';

const googleClientConfig = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  scope: 'https://www.googleapis.com/auth/youtube.readonly',
};

function App({ Component, pageProps }: AppProps) {
  return (
    <GApiProvider clientConfig={googleClientConfig}>
      <AccessTokenProvider>
        <Component {...pageProps} />
      </AccessTokenProvider>
    </GApiProvider>
  );
}

export default App;
