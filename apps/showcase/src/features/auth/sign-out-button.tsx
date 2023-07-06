'use client';

import { signOut } from 'next-auth/react';
import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react';

type SignOutButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SignOutButton({
  children,
  onClick,
  ...props
}: SignOutButtonProps) {
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
