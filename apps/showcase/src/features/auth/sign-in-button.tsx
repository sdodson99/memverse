'use client';

import { signIn } from 'next-auth/react';
import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react';

type SignInButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SignInButton({
  children,
  onClick,
  ...props
}: SignInButtonProps) {
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
