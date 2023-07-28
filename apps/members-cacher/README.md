# SingletonSean Members Cacher

A scheduled Firebase Function job to update the cached of [SingletonSean](https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg) YouTube members.

## Why Cache?

The YouTube API has a limited quota. Additionally, the YouTube Memberships API already has limited access. Without
a cache, we would need to hit the YouTube API everytime we need to fetch members. Caching ensures we will not
overstep our usage of the exclusive API. Plus, the list of members does not change very frequently.

## Technologies

- TypeScript
- Firebase Functions
- Firebase Realtime Database

## How to Run Locally

1. Install packages.

```
pnpm install
```

2. Add a `.env` file with following values.

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
YOUTUBE_OAUTH_REFRESH_TOKEN=
```

> To get a `YOUTUBE_OAUTH_REFRESH_TOKEN`, use the tool in the `./tools/youtube-api-refresh-token` directory.

3. Start the Firebase Emulator Suite.

```
pnpm emulators
```

4. Run the Firebase Functions application.

```
pnpm dev
```

5. Execute the function via the functions shell.

```
updateMembersCache()
```
