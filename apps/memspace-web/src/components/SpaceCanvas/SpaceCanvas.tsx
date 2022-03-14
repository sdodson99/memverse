import React, { useRef } from 'react';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { PaperContainer } from '@psychobolt/react-paperjs';
import SpaceMember from '../SpaceMember/SpaceMember';
import { useSpaceMemberCanvasResize } from '../../hooks/space/use-space-member-canvas-resize';

type OnFrameEvent = {
  delta: number;
};

type SpaceCanvasProps = {};

const SpaceCanvas = ({}: SpaceCanvasProps) => {
  const {
    spaceMembers: members,
    loadSpaceMember,
    toggleSpaceMemberPaused,
    setShowSpaceMemberDetails,
    updateSpaceMembers,
  } = useSpaceMembersContext();

  const paperContainerRef = useRef<PaperContainer | null>(null);
  useSpaceMemberCanvasResize(paperContainerRef);

  const memberRasters = members.map((m) => {
    return (
      <SpaceMember
        key={m.id}
        username={m.username}
        photoUrl={m.photoUrl}
        message={m.message}
        x={m.x}
        y={m.y}
        width={m.width}
        height={m.height}
        loaded={m.loaded}
        showUsername={m.showUsername}
        showMessage={m.showMessage}
        onLoad={() => loadSpaceMember(m)}
        onClick={() => toggleSpaceMemberPaused(m)}
        onMouseEnter={() => setShowSpaceMemberDetails(m, true)}
        onMouseLeave={() => setShowSpaceMemberDetails(m, false)}
      />
    );
  });

  return (
    <PaperContainer
      canvasProps={{
        resize: 'true',
        style: {
          backgroundImage: "url('/space-bg.png')",
          width: '100%',
          height: '100%',
        },
        'data-testid': 'SpaceCanvas',
      }}
      ref={paperContainerRef}
      viewProps={(paper: paper.PaperScope) => ({
        onFrame: ({ delta: timeElapsedSeconds }: OnFrameEvent) => {
          updateSpaceMembers(timeElapsedSeconds, paper.view.bounds);
        },
      })}
    >
      {memberRasters}
    </PaperContainer>
  );
};

export default SpaceCanvas;
