'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react';
import { useAuthContext } from './auth-context';

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
    await signIn('google');

    onClick?.(e);
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
