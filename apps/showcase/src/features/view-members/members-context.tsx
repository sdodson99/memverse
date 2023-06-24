'use client';

import { PropsWithChildren, createContext, useContext } from 'react';
import { YouTubeMember } from 'youtube-member-querier';

type MembersContextData = {
  members: YouTubeMember[];
};

const MembersContext = createContext<MembersContextData>({ members: [] });

export function useMembersContext() {
  return useContext(MembersContext);
}

type MembersProviderProps = PropsWithChildren<{
  members: YouTubeMember[];
}>;

export function MembersProvider({ members, children }: MembersProviderProps) {
  return (
    <MembersContext.Provider value={{ members }}>
      {children}
    </MembersContext.Provider>
  );
}
