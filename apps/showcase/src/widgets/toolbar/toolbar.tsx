import { SignInButton, SignOutButton } from '@/features/auth';
import { getServerSession } from '@/features/auth/get-server-session';
import { UpdateMemberMessageToggleButton } from '@/features/update-member-message';
import { ViewMembersListingToggleButton } from '@/features/view-members';
import { NextPageRequest } from '@/shared/http';
import { Tooltip } from '@/shared/tooltip';
import Image from 'next/image';

export async function Toolbar(
  props: NextPageRequest & { getServerSession: typeof getServerSession }
) {
  const session = await props.getServerSession();
  const isLoggedIn = Boolean(session);

  return (
    <section className="flex items-center justify-center text-black px-12 py-4">
      <Tooltip label="View Members">
        <ViewMembersListingToggleButton />
      </Tooltip>

      {isLoggedIn ? (
        <>
          <Tooltip label="Update Message">
            <UpdateMemberMessageToggleButton />
          </Tooltip>
        </>
      ) : null}

      {!isLoggedIn ? (
        <Tooltip label="Sign In">
          <SignInButton className="mx-5">
            <Image
              src="/open-lock-emoji.png"
              alt="Sign In"
              width="50"
              height="50"
            />
          </SignInButton>
        </Tooltip>
      ) : (
        <Tooltip label="Sign Out">
          <SignOutButton className="mx-5">
            <Image
              src="/closed-lock-emoji.png"
              alt="Sign Out"
              width="50"
              height="50"
            />
          </SignOutButton>
        </Tooltip>
      )}
    </section>
  );
}
