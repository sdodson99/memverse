declare module '@psychobolt/react-paperjs' {
  export class Raster extends React.Component<unknown, unknown> {
    bounds: {
      width: number;
      height: number;
    };
    image: HTMLImageElement;
    scale: (horizontal: number, vertical: number) => void;
  }
  export class PointText extends React.Component<unknown, unknown> {}
  export class Layer extends React.Component<unknown, unknown> {}

  export class PaperContainer extends React.Component<unknown, unknown> {
    canvas: React.RefObject<HTMLCanvasElement>;
  }
}
