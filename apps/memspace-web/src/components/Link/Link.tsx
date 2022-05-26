import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useMockTagContext } from '../../hooks/use-mock-tag-context';
import { UrlObject } from 'node:url';
import { ParsedUrlQueryInput } from 'querystring';

type LinkUrlObject = { query?: ParsedUrlQueryInput } & Omit<UrlObject, 'query'>;
export type LinkProps = React.PropsWithChildren<
  { href: LinkUrlObject } & Omit<NextLinkProps, 'href'>
>;

const Link = ({ href, ...others }: LinkProps) => {
  const mockTag = useMockTagContext();

  const getHref = () => {
    if (!mockTag) {
      return href;
    }

    return {
      ...href,
      query: {
        ...(href.query ?? {}),
        mock: mockTag,
      },
    };
  };

  return <NextLink href={getHref()} {...others} />;
};

export default Link;
