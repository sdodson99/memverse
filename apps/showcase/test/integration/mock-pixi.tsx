import { PropsWithChildren } from 'react';

vi.mock('@pixi/react', () => ({
  Stage: ({ children }: PropsWithChildren) => {
    return children;
  },
  Container: ({ children }: PropsWithChildren) => {
    return children;
  },
  Sprite: ({ image }: { image: string }) => {
    return <img src={image} alt={image} />;
  },
  Text: ({ text }: { text: string }) => {
    return <span>{text}</span>;
  },
  useApp: () => ({
    screen: {
      top: 0,
      bottom: 500,
      left: 0,
      right: 500,
    },
  }),
}));
