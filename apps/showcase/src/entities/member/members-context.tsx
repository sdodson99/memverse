'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Member } from './member';

type UpdateMemberMessageListener = (memberId: string, message: string) => void;

type MembersContextData = {
  members: Member[];
  updateMemberMessage: (memberId: string, message: string) => void;
  addUpdateMemberMessageListener: (
    callback: UpdateMemberMessageListener
  ) => void;
  removeUpdateMemberMessageListener: (
    callback: UpdateMemberMessageListener
  ) => void;
};

const MembersContext = createContext<MembersContextData>({
  members: [],
  updateMemberMessage: () => {},
  addUpdateMemberMessageListener: () => {},
  removeUpdateMemberMessageListener: () => {},
});

export function useMembersContext() {
  return useContext(MembersContext);
}

type MembersProviderProps = PropsWithChildren<{
  initialMembers: Member[];
}>;

export function MembersProvider({
  initialMembers,
  children,
}: MembersProviderProps) {
  const [members, setMembers] = useState(initialMembers);

  const [updateMemberMessageListeners, setUpdateMemberMessageListeners] =
    useState<UpdateMemberMessageListener[]>([]);

  const updateMemberMessage = useCallback(
    (memberId: string, message: string) => {
      const nextMembers = [...members];
      const member = nextMembers.find((m) => m.id === memberId);

      if (!member) {
        return;
      }

      member.message = message;

      setMembers(nextMembers);
      updateMemberMessageListeners.forEach((cb) => cb(memberId, message));
    },
    [members, updateMemberMessageListeners]
  );

  const addUpdateMemberMessageListener = useCallback(
    (callback: UpdateMemberMessageListener) => {
      setUpdateMemberMessageListeners((prev) => [...prev, callback]);
    },
    []
  );

  const removeUpdateMemberMessageListener = useCallback(
    (callback: UpdateMemberMessageListener) => {
      setUpdateMemberMessageListeners((prev) =>
        prev.filter((currentCallback) => currentCallback !== callback)
      );
    },
    []
  );

  return (
    <MembersContext.Provider
      value={{
        members,
        updateMemberMessage,
        addUpdateMemberMessageListener,
        removeUpdateMemberMessageListener,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}
