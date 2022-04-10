import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import {
  act,
  renderHook,
  WrapperComponent,
} from '@testing-library/react-hooks';
import {
  GoogleIdentityServicesProvider,
  useGoogleIdentityServicesContext,
} from '../use-google-identity-services-context';
import { getGis } from '../../../utilities/google-identity-services';

jest.mock('../../../utilities/google-identity-services');
const mockGetGis = getGis as jest.Mock;

describe('useGoogleIdentityServices', () => {
  let clientId: string;
  let scope: string;

  let mockInitTokenClient: jest.Mock;

  let wrapper: WrapperComponent<unknown>;

  beforeEach(() => {
    clientId = 'client-id';
    scope = 'scope';

    wrapper = function Wrapper({ children }) {
      return (
        <GoogleIdentityServicesProvider clientId={clientId} scope={scope}>
          {children}
        </GoogleIdentityServicesProvider>
      );
    };

    mockInitTokenClient = jest.fn();
    mockGetGis.mockReturnValue({
      accounts: {
        oauth2: {
          initTokenClient: mockInitTokenClient,
        },
      },
    });
  });

  afterEach(() => {
    mockGetGis.mockReset();
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
      expect(result.current.client).not.toBeNull();
      expect(mockInitTokenClient).toBeCalledWith({
        client_id: clientId,
        scope: scope,
      });
      expect(result.current.initialized).toBeTruthy();
      expect(result.current.error).toBeNull();
    });
  });

  it('should return error when loading fails', async () => {
    const error = 'Failed to load.';
    const { result } = renderHook(() => useGoogleIdentityServicesContext(), {
      wrapper,
    });

    const gisScript = await screen.findByTestId('gisscript');

    act(() => {
      gisScript.onerror?.(error);
    });

    await waitFor(() => {
      expect(result.current.error).toBe(error);
      expect(result.current.client).toBeNull();
      expect(mockInitTokenClient).not.toBeCalled();
      expect(result.current.initialized).toBeFalsy();
    });
  });
});
