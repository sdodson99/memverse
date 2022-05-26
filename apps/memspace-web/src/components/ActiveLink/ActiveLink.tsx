import { useRouter } from 'next/router';
import React from 'react';
import Link, { LinkProps } from '../Link/Link';

type ActiveLinkProps = {
  className?: string;
  activeClassName?: string;
} & LinkProps;

const ActiveLink = ({
  className = '',
  activeClassName = '',
  href,
  children,
  ...others
}: ActiveLinkProps) => {
  const { pathname } = useRouter();

  const isActive = pathname === href.pathname;

  const getClassName = (): string => {
    let calculatedClassName = className;

    if (isActive) {
      calculatedClassName += ` ${activeClassName}`;
    }

    return calculatedClassName;
  };

  return (
    <Link href={href} {...others}>
      <a className={getClassName()} data-testid="ActiveLink">
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
