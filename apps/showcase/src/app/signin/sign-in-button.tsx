'use client';

import { useAuthContext } from '@/features/auth';
import { PropsWithChildren } from 'react';

type SignInButtonProps = PropsWithChildren<{
  className?: string;
  providerId: string;
}>;

export function SignInButton({
  children,
  className,
  providerId,
}: SignInButtonProps) {
  const { signIn } = useAuthContext();

  const onSignInClick = () => signIn(providerId);

  return (
    <button className={className} type="button" onClick={onSignInClick}>
      {children}
    </button>
  );
}
