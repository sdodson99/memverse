import { base } from './base';

export const getMemberMessageUnauthorized = {
  ...base,
  get: {
    ...base.get,
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`]:
      async () => {
        // eslint-disable-next-line no-throw-literal
        throw {
          isAxiosError: true,
          response: {
            status: 401,
          },
        };
      },
  },
};
