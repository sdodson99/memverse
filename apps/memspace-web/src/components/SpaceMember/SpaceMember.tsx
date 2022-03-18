import React, { useRef } from 'react';
import { Raster, PointText, Layer } from '@psychobolt/react-paperjs';
import { useSpaceMemberScaling } from '../../hooks/space/use-space-member-scaling';
import { useSpaceMemberAvatar } from '../../hooks/space/use-space-member-avatar';

export type SpaceMemberProps = {
  username: string;
  photoUrl: string;
  message: string;
  x: number;
  y: number;
  width: number;
  height: number;
  loaded: boolean;
  showUsername: boolean;
  showMessage: boolean;
  onLoad?: () => void;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const SpaceMember = ({
  username,
  photoUrl,
  message,
  x,
  y,
  width,
  height,
  loaded,
  showUsername,
  showMessage,
  onLoad,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: SpaceMemberProps) => {
  const rasterRef = useRef<Raster | null>(null);

  useSpaceMemberAvatar(rasterRef, photoUrl);
  useSpaceMemberScaling(rasterRef, { height, width }, { skipScaling: !loaded });

  const renderMessage = message && showMessage;

  const rasterTop = height / 2;
  const spacing = 15;
  const getLineOffset = (linesAboveRaster: number) =>
    rasterTop + linesAboveRaster * spacing;

  const usernameOffset = renderMessage ? getLineOffset(2) : getLineOffset(1);
  const messageOffset = getLineOffset(1);

  return (
    <Layer
      opacity={loaded ? 1 : 0} // Only visible once loaded
    >
      {showUsername && (
        <PointText
          position={{ x, y: y - usernameOffset }}
          fontSize={14}
          strokeColor="white"
          fillColor="white"
          justification="center"
          content={username}
        >
          {username}
        </PointText>
      )}
      <PointText
        position={{ x, y: y - messageOffset }}
        strokeColor="white"
        fillColor="white"
        justification="center"
        content={message}
        opacity={renderMessage ? 1 : 0} // Use opacity instead of conditional rendering to fix message update crash.
      >
        {message}
      </PointText>
      <Raster
        ref={rasterRef}
        position={{ x, y }}
        onLoad={onLoad}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </Layer>
  );
};

export default SpaceMember;
