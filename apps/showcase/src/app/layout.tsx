import { AuthProvider } from '@/features/auth';
import './globals.css';
import 'react-spring-bottom-sheet/dist/style.css';
import Script from 'next/script';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Showcase - SingletonSean Members',
  description: 'A showcase for members of the SingletonSean YouTube channel.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const channelId = session?.channelId;

  console.log('Signed in:', Boolean(channelId));

  return (
    <html lang="en">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`window.analytics = window.analytics || {}; 
            window.analytics.userId = "${channelId}";
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K4DGPB4');`}
        </Script>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4DGPB4" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
      </body>
    </html>
  );
}
