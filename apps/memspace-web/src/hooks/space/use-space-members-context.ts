import constate from 'constate';
import { useEffect, useState } from 'react';
import { Member } from '../../models/member';
import { SpaceMember } from '../../models/space-member';

type UseSpaceMembersProps = {
  members: Member[];
};

const useSpaceMembers = ({ members }: UseSpaceMembersProps) => {
  const [spaceMembers, setSpaceMembers] = useState<SpaceMember[]>([]);

  useEffect(() => {
    const nextSpaceMembers = members.map(
      (m) => new SpaceMember(m.id, m.username, m.photoUrl, m.message)
    );

    setSpaceMembers(nextSpaceMembers);
  }, [members]);

  return {
    spaceMembers,
  };
};

const [SpaceMembersProvider, useSpaceMembersContext] =
  constate(useSpaceMembers);

export { SpaceMembersProvider, useSpaceMembersContext };
