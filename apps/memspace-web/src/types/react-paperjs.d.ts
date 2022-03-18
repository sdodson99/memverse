declare module '@psychobolt/react-paperjs' {
  export class Raster extends React.Component<any, any> {
    bounds: {
      width: number;
      height: number;
    };
    image: HTMLImageElement;
    scale: (horizontal: number, vertical: number) => void;
  }
  export class PointText extends React.Component<any, any> {}
  export class Layer extends React.Component<any, any> {}

  export class PaperContainer extends React.Component<any, any> {
    canvas: React.RefObject<HTMLCanvasElement>;
  }
}
