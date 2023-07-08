'use client';

import { Session } from 'next-auth';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type AuthContextValue = {
  useSession: typeof useSession;
  signIn: typeof signIn;
  signOut: typeof signOut;
};

const AuthContext = createContext<AuthContextValue>({
  useSession: (() => {}) as typeof useSession,
  signIn: (() => {}) as typeof signIn,
  signOut: (() => {}) as typeof signOut,
});

export const useAuthContext = () => useContext(AuthContext);

type AuthProviderProps = PropsWithChildren<{}>;

export function AuthProvider({ children }: AuthProviderProps) {
  const searchParams = useSearchParams();
  const mock = searchParams.get('mock');

  if (mock) {
    return <MockAuthProvider>{children}</MockAuthProvider>;
  }

  return (
    <SessionProvider>
      <RealAuthProvider>{children}</RealAuthProvider>
    </SessionProvider>
  );
}

function RealAuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        useSession,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function MockAuthProvider({ children }: AuthProviderProps) {
  const searchParams = useSearchParams();

  const [session, setSession] = useState<Session | null>(() => {
    const mockChannelId = searchParams.get('mockChannelId');

    if (!mockChannelId) {
      return null;
    }

    return {
      channelId: mockChannelId.toString(),
      expires: '3600',
    };
  });

  const mockUseSession = (() => ({
    data: session,
  })) as unknown as typeof useSession;

  const mockSignIn = (() => {
    setSession({ expires: '3600' });
  }) as typeof signIn;

  const mockSignOut = (() => {
    setSession(null);
  }) as typeof signOut;

  return (
    <AuthContext.Provider
      value={{
        useSession: mockUseSession,
        signIn: mockSignIn,
        signOut: mockSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
