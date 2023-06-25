'use client';

import { generateRandom } from '@/shared/math';
import { Container, Sprite, Text, useApp, useTick } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { useState } from 'react';
import { YouTubeMember } from 'youtube-member-querier';

export const MEMBER_SPRITE_LENGTH = 50;
export const MEMBER_SPRITE_LENGTH_HALF = MEMBER_SPRITE_LENGTH / 2;
const MEMBER_USERNAME_Y_OFFSET = -35;
const MEMBER_SPEED_PIXELS_PER_MILLISECOND = 0.5;
const CENTER_ANCHOR = { x: 0.5, y: 0.5 };

export type MemberContainerProps = {
  member: YouTubeMember;
};

export type MemberPosition = {
  x: number;
  y: number;
  directionRadians: number;
};

export function MemberContainer({ member }: MemberContainerProps) {
  const { screen } = useApp();
  const { top, bottom, left, right } = screen;

  const [position, setPosition] = useState<MemberPosition>({
    x: generateRandom(
      left + MEMBER_SPRITE_LENGTH_HALF,
      right - MEMBER_SPRITE_LENGTH_HALF
    ),
    y: generateRandom(
      top + MEMBER_SPRITE_LENGTH_HALF,
      bottom - MEMBER_SPRITE_LENGTH_HALF
    ),
    directionRadians: generateRandom(0, 2 * Math.PI),
  });

  useTick((deltaMilliseconds) => {
    setPosition((currentPosition) => {
      const pixelsTravelled =
        MEMBER_SPEED_PIXELS_PER_MILLISECOND * deltaMilliseconds;

      const xPixelsTravelled =
        Math.cos(currentPosition.directionRadians) * pixelsTravelled;
      const yPixelsTravelled =
        Math.sin(currentPosition.directionRadians) * pixelsTravelled;

      let nextX = currentPosition.x + xPixelsTravelled;
      let nextY = currentPosition.y + yPixelsTravelled;
      let nextDirectionRadians = currentPosition.directionRadians;

      if (nextX > right - MEMBER_SPRITE_LENGTH_HALF) {
        nextDirectionRadians = Math.PI - nextDirectionRadians;
        nextX = right - MEMBER_SPRITE_LENGTH_HALF;
      }

      if (nextX < left + MEMBER_SPRITE_LENGTH_HALF) {
        nextDirectionRadians = Math.PI - nextDirectionRadians;
        nextX = left + MEMBER_SPRITE_LENGTH_HALF;
      }

      if (nextY > bottom - MEMBER_SPRITE_LENGTH_HALF) {
        nextDirectionRadians = 2 * Math.PI - nextDirectionRadians;
        nextY = bottom - MEMBER_SPRITE_LENGTH_HALF;
      }

      if (nextY < top + MEMBER_SPRITE_LENGTH_HALF) {
        nextDirectionRadians = 2 * Math.PI - nextDirectionRadians;
        nextY = top + MEMBER_SPRITE_LENGTH_HALF;
      }

      return {
        x: nextX,
        y: nextY,
        directionRadians: nextDirectionRadians,
      };
    });
  });

  const { channelId, username, photoUrl } = member;

  return (
    <Container
      x={position.x}
      y={position.y}
      data-testid={`member-container-${channelId}`}
    >
      <Text
        text={username}
        style={
          new TextStyle({
            fill: 'white',
          })
        }
        anchor={CENTER_ANCHOR}
        y={MEMBER_USERNAME_Y_OFFSET}
        scale={0.5}
      />
      <Sprite
        image={photoUrl}
        height={MEMBER_SPRITE_LENGTH}
        width={MEMBER_SPRITE_LENGTH}
        anchor={CENTER_ANCHOR}
      />
    </Container>
  );
}
