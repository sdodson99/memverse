import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  activeClassName?: string;
};

const ActiveLink = ({
  children,
  href,
  className = '',
  activeClassName = '',
}: ActiveLinkProps) => {
  const { pathname } = useRouter();

  const isActive = pathname === href;

  const getClassName = (): string => {
    let calculatedClassName = className;

    if (isActive) {
      calculatedClassName += ` ${activeClassName}`;
    }

    return calculatedClassName;
  };

  return (
    <Link href={href}>
      <a className={getClassName()} data-testid="ActiveLink">
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
