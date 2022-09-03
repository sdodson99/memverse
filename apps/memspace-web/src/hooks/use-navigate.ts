import { useRouter } from 'next/router';
import { useMockTagContext } from './use-mock-tag-context';
import { UrlObject } from 'node:url';
import { ParsedUrlQueryInput } from 'node:querystring';
import { useCallback } from 'react';

export type Url = { query?: ParsedUrlQueryInput } & Omit<UrlObject, 'query'>;

export const useNavigate = () => {
  const router = useRouter();
  const mockTag = useMockTagContext();

  const getUrl = useCallback(
    (url: Url) => {
      if (!mockTag) {
        return url;
      }

      return {
        ...url,
        query: {
          ...(url.query ?? {}),
          mock: mockTag,
        },
      };
    },
    [mockTag]
  );

  const navigate = useCallback(
    async (url: Url) => {
      await router.push(getUrl(url));
    },
    [getUrl, router]
  );

  return navigate;
};
