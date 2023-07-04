'use client';

import { PropsWithChildren, createContext, useContext } from 'react';
import { Member } from './member';

type MembersContextData = {
  members: Member[];
};

const MembersContext = createContext<MembersContextData>({ members: [] });

export function useMembersContext() {
  return useContext(MembersContext);
}

type MembersProviderProps = PropsWithChildren<{
  members: Member[];
}>;

export function MembersProvider({ members, children }: MembersProviderProps) {
  return (
    <MembersContext.Provider value={{ members }}>
      {children}
    </MembersContext.Provider>
  );
}
