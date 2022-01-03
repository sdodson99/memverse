import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GApiProvider } from 'react-gapi-auth2';

const googleClientConfig = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  scope: 'https://www.googleapis.com/auth/youtube.readonly',
};

function App({ Component, pageProps }: AppProps) {
  return (
    <GApiProvider clientConfig={googleClientConfig}>
      <Component {...pageProps} />
    </GApiProvider>
  );
}

export default App;
