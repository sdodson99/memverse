'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react';
import { useAuthContext } from './auth-context';
import { logAnalyticsEvent } from '@/shared/analytics';

type SignOutButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SignOutButton({
  children,
  onClick,
  ...props
}: SignOutButtonProps) {
  const { signOut } = useAuthContext();

  async function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    logAnalyticsEvent('sign_out_click');

    onClick?.(e);

    await signOut();
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
