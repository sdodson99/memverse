import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateSpaceMemberMessage from './UpdateSpaceMemberMessage';
import { useMemberMessage } from '../../hooks/members/use-member-message';
import { useUpdateMemberMessage } from '../../hooks/members/use-update-member-message';
import { useFirebaseAuthContext } from '../../hooks/authentication/firebase-auth/use-firebase-auth-context';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

jest.mock('../../hooks/members/use-member-message');
const mockUseMemberMessage = useMemberMessage as jest.Mock;

jest.mock('../../hooks/members/use-update-member-message');
const mockUseUpdateMemberMessage = useUpdateMemberMessage as jest.Mock;

jest.mock('../../hooks/authentication/firebase-auth/use-firebase-auth-context');
const mockUseFirebaseAuthContext = useFirebaseAuthContext as jest.Mock;

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('<UpdateSpaceMemberMessage />', () => {
  beforeEach(() => {
    mockUseFirebaseAuthContext.mockReturnValue({});
    mockUseSpaceMembersContext.mockReturnValue({});
    mockUseMemberMessage.mockReturnValue({});
    mockUseUpdateMemberMessage.mockReturnValue({});
  });

  afterEach(() => {
    mockUseMemberMessage.mockReset();
    mockUseUpdateMemberMessage.mockReset();
    mockUseSpaceMembersContext.mockReset();
    mockUseFirebaseAuthContext.mockReset();
  });

  it('should mount', () => {
    render(<UpdateSpaceMemberMessage />);

    const updateSpaceMemberMessage = screen.getByTestId(
      'UpdateSpaceMemberMessage'
    );

    expect(updateSpaceMemberMessage).toBeInTheDocument();
  });

  it('should render loading spinner when loading', () => {
    mockUseMemberMessage.mockReturnValue({ loading: true });
    render(<UpdateSpaceMemberMessage />);

    const loadingSpinner = screen.getByTestId('LoadingSpinner');

    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should initialize member message', () => {
    const message = 'hello world';
    mockUseMemberMessage.mockReturnValue({ message });
    render(<UpdateSpaceMemberMessage />);

    const initializeMessageTextInput = screen.getByDisplayValue(message);

    expect(initializeMessageTextInput).toBeInTheDocument();
  });

  describe('on submit', () => {
    let updateButton: HTMLInputElement;
    let mockExecuteUpdateMemberMessage: jest.Mock;
    let mockUpdateSpaceMemberMessage: jest.Mock;
    let mockOnSuccess: jest.Mock;

    let message: string;

    beforeEach(async () => {
      mockUpdateSpaceMemberMessage = jest.fn();
      mockUseSpaceMembersContext.mockReturnValue({
        updateSpaceMemberMessage: mockUpdateSpaceMemberMessage,
      });
      mockExecuteUpdateMemberMessage = jest.fn();
      mockUseUpdateMemberMessage.mockReturnValue({
        execute: mockExecuteUpdateMemberMessage,
      });
      mockUseFirebaseAuthContext.mockReturnValue({
        currentUser: {
          id: '123',
        },
      });
      mockOnSuccess = jest.fn();

      render(<UpdateSpaceMemberMessage onSuccess={mockOnSuccess} />);
      updateButton = screen.getByText('Update') as HTMLInputElement;

      const messageTextInput = screen.getByTestId('messageTextInput');
      message = 'message';
      await act(async () => {
        fireEvent.change(messageTextInput, {
          target: {
            value: message,
          },
        });
      });
    });

    it('should execute update for message', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});

      fireEvent.submit(updateButton);

      await waitFor(() => {
        expect(mockExecuteUpdateMemberMessage).toBeCalledWith(message);
      });
    });

    it('should enable submit button when unsuccessful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({ error: new Error() });

      fireEvent.submit(updateButton);

      await waitFor(() => {
        expect(updateButton.disabled).toBeFalsy();
      });
    });

    it('should render error message when unsuccessful', async () => {
      mockUseUpdateMemberMessage.mockReturnValue({ error: new Error() });
      mockExecuteUpdateMemberMessage.mockReturnValue({ error: new Error() });
      fireEvent.submit(updateButton);

      const errorMessage = await screen.findByText(
        'Failed to update message. Please try again later.'
      );

      expect(errorMessage).toBeInTheDocument();
    });

    it('should update space member message when successful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});

      fireEvent.submit(updateButton);

      await waitFor(() => {
        expect(mockUpdateSpaceMemberMessage).toBeCalledWith('123', 'message');
      });
    });

    it('should raise success callback when successful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});

      fireEvent.submit(updateButton);

      await waitFor(() => {
        expect(mockOnSuccess).toBeCalledWith('123');
      });
    });
  });
});
