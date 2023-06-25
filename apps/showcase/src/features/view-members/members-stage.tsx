'use client';

import { Stage } from '@pixi/react';
import { useMembersContext } from './members-context';
import { MemberContainer } from './member-container';
import { useState } from 'react';

export function MembersStage() {
  const { members } = useMembersContext();

  const [window] = useState<Window>(() => global.window);

  return (
    <Stage
      options={{ backgroundColor: '#1F232D', resizeTo: window }}
      height={window?.innerHeight ?? 0}
      width={window?.innerWidth ?? 0}
    >
      {members.map((member) => (
        <MemberContainer key={member.channelId} member={member} />
      ))}
    </Stage>
  );
}
