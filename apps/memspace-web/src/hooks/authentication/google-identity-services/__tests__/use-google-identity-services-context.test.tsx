import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import {
  act,
  renderHook,
  WrapperComponent,
} from '@testing-library/react-hooks';
import { useGoogleIdentityServicesContext } from '../use-google-identity-services-context';
import { getGis } from '../../../../utilities/google-identity-services';
import { getTestApp } from '../../../../test-utils/render-app';
import { GoogleIdentityServicesProvider } from '../google-identity-services-provider';

jest.mock('../../../../utilities/google-identity-services');
const mockGetGis = getGis as jest.Mock;

describe('useGoogleIdentityServicesContext', () => {
  let clientId: string;
  let scope: string;

  beforeEach(() => {
    clientId = 'client_id';
    scope = 'scope';
  });

  afterEach(() => {
    mockGetGis.mockReset();
  });

  describe('when in real mode', () => {
    let mockInitTokenClient: jest.Mock;
    let wrapper: WrapperComponent<unknown>;

    beforeEach(() => {
      mockInitTokenClient = jest.fn();
      mockInitTokenClient.mockReturnValue({});
      mockGetGis.mockReturnValue({
        accounts: {
          oauth2: {
            initTokenClient: mockInitTokenClient,
          },
        },
      });

      const TestApp = getTestApp({});

      wrapper = function Wrapper({ children }) {
        return (
          <TestApp>
            <GoogleIdentityServicesProvider clientId={clientId} scope={scope}>
              {children}
            </GoogleIdentityServicesProvider>
          </TestApp>
        );
      };
    });

    it('should return initialized client when successfully loaded', async () => {
      const { result } = renderHook(() => useGoogleIdentityServicesContext(), {
        wrapper,
      });

      const gisScript = await screen.findByTestId('gisscript');

      act(() => {
        gisScript.onload?.({} as Event);
      });

      await waitFor(() => {
        expect(result.current.client).toBeDefined();
        expect(mockInitTokenClient).toBeCalledWith({
          client_id: clientId,
          scope: scope,
        });
        expect(result.current.initialized).toBeTruthy();
        expect(result.current.error).toBeUndefined();
      });
    });

    it('should return error when loading fails', async () => {
      const errorMessage = 'Failed to load.';
      const { result } = renderHook(() => useGoogleIdentityServicesContext(), {
        wrapper,
      });

      const gisScript = await screen.findByTestId('gisscript');

      act(() => {
        gisScript.onerror?.(errorMessage);
      });

      await waitFor(() => {
        expect(result.current.error?.message).toBe(errorMessage);
        expect(result.current.client).toBeUndefined();
        expect(mockInitTokenClient).not.toBeCalled();
        expect(result.current.initialized).toBeFalsy();
      });
    });
  });

  describe('when in mocked mode', () => {
    let wrapper: WrapperComponent<unknown>;

    beforeEach(() => {
      const TestApp = getTestApp();

      wrapper = function Wrapper({ children }) {
        return (
          <TestApp>
            <GoogleIdentityServicesProvider clientId={clientId} scope={scope}>
              {children}
            </GoogleIdentityServicesProvider>
          </TestApp>
        );
      };
    });

    it('should always be initialized', () => {
      const { result } = renderHook(() => useGoogleIdentityServicesContext(), {
        wrapper,
      });

      expect(result.current.initialized).toBeTruthy();
    });

    it('should return mock GIS client to request mock access token', () => {
      const mockCallback = jest.fn();
      const { result } = renderHook(() => useGoogleIdentityServicesContext(), {
        wrapper,
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      result.current.client!.callback = mockCallback;
      result.current.client?.requestAccessToken();

      expect(mockCallback).toBeCalledWith({
        access_token: 'mock_access_token',
      });
    });
  });
});
