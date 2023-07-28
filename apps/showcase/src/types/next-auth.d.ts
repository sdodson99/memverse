import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    channelId?: string;
    isMember?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    channelId?: string;
    isMember?: boolean;
  }
}
