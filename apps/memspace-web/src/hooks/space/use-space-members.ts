import { useEffect, useState } from 'react';
import { Member } from '../../models/member';
import { SpaceMember } from '../../models/space-member';

export const useSpaceMembers = (members: Member[]) => {
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
