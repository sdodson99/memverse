import { RefObject, useEffect, useState } from 'react';
import paper from 'paper';

export const usePaperScope = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [scope, setScope] = useState<paper.PaperScope | null>(null);

  const initialized = scope !== null;

  useEffect(() => {
    if (initialized) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const paperScope = new paper.PaperScope();

    paperScope.setup(canvas);

    setScope(paperScope);
  }, [canvasRef, initialized]);

  return {
    scope,
  };
};
