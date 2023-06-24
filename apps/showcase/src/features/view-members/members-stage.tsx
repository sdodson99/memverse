'use client';

import { Stage, Sprite } from '@pixi/react';

export function MembersStage() {
  return (
    <Stage
      options={{ backgroundColor: '#1F232D', resizeTo: window }}
      height={window.innerHeight}
      width={window.innerWidth}
    >
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />
    </Stage>
  );
}
