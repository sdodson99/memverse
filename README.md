# Memverse

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A suite of projects for YouTube Member perks.

Website: https://memverse.web.app

# Table of Contents

- [Applications](#applications)
- [Tech Stack](#tech-stack)
- [How to Run Locally](#how-to-run-locally)
  - [Authentication Server](#authentication-server)
  - [Memspace Server](#memspace-server)
  - [Memspace Web](#memspace-web)
- [Contributing](#contributing)

# Applications

The following table describes the applications in the Memverse suite.

| Name                  | Description                                               |                                      Source Code                                      |
| --------------------- | --------------------------------------------------------- | :-----------------------------------------------------------------------------------: |
| Memspace Web          | Front-end web application for Memspace.                   |     [Go to](https://github.com/sdodson99/memverse/tree/master/apps/memspace-web)      |
| Memspace Server       | Back-end Express application for Memspace business logic. |    [Go to](https://github.com/sdodson99/memverse/tree/master/apps/memspace-server)    |
| Authentication Server | Authenticate YouTube channel members.                     | [Go to](https://github.com/sdodson99/memverse/tree/master/apps/authentication-server) |

More applications are on the way!

# Tech Stack

- Next.js
- Express
- Firebase (Functions, Realtime Database, Hosting)

# How to Run Locally

## Authentication Server

1. Change directory to "apps/authentication-server".

```
cd apps/authentication-server
```

2. Install packages

```
npm install
```

3. Create a file named '.runtimeconfig.json' with the following environment variables.

```
{
  "youtube_studio": {
    "api_key": "<API KEY FROM YOUTUBE STUDIO REQUEST>",
    "channel_id": "<YOUTUBE CHANNEL ID>",
    "cookie_header": "<COOKE HEADER FROM YOUTUBE STUDIO REQUEST>",
    "authorization_header": "<AUTHORIZATION HEADER FROM YOUTUBE STUDIO REQUEST>",
    "user_behalf_id": "<ON BEHALF OF USER FROM YOUTUBE STUDIO REQUEST>"
  },
  "access_token": {
    "secret_key": "<SECRET SIGNING KEY>",
    "expires_in": "<SECONDS TO EXPIRE>"
  }
}
```

4. Start the application

```
npm run dev
```

## Memspace Server

1. Change directory to "apps/memspace-server".

```
cd apps/memspace-server
```

2. Install packages

```
npm install
```

3. Create a file named '.runtimeconfig.json' with the following environment variables.

```
{
  "youtube_studio": {
    "api_key": "<API KEY FROM YOUTUBE STUDIO REQUEST>",
    "channel_id": "<YOUTUBE CHANNEL ID>",
    "cookie_header": "<COOKE HEADER FROM YOUTUBE STUDIO REQUEST>",
    "authorization_header": "<AUTHORIZATION HEADER FROM YOUTUBE STUDIO REQUEST>",
    "user_behalf_id": "<ON BEHALF OF USER FROM YOUTUBE STUDIO REQUEST>"
  },
  "access_token": {
    "secret_key": "<SECRET SIGNING KEY>"
  }
}
```

4. Start the application

```
npm run dev
```

## Memspace Web

1. Run [Authentication Server](#authentication-server) and [Memspace Server](#memspace-server)

2. Install packages

```
npm install
```

3. Start the application

```
npm run dev
```

# Contributing

Please create a new issue if you have any questions, problems, or suggestions. Feel free to open a pull request if you have a feature or fix you want to contribute to the project.
