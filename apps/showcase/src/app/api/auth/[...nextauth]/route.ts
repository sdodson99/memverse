import { GetYouTubeChannelQuery } from '@/features/auth/get-youtube-channel-query';
import { GetAllYouTubeMembersQuery } from '@/features/view-members';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import firebase from 'firebase-admin';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid https://www.googleapis.com/auth/youtube.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        const youTubeChannel = await new GetYouTubeChannelQuery(fetch).execute(
          account.access_token
        );

        token.channelId = youTubeChannel?.id;
      }

      if (token.channelId) {
        const allYouTubeMembers = await new GetAllYouTubeMembersQuery(
          firebase.app()
        ).execute();

        token.isMember = allYouTubeMembers.some(
          (m) => m.channelId === token.channelId
        );
      }

      return token;
    },
    async session({ session, token }) {
      session.channelId = token.channelId;
      session.isMember = token.isMember;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
