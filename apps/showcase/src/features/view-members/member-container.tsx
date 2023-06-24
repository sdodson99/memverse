'use client';

import { generateRandom } from '@/shared/math';
import { Container, Sprite, Text, useApp } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { useState } from 'react';
import { YouTubeMember } from 'youtube-member-querier';

const MEMBER_SPRITE_LENGTH = 50;
const MEMBER_SPRITE_Y_OFFSET = 35;

type MemberContainerProps = {
  member: YouTubeMember;
};

export function MemberContainer({ member }: MemberContainerProps) {
  const { screen } = useApp();

  const { top, bottom, left, right } = screen;

  const [x, setX] = useState(generateRandom(left, right));
  const [y, setY] = useState(generateRandom(top, bottom));

  const { channelId, username, photoUrl } = member;

  return (
    <Container key={channelId} x={x} y={y}>
      <Text
        text={username}
        style={
          new TextStyle({
            fill: 'white',
          })
        }
        anchor={{ x: 0.5, y: 0.5 }}
        scale={0.5}
      />
      <Sprite
        image={photoUrl}
        y={MEMBER_SPRITE_Y_OFFSET}
        height={MEMBER_SPRITE_LENGTH}
        width={MEMBER_SPRITE_LENGTH}
        anchor={{ x: 0.5, y: 0.5 }}
      />
    </Container>
  );
}
