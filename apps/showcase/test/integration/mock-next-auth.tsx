import { Session, getServerSession } from 'next-auth';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { Mock } from 'vitest';

vi.mock('next-auth');
vi.mock('next-auth/react');

const mockGetServerSession = getServerSession as Mock;
const mockUseSession = useSession as Mock;
const mockSignIn = signIn as Mock;
const mockSignOut = signOut as Mock;
const mockSessionProvider = SessionProvider as Mock;

let session: Session | null = null;

export function setSession(value: Session | null) {
  session = value;
}

beforeEach(() => {
  mockGetServerSession.mockImplementation(() => session);
  mockUseSession.mockImplementation(() => ({ data: session }));
  mockSignIn.mockImplementation(() => setSession({ expires: '' }));
  mockSignOut.mockImplementation(() => setSession(null));
  mockSessionProvider.mockImplementation(function MockSessionProvider({
    children,
  }: PropsWithChildren<{}>) {
    return children;
  });
});

afterEach(() => {
  mockGetServerSession.mockReset();
  mockUseSession.mockReset();
  mockSignIn.mockReset();
  mockSignOut.mockReset();
  mockSessionProvider.mockReset();
});
