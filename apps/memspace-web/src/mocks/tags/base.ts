export const base = {
  get: {
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/members`]:
      async () => ({
        data: [
          {
            id: '1',
            username: 'Username 1',
            photoUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1280px-Kittyply_edit1.jpg',
            message: 'Message 1',
          },
          {
            id: '2',
            username: 'Username 2',
            photoUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Felis_silvestris_catus_lying_on_rice_straw.jpg/1280px-Felis_silvestris_catus_lying_on_rice_straw.jpg',
            message: 'Message 2',
          },
          {
            id: '3',
            username: 'Username 3',
            photoUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Domestic_Cat_Face_Shot.jpg/1280px-Domestic_Cat_Face_Shot.jpg',
            message: 'Message 3',
          },
        ],
      }),
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account`]:
      async () => ({
        data: {
          id: '1',
        },
      }),
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`]:
      async () => ({
        data: {
          content: 'Hello world!',
        },
      }),
  },
  post: {
    [`${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_BASE_URL}/login`]: async <
      D
    >(
      _data: D
    ) => {
      return {
        data: {
          token: 'access-token',
          expiresIn: 3600,
        },
      };
    },
  },
  put: {
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/account/message`]:
      async <D>(_data: D) => {
        return { data: null };
      },
  },
};
