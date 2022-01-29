import { RefObject, useEffect, useState } from 'react';
import paper from 'paper';

export const usePaperScope = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [scope] = useState<paper.PaperScope>(() => new paper.PaperScope());
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    scope.setup(canvas);

    setInitialized(true);
  }, [canvasRef, scope, initialized]);

  return {
    initialized,
    scope,
  };
};
