import { Mock } from 'vitest';
import { GetYouTubeChannelQuery } from './get-youtube-channel-query';
import { when } from 'jest-when';

describe('GetYouTubeChannelQuery', () => {
  let query: GetYouTubeChannelQuery;

  let mockFetch: Mock;
  let mockFetchResultFn: Mock;

  let accessToken: string;

  beforeEach(() => {
    accessToken = 'access-token-123';

    mockFetch = vi.fn();
    mockFetchResultFn = vi.fn();
    when(mockFetch)
      .calledWith(
        'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
        {
          headers: {
            Authorization: `Bearer access-token-123`,
          },
        }
      )
      .mockImplementation(() => mockFetchResultFn());

    query = new GetYouTubeChannelQuery(mockFetch);
  });

  it("returns user's channel", async () => {
    mockFetchResultFn.mockReturnValue({
      ok: true,
      json: () => ({ items: [{ id: 'channel-123' }] }),
    });

    const channel = await query.execute(accessToken);

    expect(channel?.id).toBe('channel-123');
  });

  it('returns null when request does not succeed', async () => {
    mockFetchResultFn.mockReturnValue({
      ok: false,
    });

    const channel = await query.execute(accessToken);

    expect(channel).toBeNull();
  });

  it('returns null channel not found', async () => {
    mockFetchResultFn.mockReturnValue({
      ok: true,
      json: () => ({ items: [] }),
    });

    const channel = await query.execute(accessToken);

    expect(channel).toBeNull();
  });

  it('returns null when query fails', async () => {
    mockFetchResultFn.mockImplementation(() => {
      throw new Error();
    });
    const channel = await query.execute(accessToken);

    expect(channel).toBeNull();
  });
});
