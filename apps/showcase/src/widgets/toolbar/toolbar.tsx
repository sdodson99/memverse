import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SignInButton, SignOutButton } from '@/features/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export async function Toolbar() {
  const isLoggedIn = await getServerSession(authOptions);

  return (
    <section className="flex items-center justify-center text-black px-12 py-4">
      {!isLoggedIn ? (
        <SignInButton className="text-4xl">
          <Image
            src="/open-lock-emoji.png"
            alt="Sign In"
            width="50"
            height="50"
          />
        </SignInButton>
      ) : (
        <SignOutButton className="text-4xl">
          <Image
            src="/closed-lock-emoji.png"
            alt="Sign Out"
            width="50"
            height="50"
          />
        </SignOutButton>
      )}
    </section>
  );
}
