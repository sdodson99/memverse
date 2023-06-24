import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import { mockYouTubeMembersQueryExecute } from '../../test/integration/mock-youtube-member-querier';

describe('<Home />', () => {
  it('renders members', async () => {
    mockYouTubeMembersQueryExecute.mockReturnValue([
      {
        channelId: '1',
        username: 'username-1',
        photoUrl: 'photo-url-1',
      },
      {
        channelId: '2',
        username: 'username-2',
        photoUrl: 'photo-url-2',
      },
      {
        channelId: '3',
        username: 'username-3',
        photoUrl: 'photo-url-3',
      },
    ]);

    render(await Home());

    expect(screen.getByText('username-1')).toBeInTheDocument();
    expect(screen.getByText('username-2')).toBeInTheDocument();
    expect(screen.getByText('username-3')).toBeInTheDocument();
    expect(screen.getByAltText('photo-url-1')).toBeInTheDocument();
    expect(screen.getByAltText('photo-url-2')).toBeInTheDocument();
    expect(screen.getByAltText('photo-url-3')).toBeInTheDocument();
  });
});
