import { createServiceProvider } from '@/app/create-service-provider';
import { SignInButton, SignOutButton } from '@/features/auth';
import { UpdateMemberMessageToggleButton } from '@/features/update-member-message';
import { NextPageRequest } from '@/shared/http';
import Image from 'next/image';

export async function Toolbar(request: NextPageRequest) {
  const { getServerSession } = createServiceProvider(request.searchParams);

  const session = await getServerSession();
  const isLoggedIn = Boolean(session);

  return (
    <section className="flex items-center justify-center text-black px-12 py-4">
      {isLoggedIn ? <UpdateMemberMessageToggleButton /> : null}

      {!isLoggedIn ? (
        <SignInButton className="mx-8">
          <Image
            src="/open-lock-emoji.png"
            alt="Sign In"
            width="50"
            height="50"
          />
        </SignInButton>
      ) : (
        <SignOutButton className="mx-8">
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
