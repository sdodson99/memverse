import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateSpaceMemberMessageSheet from './UpdateSpaceMemberMessageSheet';
import { renderApp } from '../../test-utils/render-app';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { useFirebaseAuthContext } from '../../hooks/authentication/firebase-auth/use-firebase-auth-context';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

jest.mock('../../hooks/authentication/firebase-auth/use-firebase-auth-context');
const mockUseFirebaseAuthContext = useFirebaseAuthContext as jest.Mock;

describe('<UpdateSpaceMemberMessageSheet />', () => {
  let mockUpdateSpaceMemberMessage: jest.Mock;
  let mockSetShowSpaceMemberDetails: jest.Mock;

  let memberId: string;

  beforeEach(() => {
    mockUpdateSpaceMemberMessage = jest.fn();
    mockSetShowSpaceMemberDetails = jest.fn();
    mockUseSpaceMembersContext.mockReturnValue({
      updateSpaceMemberMessage: mockUpdateSpaceMemberMessage,
      setShowSpaceMemberDetails: mockSetShowSpaceMemberDetails,
    });

    memberId = '123';
    mockUseFirebaseAuthContext.mockReturnValue({
      getIdToken: () => 'token123',
      currentUser: {
        id: memberId,
      },
    });
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
    mockUseFirebaseAuthContext.mockReset();
  });

  it('should mount', () => {
    renderApp(<UpdateSpaceMemberMessageSheet open={true} />, {
      mockTag: 'base-mock',
    });

    const updateSpaceMemberMessageForm = screen.getByTestId(
      'UpdateSpaceMemberMessage'
    );

    expect(updateSpaceMemberMessageForm).toBeInTheDocument();
  });

  describe('update message form submit', () => {
    let mockOnSuccess: jest.Mock;

    beforeEach(async () => {
      mockOnSuccess = jest.fn();

      renderApp(
        <UpdateSpaceMemberMessageSheet open={true} onSuccess={mockOnSuccess} />,
        {
          mockTag: 'base-mock',
        }
      );

      const messageTextInput = await screen.findByTestId('messageTextInput');
      await act(async () => {
        fireEvent.change(messageTextInput, {
          target: {
            value: 'message',
          },
        });
      });

      const updateButton = screen.getByText('Update') as HTMLInputElement;

      await act(async () => {
        fireEvent.submit(updateButton);
      });
    });

    it('should raise on success callback', async () => {
      await waitFor(() => {
        expect(mockOnSuccess).toBeCalled();
      });
    });

    it('should show updated space member details', async () => {
      await waitFor(() => {
        expect(mockSetShowSpaceMemberDetails).toBeCalledWith(memberId, true);
      });
    });

    it('should show toast', async () => {
      const updateSuccessToast = (
        await screen.findAllByText(
          'We successfully updated your space member message.'
        )
      )[0];

      expect(updateSuccessToast).toBeInTheDocument();
    });
  });
});
