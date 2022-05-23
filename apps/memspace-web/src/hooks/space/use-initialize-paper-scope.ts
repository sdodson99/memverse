import { RefObject, useEffect, useState } from 'react';
import paper from 'paper';
import { usePaperScope } from './use-paper-scope';

export const useInitializePaperScope = (
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  const [scope, setScope] = usePaperScope();
  const [initialized, setInitialized] = useState(false);

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
    setInitialized(true);
  }, [canvasRef, initialized, setScope]);

  return {
    scope,
  };
};
