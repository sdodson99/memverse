import React from 'react';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import {
  PaperContainer,
  Raster,
  PointText,
  Layer,
} from '@psychobolt/react-paperjs';

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

  const memberRasters = members.map((m) => {
    const showMessage = m.message && m.showMessage;

    const usernameMargin = showMessage ? 50 : 35;

    return (
      <Layer
        key={m.id}
        opacity={m.loaded ? 1 : 0} // Only visible once loaded
      >
        {m.showUsername && (
          <PointText
            position={{ x: m.x, y: m.y - usernameMargin }}
            fontSize={14}
            strokeColor="white"
            fillColor="white"
            justification="center"
            content={m.username}
          >
            {m.username}
          </PointText>
        )}
        <PointText
          position={{ x: m.x, y: m.y - 35 }}
          strokeColor="white"
          fillColor="white"
          justification="center"
          content={m.message}
          opacity={m.showMessage ? 1 : 0} // Use opacity instead of conditional rendering to fix message update crash.
        >
          {m.message}
        </PointText>
        <Raster
          size={{ height: m.height, width: m.width }}
          position={{ x: m.x, y: m.y }}
          source={m.photoUrl}
          onLoad={() => loadSpaceMember(m)}
          onClick={() => toggleSpaceMemberPaused(m)}
          onMouseEnter={() => setShowSpaceMemberDetails(m, true)}
          onMouseLeave={() => setShowSpaceMemberDetails(m, false)}
        />
      </Layer>
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
