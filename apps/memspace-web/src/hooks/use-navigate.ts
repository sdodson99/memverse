import { useRouter } from 'next/router';
import { useMockTagContext } from './use-mock-tag-context';
import { UrlObject } from 'node:url';
import { ParsedUrlQueryInput } from 'node:querystring';

export type Url = { query?: ParsedUrlQueryInput } & Omit<UrlObject, 'query'>;

export const useNavigate = () => {
  const router = useRouter();
  const mockTag = useMockTagContext();

  const getUrl = (url: Url) => {
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
  };

  const navigate = async (url: Url) => {
    await router.push(getUrl(url));
  };

  return navigate;
};
