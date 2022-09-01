import { base } from './base';

export const loginFailed = {
  ...base,
  post: {
    ...base.post,
    [`${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`]: async <
      D
    >(
      _data: D
    ) => {
      throw new Error();
    },
  },
};
