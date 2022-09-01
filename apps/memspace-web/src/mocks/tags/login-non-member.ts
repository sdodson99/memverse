import { base } from './base';

export const loginNonMember = {
  ...base,
  post: {
    ...base.post,
    [`${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`]: async <
      D
    >(
      _data: D
    ) => {
      // eslint-disable-next-line no-throw-literal
      throw {
        response: {
          status: 403,
        },
      };
    },
  },
};
