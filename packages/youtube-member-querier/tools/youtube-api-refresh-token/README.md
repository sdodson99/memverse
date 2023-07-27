# YouTueb API Refresh Token Generator

Use this tool to get a YouTube API refresh token with scopes to access the YouTube Members API endpoints.

## Setup

1. Create a `.env` file at the project root

2. Add the following values for the Google OAuth2 flow

```
GOOGLE_CLIENT_ID=<value>
GOOGLE_CLIENT_SECRET=<value>
```

## Getting a Refresh Token

1. Run the tool

```
deno task start
```

2. Open the link in the console to start the Google OAuth2 flow

3. Complete the Google OAuth2 flow, selecting the YouTube account in which you'd like to query members for

4. Copy the refresh token from the console
