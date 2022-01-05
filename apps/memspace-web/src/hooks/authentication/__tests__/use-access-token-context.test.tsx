import React, { ReactNode } from 'react';
import {
  AccessTokenProvider,
  useAccessTokenContext,
} from '../use-access-token-context';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useAccessTokenContext', () => {
  let token: string;

  beforeEach(() => {
    token = 'access-token';
  });

  describe('without token', () => {
    it('should return undefined token', () => {
      const { result } = renderHook(() => useAccessTokenContext(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <AccessTokenProvider>{children}</AccessTokenProvider>
        ),
      });

      expect(result.current.token).toBeUndefined();
    });

    it('should return false for has token', () => {
      const { result } = renderHook(() => useAccessTokenContext(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <AccessTokenProvider>{children}</AccessTokenProvider>
        ),
      });

      expect(result.current.hasToken).toBeFalsy();
    });
  });

  describe('isExpired', () => {
    it('should return true if token expired', () => {
      const { result } = renderHook(() => useAccessTokenContext(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <AccessTokenProvider>{children}</AccessTokenProvider>
        ),
      });

      act(() => {
        result.current.setAccessToken({ token, expiresIn: -3600 });
      });

      expect(result.current.isExpired()).toBeTruthy();
    });

    it('should return false if token not expired', () => {
      const { result } = renderHook(() => useAccessTokenContext(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <AccessTokenProvider>{children}</AccessTokenProvider>
        ),
      });

      act(() => {
        result.current.setAccessToken({ token, expiresIn: 3600 });
      });

      expect(result.current.isExpired()).toBeFalsy();
    });

    it('should return false if token not set', () => {
      const { result } = renderHook(() => useAccessTokenContext(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <AccessTokenProvider>{children}</AccessTokenProvider>
        ),
      });

      expect(result.current.isExpired()).toBeFalsy();
    });
  });

  describe('setAccessToken', () => {
    it('should set access token', () => {
      const { result } = renderHook(() => useAccessTokenContext(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <AccessTokenProvider>{children}</AccessTokenProvider>
        ),
      });

      act(() => {
        result.current.setAccessToken({ token, expiresIn: 3600 });
      });

      expect(result.current.token).toBe(token);
      expect(result.current.hasToken).toBeTruthy();
    });
  });

  describe('clearAccessToken', () => {
    it('should remove access token', () => {
      const { result } = renderHook(() => useAccessTokenContext(), {
        wrapper: ({ children }: { children: ReactNode }) => (
          <AccessTokenProvider>{children}</AccessTokenProvider>
        ),
      });

      act(() => {
        result.current.setAccessToken({ token, expiresIn: 3600 });
      });

      expect(result.current.token).toBe(token);
      expect(result.current.hasToken).toBeTruthy();

      act(() => {
        result.current.clearAccessToken();
      });

      expect(result.current.token).toBeUndefined();
      expect(result.current.hasToken).toBeFalsy();
    });
  });
});
