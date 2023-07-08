import { AuthProvider } from '@/features/auth';
import './globals.css';
import 'react-spring-bottom-sheet/dist/style.css';
import { Footer } from '@/widgets/footer';

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
        <AuthProvider>
          <main className="min-h-screen flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
