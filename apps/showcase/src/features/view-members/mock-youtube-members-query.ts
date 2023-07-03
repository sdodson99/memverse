export class MockYouTubeMembersQuery {
  async execute() {
    return [
      {
        channelId: '1',
        username: 'Username 1',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1280px-Kittyply_edit1.jpg',
      },
      {
        channelId: '2',
        username: 'Username 2',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1280px-Kittyply_edit1.jpg',
      },
      {
        channelId: '3',
        username: 'Username 3',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1280px-Kittyply_edit1.jpg',
      },
    ];
  }
}
