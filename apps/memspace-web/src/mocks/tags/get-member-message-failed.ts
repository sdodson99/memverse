import { base } from './base';

export const getMemberMessageFailed = {
  ...base,
  get: {
    ...base.get,
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`]:
      async () => {
        throw new Error();
      },
  },
};
