'use client';

import { Stage } from '@pixi/react';
import { useMembersContext } from './members-context';
import { MemberContainer } from './member-container';

export function MembersStage() {
  const { members } = useMembersContext();

  return (
    <Stage
      options={{ backgroundColor: '#1F232D', resizeTo: window }}
      height={window.innerHeight}
      width={window.innerWidth}
    >
      {members.map((member) => (
        <MemberContainer key={member.channelId} member={member} />
      ))}
    </Stage>
  );
}
