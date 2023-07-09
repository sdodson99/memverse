import { AuthProvider } from '@/features/auth';
import './globals.css';
import 'react-spring-bottom-sheet/dist/style.css';

export const metadata = {
  title: 'Showcase - SingletonSean Members',
  description: 'A showcase for members of the SingletonSean YouTube channel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
