import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createServiceProvider } from '@/app/create-service-provider';

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
      const { getYouTubeChannelQuery, getAllYouTubeMembersQuery } =
        createServiceProvider();

      if (account?.access_token) {
        const youTubeChannel = await getYouTubeChannelQuery.execute(
          account.access_token
        );

        token.channelId = youTubeChannel?.id;
      }

      if (token.channelId) {
        const allYouTubeMembers = await getAllYouTubeMembersQuery.execute();

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
