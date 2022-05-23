import React from 'react';
import paper from 'paper';
import { renderHook, WrapperComponent } from '@testing-library/react-hooks';
import { MutableRefObject, RefObject } from 'react';
import { useInitializePaperScope } from '../use-initialize-paper-scope';
import { RecoilRoot } from 'recoil';

jest.mock('paper');
const mockPaperScope = paper.PaperScope as unknown as jest.Mock;

describe('useInitializePaperScope', () => {
  let mockPaperScopeSetup: jest.Mock;
  let wrapper: WrapperComponent<unknown>;

  beforeEach(() => {
    mockPaperScopeSetup = jest.fn();

    mockPaperScope.mockReturnValue({
      setup: mockPaperScopeSetup,
    });

    wrapper = function Wrapper({ children }) {
      return <RecoilRoot>{children}</RecoilRoot>;
    };
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
      const { result } = renderHook(() => useInitializePaperScope(canvasRef), {
        wrapper,
      });

      expect(mockPaperScopeSetup).toBeCalledWith(canvasRef.current);
      expect(result.current.scope).not.toBeNull();
    });

    it('should only initialize paper scope once', () => {
      const { rerender } = renderHook(
        () => useInitializePaperScope(canvasRef),
        { wrapper }
      );

      rerender();

      expect(mockPaperScopeSetup).toBeCalledTimes(1);
    });
  });

  it('should not return initialized paper scope when canvas not provided', () => {
    const { result } = renderHook(
      () =>
        useInitializePaperScope({} as unknown as RefObject<HTMLCanvasElement>),
      { wrapper }
    );

    expect(mockPaperScopeSetup).not.toBeCalled();
    expect(result.current.scope).toBeNull();
  });
});
