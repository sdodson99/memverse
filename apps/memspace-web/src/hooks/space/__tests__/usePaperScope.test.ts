import paper from 'paper';
import { renderHook } from '@testing-library/react-hooks';
import { usePaperScope } from '../usePaperScope';
import { MutableRefObject, RefObject } from 'react';

jest.mock('paper');
const mockPaperScope = paper.PaperScope as unknown as jest.Mock;

describe('usePaperScope', () => {
  let mockPaperScopeSetup: jest.Mock;

  beforeEach(() => {
    mockPaperScopeSetup = jest.fn();

    mockPaperScope.mockReturnValue({
      setup: mockPaperScopeSetup,
    });
  });

  afterEach(() => {
    mockPaperScope.mockReset();
  });

  describe('with canvas provided', () => {
    let canvasRef: MutableRefObject<HTMLCanvasElement>;

    beforeEach(() => {
      canvasRef = {
        current: {},
      } as unknown as MutableRefObject<HTMLCanvasElement>;
    });

    it('should return initialized paper scope when canvas provided', () => {
      const { result } = renderHook(() => usePaperScope(canvasRef));

      expect(mockPaperScopeSetup).toBeCalledWith(canvasRef.current);
      expect(result.current.initialized).toBeTruthy();
    });

    it('should only initialize paper scope once', () => {
      const { rerender } = renderHook(() => usePaperScope(canvasRef));

      rerender();

      expect(mockPaperScopeSetup).toBeCalledTimes(1);
    });
  });

  it('should not return initialized paper scope when canvas not provided', () => {
    const { result } = renderHook(() =>
      usePaperScope({} as unknown as RefObject<HTMLCanvasElement>)
    );

    expect(mockPaperScopeSetup).not.toBeCalled();
    expect(result.current.initialized).toBeFalsy();
  });
});
