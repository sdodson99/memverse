export const base = {
  get: {
    [`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/members`]: {
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
    },
  },
};
