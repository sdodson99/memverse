import { Session, getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { Mock } from 'vitest';

vi.mock('next-auth');
vi.mock('next-auth/react');

const mockGetServerSession = getServerSession as Mock;
const mockSignIn = signIn as Mock;
const mockSignOut = signOut as Mock;

let session: Session | null = null;

export function setSession(value: Session | null) {
  session = value;
}

beforeEach(() => {
  mockGetServerSession.mockImplementation(() => session);
  mockSignIn.mockImplementation(() => setSession({ expires: '' }));
  mockSignOut.mockImplementation(() => setSession(null));
});

afterEach(() => {
  mockGetServerSession.mockReset();
  mockSignIn.mockReset();
  mockSignOut.mockReset();
});
