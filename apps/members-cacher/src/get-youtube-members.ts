export type Member = {
  channelId: string;
  username: string;
  photoUrl: string;
};

type MemberListingResponse = {
  items: MemberResponse[];
};

type MemberResponse = {
  snippet: {
    memberDetails: {
      channelId: string;
      displayName: string;
      profileImageUrl: string;
    };
  };
};

export async function getYouTubeMembers(): Promise<Member[]> {
  const youTubeAccessToken = await getYouTubeAccessToken();

  const membersApiResponse = await fetch(
    'https://www.googleapis.com/youtube/v3/members?part=snippet&maxResults=1000',
    {
      headers: {
        Authorization: `Bearer ${youTubeAccessToken}`,
        ['Content-Type']: 'application/json',
      },
    }
  );

  const membersList: MemberListingResponse = await membersApiResponse.json();

  return membersList.items
    .map((m) => m?.snippet?.memberDetails)
    .filter(Boolean)
    .map((m) => ({
      channelId: m.channelId,
      username: m.displayName,
      photoUrl: m.profileImageUrl,
    }));
}

async function getYouTubeAccessToken() {
  const youTubeOAuthRefreshToken = process.env.YOUTUBE_OAUTH_REFRESH_TOKEN;

  const refreshTokenResponse = await fetch(
    'https://oauth2.googleapis.com/token',
    {
      method: 'POST',
      headers: {
        ['Content-Type']: 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: youTubeOAuthRefreshToken ?? '',
      }),
    }
  );

  const { access_token } = await refreshTokenResponse.json();

  return access_token;
}
