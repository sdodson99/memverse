import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createServiceProvider } from '@/app/create-service-provider';
import { DateTime } from 'luxon';

const IS_MEMBER_FLAG_EXPIRATION_HOURS = 24;

function isMemberFlagExpired(isMemberRefreshedAt?: number) {
  if (!isMemberRefreshedAt) {
    return true;
  }

  return (
    DateTime.fromMillis(isMemberRefreshedAt).diffNow('hours').hours >
    IS_MEMBER_FLAG_EXPIRATION_HOURS
  );
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/signin',
  },
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

      if (token.channelId && isMemberFlagExpired(token.isMemberRefreshedAt)) {
        const allYouTubeMembers = await getAllYouTubeMembersQuery.execute();

        token.isMember = allYouTubeMembers.some(
          (m) => m.channelId === token.channelId
        );
        token.isMemberRefreshedAt = DateTime.now().toMillis();
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
