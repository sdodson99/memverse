import { GoogleOAuth } from 'https://deno.land/x/google/oauth.ts';
import { load as loadEnvFile } from 'https://deno.land/std/dotenv/mod.ts';

const env = await loadEnvFile();

const googleOAuthClient = new GoogleOAuth({
    client_id: env['GOOGLE_CLIENT_ID'],
    client_secret: env['GOOGLE_CLIENT_SECRET'],
    redirect_uri: 'http://localhost:3000',
    scopes: [
        'https://www.googleapis.com/auth/youtube.channel-memberships.creator',
    ],
});

const googleOAuthLink = googleOAuthClient.buildAuthLink();

console.log(googleOAuthLink);

Deno.serve({ port: 3000 }, async (req) => {
    const reqUrl = new URL(req.url);

    const code = reqUrl.searchParams.get('code');

    if (!code) {
        return new Response('OAuth2 code not found on return URL.');
    }

    const tokens = await googleOAuthClient.getTokens(code);

    console.log(JSON.stringify(tokens, null, 2));

    return new Response(
        'Successfully authenticated! See the console logs for tokens.'
    );
});
