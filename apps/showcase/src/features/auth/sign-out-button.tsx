'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react';
import { useAuthContext } from './auth-context';

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
    await signOut();

    onClick?.(e);
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
