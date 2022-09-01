import { base } from './base';

export const bulkMembers = {
  ...base,
  get: {
    ...base.get,
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/members`]:
      async () => ({
        data: [...Array(100)].map((_, i) => ({
          id: i.toString(),
          username: `Username ${i}`,
          photoUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1280px-Kittyply_edit1.jpg',
          message: `Message ${i}`,
        })),
      }),
  },
};
