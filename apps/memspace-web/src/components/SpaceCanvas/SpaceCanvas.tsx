import React from 'react';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { PaperContainer, Raster } from '@psychobolt/react-paperjs';

type OnFrameEvent = {
  delta: number;
};

type SpaceCanvasProps = {};

const SpaceCanvas = ({}: SpaceCanvasProps) => {
  const {
    spaceMembers: members,
    loadSpaceMember,
    updateSpaceMembers,
  } = useSpaceMembersContext();

  const memberRasters = members.map((m) => (
    <Raster
      key={m.id}
      size={{ height: m.height, width: m.width }}
      position={{ x: m.x, y: m.y }}
      source={m.photoUrl}
      opacity={m.loaded ? 1 : 0} // Only visible once loaded
      onLoad={() => loadSpaceMember(m)}
    />
  ));

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
