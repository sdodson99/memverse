import { Layout } from '@/widgets/layout';
import Image from 'next/image';
import { SignInButton } from './sign-in-button';
import { createServiceProvider } from '../create-service-provider';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const { getServerSession } = createServiceProvider();

  const session = await getServerSession();

  if (session) {
    return redirect('/');
  }

  return (
    <Layout>
      <div className="bg-primary flex min-h-screen items-center justify-center text-white">
        <section>
          <h1 className="text-center text-4xl font-bold">Sign In</h1>
          <article className="mt-12">
            <SignInButton className="rounded bg-white p-8" providerId="google">
              <Image
                src="/youtube-logo.png"
                width="150"
                height="20"
                alt="Sign in with YouTube"
              />
            </SignInButton>
          </article>
        </section>
      </div>
    </Layout>
  );
}
