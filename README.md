# SingletonSean Members

A suite of projects for [SingletonSean](https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg) YouTube Member perks.

Website: https://members.seandodson.com

## Table of Contents

-   [Applications](#applications)
-   [Technologies](#technologies)
-   [How to Run Locally](#how-to-run-locally)
    -   [Showcase](#showcase)
-   [Contributing](#contributing)

## Applications

Current applications in the Singletonsean Members suite:

| Name     | Description         |                                          Source Code                                           |
| -------- | ------------------- | :--------------------------------------------------------------------------------------------: |
| Showcase | Display of members. | [/apps/showcase](https://github.com/sdodson99/singletonsean-members/tree/master/apps/showcase) |

More applications are on the way!

## Technologies

-   TypeScript
-   Next.js (App Directory!)
-   NextAuth
-   Tailwind
-   Google Analytics
-   Vercel

## How to Run Locally

### Showcase

1. Go to Showcase application directory.

```
cd /apps/showcase
```

2. Install packages.

```
pnpm install
```

3. Create a `.env.local` file with the following values.

```
YOUTUBE_CHANNEL_ID=
YOUTUBE_API_KEY=
YOUTUBE_ON_BEHALF_OF_USER=
YOUTUBE_AUTHORIZATION_HEADER=
YOUTUBE_COOKIE_HEADER=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_DATABASE_URL=
FIREBASE_CLIENT_EMAIL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
```

4. Start the application.

```
pnpm dev
```

## Contributing

Please create a new issue if you have any questions, problems, or suggestions. Feel free to open a pull request if you have a feature or fix you want to contribute to the project.
