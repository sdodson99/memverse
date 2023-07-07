type TickerCallback = (delta: number) => void;

type EventCallback = {
  event: string;
  callback: () => void;
};

// NOTE: This approach will not support testing for multiple applications. This is
// fine for now, but we might need a different approach in the future.
const currentMockApplication = {
  view: document.createElement('div'),
  screen: {
    left: 0,
    right: 1000,
    top: 0,
    bottom: 500,
    width: 1000,
    height: 500,
  },
  stage: {
    children: [] as any[],
    addChild: function (child: any) {
      this.children.push(child);
    },
  },
  ticker: {
    tickerCallbacks: [] as TickerCallback[],
    add: function (cb: TickerCallback) {
      this.tickerCallbacks.push(cb);
    },
    remove: function (cb: TickerCallback) {
      this.tickerCallbacks.filter((t) => t !== cb);
    },
  },
  render: function (delta = 0) {
    this.ticker.tickerCallbacks.forEach((cb: any) => cb(delta));

    this.view.innerHTML = '';
    this.view.appendChild(this.toNode());
  },
  toNode: function () {
    const node = document.createElement('div');

    this.stage.children.forEach((c: any) => node.appendChild(c?.toNode?.()));

    return node;
  },
};

afterEach(() => {
  currentMockApplication.ticker.tickerCallbacks = [];
  currentMockApplication.stage.children = [];
});

const MockApplication = vi.fn().mockReturnValue(currentMockApplication);

const MockSprite = {
  from: vi.fn().mockImplementation((imageElement: HTMLImageElement) => ({
    imageElement,
    height: 0,
    width: 0,
    anchor: { x: 0, y: 0 },
    toNode: function () {
      const node = this.imageElement;

      node.height = this.height;
      node.width = this.width;

      return node;
    },
  })),
};

const MockText = vi.fn().mockImplementation((text) => ({
  text,
  style: {},
  x: 0,
  y: 0,
  anchor: { x: 0, y: 0 },
  scale: {
    set: vi.fn(),
  },
  toNode: function () {
    const node = document.createElement('span');

    node.textContent = this.text;

    node.setAttribute('data-x', this.x);
    node.setAttribute('data-y', this.y);

    return node;
  },
}));

const MockContainer = vi.fn().mockImplementation(() => ({
  name: '',
  x: 0,
  y: 0,
  zIndex: 0,
  alpha: 1,
  scale: {
    x: 1,
    y: 1,
  },
  children: [] as any[],
  addChild: function (child: any) {
    this.children.push(child);
  },
  eventCallbacks: [] as EventCallback[],
  on: function (event: string, callback: EventCallback['callback']) {
    this.eventCallbacks.push({
      event,
      callback,
    });
  },
  toNode: function () {
    const node = document.createElement('div');

    node.setAttribute('data-testid', this.name);
    node.setAttribute('data-x', this.x.toString());
    node.setAttribute('data-y', this.y.toString());
    node.setAttribute('data-z', this.zIndex.toString());
    node.setAttribute('data-scale-x', this.scale.x.toString());
    node.setAttribute('data-scale-y', this.scale.y.toString());
    node.setAttribute('data-alpha', this.alpha.toString());

    this.eventCallbacks.forEach((e) =>
      node.addEventListener(e.event, () => e.callback())
    );

    this.children.forEach((c) => node.appendChild(c?.toNode?.()));

    return node;
  },
}));

vi.mock('pixi.js', () => ({
  Application: MockApplication,
  Sprite: MockSprite,
  Text: MockText,
  Container: MockContainer,
}));

export { currentMockApplication };
