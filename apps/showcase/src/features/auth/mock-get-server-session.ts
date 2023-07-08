import { Session } from 'next-auth';

type MockGetServerSessionOptions = {
  channelId?: string;
};

export function mockGetServerSession(
  options?: MockGetServerSessionOptions
): Session | null {
  if (!options?.channelId) {
    return null;
  }

  return {
    channelId: options.channelId,
    expires: '3600',
  };
}
