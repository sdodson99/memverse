import { Box } from '@chakra-ui/react';
import React from 'react';
import { SpaceMember } from '../../models/space-member';
import SpaceMemberListingItem from '../SpaceMemberListingItem/SpaceMemberListingItem';
import styles from './SpaceMemberListing.module.css';

export type SpaceMemberListingProps = {
  members: SpaceMember[];
  onPause: (member: SpaceMember) => void;
  onUnpause: (member: SpaceMember) => void;
  onShowDetails: (member: SpaceMember) => void;
  onHideDetails: (member: SpaceMember) => void;
  onSpeedChanged: (member: SpaceMember, value: number) => void;
  onDirectionDegreesChanged: (member: SpaceMember, value: number) => void;
  onPositionXChanged: (member: SpaceMember, value: number) => void;
  onPositionYChanged: (member: SpaceMember, value: number) => void;
};

const SpaceMemberListing = ({
  members,
  onPause,
  onUnpause,
  onShowDetails,
  onHideDetails,
  onSpeedChanged,
  onDirectionDegreesChanged,
  onPositionXChanged,
  onPositionYChanged,
}: SpaceMemberListingProps) => {
  const memberListingItems = members.map((m) => {
    return (
      <Box key={m.id} mb={'10'}>
        <SpaceMemberListingItem
          channelId={m.id}
          username={m.username}
          photoUrl={m.photoUrl}
          message={m.message}
          paused={m.paused}
          onPause={() => onPause(m)}
          onUnpause={() => onUnpause(m)}
          isShowingDetails={m.showUsername || m.showMessage}
          onShowDetails={() => onShowDetails(m)}
          onHideDetails={() => onHideDetails(m)}
          speedPixelsPerSecond={m.speedPixelsPerSecond}
          onSpeedChanged={(value) => onSpeedChanged(m, value)}
          directionDegrees={m.directionDegrees}
          onDirectionDegreesChanged={(value) =>
            onDirectionDegreesChanged(m, value)
          }
          x={m.x}
          onPositionXChanged={(value) => onPositionXChanged(m, value)}
          y={m.y}
          onPositionYChanged={(value) => onPositionYChanged(m, value)}
        />
      </Box>
    );
  });

  return (
    <div className={styles.spaceMemberListing} data-testid="SpaceMemberListing">
      {memberListingItems}
    </div>
  );
};

export default SpaceMemberListing;
