import { RefObject, useEffect } from 'react';
import paper from 'paper';
import { usePaperScope } from './use-paper-scope';

export const useInitializePaperScope = (
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  const [scope, setScope] = usePaperScope();

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
  }, [canvasRef, initialized, setScope]);

  return {
    scope,
  };
};
