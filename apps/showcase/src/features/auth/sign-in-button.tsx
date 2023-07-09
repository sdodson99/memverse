'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react';
import { useAuthContext } from './auth-context';
import { logAnalyticsEvent } from '@/shared/analytics';

type SignInButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SignInButton({
  children,
  onClick,
  ...props
}: SignInButtonProps) {
  const { signIn } = useAuthContext();

  async function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    logAnalyticsEvent('sign_in_click');

    onClick?.(e);

    await signIn('google');
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
