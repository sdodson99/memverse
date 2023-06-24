import { PropsWithChildren } from 'react';

const mockApp = {
  screen: {
    top: 0,
    bottom: 500,
    left: 0,
    right: 1000,
  },
};

type TickCallback = (delta: number) => void;

let tickCallbacks: TickCallback[] = [];

function executeMockTick(delta: number) {
  tickCallbacks.forEach((c) => c(delta));
}

afterEach(() => {
  tickCallbacks = [];
});

vi.mock('@pixi/react', () => ({
  Stage: ({ children }: PropsWithChildren) => {
    return children;
  },
  Container: ({
    children,
    ...props
  }: PropsWithChildren<{
    x: number;
    y: number;
    ['data-testid']: string;
  }>) => {
    return (
      <div>
        <span data-testid={props['data-testid']}>{JSON.stringify(props)}</span>
        {children}
      </div>
    );
  },
  Sprite: ({ image }: { image: string }) => {
    return <img src={image} alt={image} />;
  },
  Text: ({ text }: { text: string }) => {
    return <span>{text}</span>;
  },
  useApp: () => mockApp,
  useTick: (callback: (delta: number) => void) => {
    tickCallbacks.push(callback);
  },
}));

export { mockApp, executeMockTick };
